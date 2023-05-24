import WebSocket from 'ws';
import dotenv from 'dotenv';
import saveToMongo from './saveToMongo.js';

dotenv.config();

const GWEI_IN_ETH = 1_000_000_000_000_000_000;

let socket = null; // Declare socket variable

const connectWebSocket = () => {
    socket = new WebSocket(`wss://stream.openseabeta.com/socket/websocket?token=${process.env.OPENSEA_API_KEY}`);

    const heartbeat = {
        "topic": "phoenix",
        "event": "heartbeat",
        "payload": {},
        "ref": 0
    }

    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');

        // Send heartbeat every 27 seconds
        setInterval(() => {
            socket.send(JSON.stringify(heartbeat));
        }, 27000);

        // subscribe to collection
        const subscribe = {
            // "topic": "collection:mutant-ape-yacht-club",
            "topic": "collection:milady",
            "event": "phx_join",
            "payload": {},
            "ref": 0
        }

        try {
            socket.send(JSON.stringify(subscribe));
        } catch (error) {
            console.log(error);
        }

        // Handle incoming messages
        socket.addEventListener('message', async (event) => {
            console.log('\n\n\n------------------------\n', event.data + " " + new Date(), '\n----------------------\n');
            const data = JSON.parse(event.data);

            if (data.event === 'phx_reply') {
                var payload = { content: `heartbeat` };
            } else if (data) {
                console.log(data);

                const payload = {
                    event: data.event,
                    name: data.payload?.payload?.item?.metadata?.name,
                    base_price: data.payload?.payload?.base_price,
                    permalink: data.payload?.payload?.item?.permalink,
                    timestamp: new Date()
                }
                await saveToMongo('opensea', 'milady', payload);
            } else {
                var payload = { content: JSON.stringify(data.event) };
            }
        });
    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        connectWebSocket();
    });
};

connectWebSocket();
