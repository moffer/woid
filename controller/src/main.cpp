#define TINY_GSM_MODEM_SIM7600 //A7670 Compatible with SIM7600 AT instructions

// Set serial for debug console (to the Serial Monitor, default speed 115200)
#define SerialMon Serial

// Set serial for AT commands (to the module)
// Use Hardware Serial on Mega, Leonardo, Micro
#define SerialAT Serial1

#ifndef SerialGPS
#define SerialGPS Serial2
#endif

#include <TinyGsmClient.h>
#include <Servo.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "config.h"

TinyGsm        modem(SerialAT);
TinyGsmClient  client(modem);
PubSubClient  mqtt(client);

char status_topic[50];
char update_topic[50];

StaticJsonDocument<2048> msg;
char returnString[2048];

uint32_t lastReconnectAttempt = 0;


#define uS_TO_S_FACTOR 1000000ULL  // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP  600          // Time ESP32 will go to sleep (in seconds)

#define UART_BAUD    115200
#define PIN_DTR      25
#define PIN_TX       26
#define PIN_RX       27
#define PWR_PIN      4
#define BAT_ADC      35
#define BAT_EN       12
#define PIN_RI       33
#define RESET        5

#define SD_MISO     2
#define SD_MOSI     15
#define SD_SCLK     14
#define SD_CS       13

#define GPS_TX_PIN                    21
#define GPS_RX_PIN                    22
#define GPS_PPS_PIN                   23
#define GPS_WAKEUP_PIN                19

#define SERVO_PIN 32

#define BAT_ADC    35
#define BAT_EN       12


#include <TinyGPS++.h>
#include "esp_adc_cal.h"


TinyGPSPlus gps;
Servo servo;

uint32_t readADC_Cal(int ADC_Raw)
{
    esp_adc_cal_characteristics_t adc_chars;

    esp_adc_cal_characterize(ADC_UNIT_1, ADC_ATTEN_DB_11, ADC_WIDTH_BIT_12, 1100, &adc_chars);
    return (esp_adc_cal_raw_to_voltage(ADC_Raw, &adc_chars));
}

float Voltage = 0.0;
uint32_t readADC_Cal(int ADC_Raw);
command status;

void setupModem() {
    // Restart takes quite some time
    // To skip it, call init() instead of restart()
    DBG("Initializing modem...");
    if (!modem.init()) {
        DBG("Failed to restart modem, delaying 10s and retrying");
        return;
    }
    // Restart takes quite some time
    // To skip it, call init() instead of restart()
    DBG("Initializing modem...");
    if (!modem.restart()) {
        DBG("Failed to restart modem, delaying 10s and retrying");
        return;
    }

    String name = modem.getModemName();
    DBG("Modem Name:", name);

    String modemInfo = modem.getModemInfo();
    DBG("Modem Info:", modemInfo);

    // Unlock your SIM card with a PIN if needed
    if (GSM_PIN && modem.getSimStatus() != 3) {
        modem.simUnlock(GSM_PIN);
    }

    SerialMon.print("Waiting for network...");
    if (!modem.waitForNetwork()) {
        SerialMon.println(" fail");
        delay(10000);
        return;
    }
    SerialMon.println(" success");

    if (modem.isNetworkConnected()) {
        SerialMon.println("Network connected");
    }

    // GPRS connection parameters are usually set after network registration
    SerialMon.print(F("Connecting to "));
    SerialMon.print(GSM_APN);
    if (!modem.gprsConnect(GSM_APN, GSM_USER, GSM_PASSOWRD)) {
        SerialMon.println(" fail");
        delay(10000);
        return;
    }
    SerialMon.println(" success");

    if (modem.isGprsConnected()) {
        SerialMon.println("GPRS connected");
    }
}

boolean mqttConnect() {
  SerialMon.print("Connecting to ");
  SerialMon.print(MQTT_SERVER);

  MQTT_TOPIC_STATUS(status_topic);
  MQTT_TOPIC_UPDATE(update_topic);
  // Connect to MQTT Broker
  boolean status = mqtt.connect(ID);

  // Or, if you want to authenticate MQTT:
  // boolean status = mqtt.connect("GsmClientName", "mqtt_user", "mqtt_pass");

  if (status == false) {
    SerialMon.println(" fail");
    return false;
  }
  SerialMon.println(" success");
//   mqtt.publish(topicInit, "GsmClientTest started");
  mqtt.subscribe(update_topic);
  return mqtt.connected();
}

