import WebSocket from 'ws';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const socket = new WebSocket(`wss://stream.openseabeta.com/socket/websocket?token=${process.env.OPENSEA_API_KEY}`);

const heartbeat = {
    "topic": "phoenix",
    "event": "heartbeat",
    "payload": {},
    "ref": 0
}
socket.addEventListener('open', () => {
    console.log('WebSocket connection established');

    // Send heartbeat every 30 seconds
    setInterval(() => {
        socket.send(JSON.stringify(heartbeat));
    }, 30000);

    // subscribe to collection
    const subscribe = {
        "topic": "collection:y00ts",
        "event": "phx_join",
        "payload": {},
        "ref": 0
    }
    socket.send(JSON.stringify(subscribe));
    // Handle incoming messages
    socket.addEventListener('message', async (event) => {
        // console.log('Received message:', event.data);
        const item = JSON.parse(event.data)
        console.log(item.event)
        fs.writeFileSync(`payloads/${item.event}.json`, event.data)

    })
});


socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});
