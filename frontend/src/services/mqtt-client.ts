import * as mqtt from 'mqtt/dist/mqtt.min';
import { useCoordinateStore } from '@/stores/counter'


// MQTT broker URL
const brokerUrl = 'mqtt://ws.emqx.woid.0-0-0-0.dev/mqtt';
// MQTT client options
const options = {
    clientId: 'your-client-id',
    username: 'admin',
    password: 'woid',
    protocol: 'wss' as 'wss'
};

// Create the MQTT client instance
const client = mqtt.connect(brokerUrl, options);

// MQTT client event handlers
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    // Perform any necessary subscriptions or other setup here
    client.subscribe('status/bike1');
});


client.on('message', (topic: string, message: string) => {
    const bikeStore = useCoordinateStore();
    
    // Process the received message
    if (topic == 'status/bike1') {
        bikeStore.updateBikeStatus(message)
    }
});

export default client;