void mqttCallback(char* topic, byte* payload, unsigned int len) {
  SerialMon.print("Message arrived [");
  SerialMon.print(topic);
  SerialMon.print("]: ");
  SerialMon.write(payload, len);
  SerialMon.println();

  if (String(topic) == update_topic) {
    Serial.println("update status");
    static StaticJsonDocument<256> msgRaw;
    deserializeJson(msgRaw, payload);
    // status.alarm = msgRaw["alarm"];

    if (msgRaw["lock"] == 1) {
        status.lock = true;
    } else {
        status.lock = false;
    }
    Serial.println(status.lock);
  }

  // Only proceed if incoming message's topic matches
//   if (String(topic) == update_topic) {
//     ledStatus = !ledStatus;
//     digitalWrite(LED_PIN, ledStatus);
//     mqtt.publish(topicLedStatus, ledStatus ? "1" : "0");
//   }
}

void enableGPS() {
    //Disable gnss
    modem.sendAT("+CGNSSPWR=0");
    modem.waitResponse(10000L);

    //Enable gnss
    modem.sendAT("+CGNSSPWR=1");
    modem.waitResponse(10000L);

    //Wait gnss start.
    SerialMon.print("\tWait GPS reday.");
    while (modem.waitResponse(1000UL, "+CGNSSPWR: READY!") != 1) {
        SerialMon.print(".");
    }
    SerialMon.println();

    //Set gnss mode use GPS.
    modem.sendAT("+CGNSSMODE=1");
    modem.waitResponse(10000L);
}

void setup()
{
    // Set console baud rate
    SerialMon.begin(115200);
    delay(10);
    pinMode(BAT_EN, OUTPUT);
    digitalWrite(BAT_EN, HIGH);

    pinMode(SERVO_PIN, OUTPUT);

    //A7670 Reset
    pinMode(RESET, OUTPUT);
    digitalWrite(RESET, LOW);
    delay(100);
    digitalWrite(RESET, HIGH);
    delay(3000);
    digitalWrite(RESET, LOW);

    pinMode(PWR_PIN, OUTPUT);
    digitalWrite(PWR_PIN, LOW);
    delay(100);
    digitalWrite(PWR_PIN, HIGH);
    delay(1000);
    digitalWrite(PWR_PIN, LOW);

    pinMode(BAT_EN, OUTPUT);
    digitalWrite(BAT_EN, HIGH);

    DBG("Wait...");

    delay(3000);

    SerialAT.begin(UART_BAUD, SERIAL_8N1, PIN_RX, PIN_TX);

    SerialGPS.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

    servo.attach(SERVO_PIN);

    #if TINY_GSM_USE_WIFI
    // Wifi connection parameters must be set before waiting for the network
    SerialMon.print(F("Setting SSID/password..."));
    if (!modem.networkConnect(wifiSSID, wifiPass)) {
      SerialMon.println(" fail");
      delay(10000);
      return;
    }
    SerialMon.println(" success");
    #endif

    setupModem();
    enableGPS();

    status.lock = true;

    // MQTT Broker setup
    mqtt.setServer(MQTT_SERVER, MQTT_PORT);
    mqtt.setCallback(mqttCallback);
}

void checkConnection() {
  // Make sure we're still registered on the network
  if (!modem.isNetworkConnected()) {
    SerialMon.println("Network disconnected");
    if (!modem.waitForNetwork(180000L, true)) {
      SerialMon.println(" fail");
      delay(10000);
      return;
    }
    if (modem.isNetworkConnected()) {
      SerialMon.println("Network re-connected");
    }

    #if TINY_GSM_USE_GPRS
    // and make sure GPRS/EPS is still connected
    if (!modem.isGprsConnected()) {
      SerialMon.println("GPRS disconnected!");
      SerialMon.print(F("Connecting to "));
      SerialMon.print(GSM_APN);
      if (!modem.gprsConnect(GSM_APN, GSM_USER, GSM_PASSOWRD)) {
        SerialMon.println(" fail");
        delay(10000);
        return;
      }
      if (modem.isGprsConnected()) { SerialMon.println("GPRS reconnected"); }
    }
    #endif
  }

    if (!mqtt.connected()) {
        SerialMon.println("=== MQTT NOT CONNECTED ===");
        // Reconnect every 10 seconds
        uint32_t t = millis();
        if (t - lastReconnectAttempt > 10000L) {
          lastReconnectAttempt = t;
          if (mqttConnect()) { lastReconnectAttempt = 0; }
        }
        delay(100);
        return;
    }
}

