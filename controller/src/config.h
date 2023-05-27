#ifndef __CONFIG
#define __CONFIG
#include "defines.h"

#define ID "bike1"

#define MQTT_SERVER "mqtt.woid.0-0-0-0.dev"
#define MQTT_PORT 1883
#define MQTT_USERNAME "admin"
#define MQTT_PASSWORD "udontknow"

#define MQTT_TOPIC_STATUS(topic) ({ \
    sprintf(topic, "status/%s", ID); \
    topic; \
})

#define MQTT_TOPIC_UPDATE(topic) ({ \
    sprintf(topic, "update/%s", ID); \
    topic; \
})

#define SSID_NAME "hotspot"
#define SSID_PASSWORD "test1234"

// set GSM PIN, if any
#define GSM_PIN "5267"

// Your GPRS credentials, if any
#define GSM_APN "pinternet.interkom.de"
#define GSM_USER ""
#define GSM_PASSOWRD ""

// Define how you're planning to connect to the internet.
// This is only needed for this example, not in other code.
#define TINY_GSM_USE_GPRS true
#define TINY_GSM_USE_WIFI false

#endif