coordinates *getGPS() {
    static coordinates coords;
    float parameter1,  parameter2;
    char buf[16];
    if (modem.getGPS(&parameter1, &parameter2)) {
        modem.sendAT(GF("+CGNSSINFO"));
        if (modem.waitResponse(GF(GSM_NL "+CGNSSINFO:")) == 1) {
            String res = modem.stream.readStringUntil('\n');
            String lat = "";
            String n_s = "";
            String lon = "";
            String e_w = "";
            res.trim();
            lat = res.substring(8, res.indexOf(',', 8));
            coords.latitude = atof(lat.c_str());;
            n_s = res.substring(19, res.indexOf(',', res.indexOf(',', 19)));
            lon = res.substring(21, res.indexOf(',', res.indexOf(',', 21)));
            e_w = res.substring(33, res.indexOf(',', res.indexOf(',', 33)));
            // Serial.println("****************GNSS********************");
            // Serial.printf("lat:%s %s\n", lat, n_s);
            // Serial.printf("lon:%s %s\n", lon, e_w);
            float flat = atof(lat.c_str());
            float flon = atof(lon.c_str());
            flat = (floor(flat / 100) + fmod(flat, 100.) / 60) *
                   (n_s == "N" ? 1 : -1);
            flon = (floor(flon / 100) + fmod(flon, 100.) / 60) *
                   (e_w == "E" ? 1 : -1);
            coords.longitude = lon;
            coords.latitude = lat;
            coords.synced = true;
            // Serial.print("Latitude:"); Serial.println(flat);
            // Serial.print("Longitude:"); Serial.println(flon);
        }
    } else {
        coords.synced = false;
    }
    return &coords;
}

void loop() {
    // Make sure we're still registered on the network
    checkConnection();
    mqtt.loop();

    static uint32_t last_update = 0;

    if (!status.lock) {
        servo.write(0);
    } else {
        servo.write(90);
    }

    if  (millis() < last_update) {
        return;
    }
    last_update += SYNC_TIME;

    static float longitudeGsm, latitudeGsm = 0;

    coordinates* coords = getGPS();

    modem.getGsmLocation(&latitudeGsm, &longitudeGsm);
    Voltage = (readADC_Cal(analogRead(BAT_ADC))) * 2;

    JsonObject gpsData = msg.createNestedObject("gps");
    JsonObject gsmData = msg.createNestedObject("gsm");
    JsonObject deviceData = msg.createNestedObject("device");
    gpsData["longitude"] = coords->longitude;
    gpsData["latitude"] = coords->latitude;
    gpsData["synced"] = coords->synced;
    deviceData["battery"] = Voltage / 1000 /4.2;
    deviceData["status"] = status.lock;
    gsmData["longitude"] = String(longitudeGsm, 8);
    gsmData["latitude"] = String(latitudeGsm, 8);
    // dtostrf(longitudeGsm, 5, 10, gsmData["longitude"]);
    // dtostrf(latitudeGsm, 5, 10, gsmData["latitude"]);

    // sprintf(gsmData["longitude"], sizeof(&longitudeGsm), "%f", )
    // gsmData["longitude"] = String(&longitudeGsm);
    // gsmData["latitude"] = String(&latitudeGsm);

    serializeJson(msg, returnString);
    msg.clear();

    Serial.print("send update to mqtt topic ");
    Serial.println(status_topic);
    bool result = mqtt.publish(status_topic, returnString);

    if (!result) {
        int err = client.getWriteError();
        Serial.print("could not sent data: Error code ");
        Serial.println(err);
    }
}