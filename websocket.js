import WebSocket from 'ws';
import dotenv from 'dotenv';

const y00ts = { "event": "trait_offer", "payload": { "event_type": "trait_offer", "payload": { "asset_contract_criteria": { "address": "0x670fd103b1a08628e9557cd66b87ded841115190" }, "base_price": "1399999999999999911", "collection": { "slug": "y00ts" }, "collection_criteria": { "slug": "y00ts" }, "created_date": "2023-05-21T11:57:16.000000+00:00", "event_timestamp": "2023-05-21T11:57:16.825112+00:00", "expiration_date": "2023-05-21T12:13:15.000000+00:00", "item": {}, "maker": { "address": "0x999999999d945a771f6d89b76581db9798003a69" }, "order_hash": "0x21e63f8c80c94c0ae557f4fcf19c4974fd29ea081bb507c037a51a2dd74b3de2", "payment_token": { "address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", "decimals": 18, "eth_price": "1.000000000000000", "name": "Ether", "symbol": "ETH", "usd_price": "1810.390000000000100000" }, "protocol_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc", "protocol_data": { "parameters": { "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000", "consideration": [{ "endAmount": "1", "identifierOrCriteria": "87069156600715629722106400823718473258797021969785074461649705976549875505039", "itemType": 4, "recipient": "0x999999999d945a771F6d89B76581DB9798003a69", "startAmount": "1", "token": "0x670fd103b1a08628e9557cD66B87DeD841115190" }, { "endAmount": "34999999999999997", "identifierOrCriteria": "0", "itemType": 1, "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719", "startAmount": "34999999999999997", "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" }, { "endAmount": "46619999999999997", "identifierOrCriteria": "0", "itemType": 1, "recipient": "0xa45D808eAFDe8B8E6B6B078fd246e28AD13030E8", "startAmount": "46619999999999997", "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" }], "counter": 0, "endTime": "1684671195", "offer": [{ "endAmount": "1399999999999999911", "identifierOrCriteria": "0", "itemType": 1, "startAmount": "1399999999999999911", "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" }], "offerer": "0x999999999d945a771f6d89b76581db9798003a69", "orderType": 2, "salt": "0x360c6ebe00000000000000000000000000000000000000006f3a8304fe1f565d", "startTime": "1684670236", "totalOriginalConsiderationItems": 3, "zone": "0x000000e7Ec00e7B300774b00001314B8610022b8", "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000" }, "signature": null }, "quantity": 1, "taker": null, "trait_criteria": { "trait_name": "24k Gold Blocks", "trait_type": "Eyewear" } }, "sent_at": "2023-05-21T11:57:16.899991+00:00" }, "ref": null, "topic": "collection:y00ts" }
dotenv.config();
const bid = {
    "event": "item_received_bid",
    "payload": {
        "event_type": "item_received_bid",
        "payload": {
            "base_price": "1751100000000000000",
            "collection": {
                "slug": "y00ts"
            },
            "created_date": "2023-05-21T13:06:32.000000+00:00",
            "event_timestamp": "2023-05-21T13:06:43.362055+00:00",
            "expiration_date": "2023-05-24T13:06:17.000000+00:00",
            "item": {
                "chain": {
                    "name": "matic"
                },
                "metadata": {
                    "animation_url": null,
                    "image_url": "https://i.seadn.io/gcs/files/211091d282cc2a9921ad23576ac6933b.png?w=500&auto=format",
                    "metadata_url": "https://metadata.y00ts.com/y/9984.json",
                    "name": "y00t #9985"
                },
                "nft_id": "matic/0x670fd103b1a08628e9557cd66b87ded841115190/9984",
                "permalink": "https://opensea.io/assets/matic/0x670fd103b1a08628e9557cd66b87ded841115190/9984"
            },
            "maker": {
                "address": "0x7877f092915f21dabd9d6944a4589d33c1f02b0a"
            },
            "order_hash": "0x4f214d2a01ede5fa03b32a90589b7869cb4e0c4252f2b4574b5b84d5a0c88950",
            "payment_token": {
                "address": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
                "decimals": 18,
                "eth_price": "1.000000000000000",
                "name": "Ether",
                "symbol": "ETH",
                "usd_price": "1810.410000000000082000"
            },
            "protocol_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
            "protocol_data": {
                "parameters": {
                    "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                    "consideration": [
                        {
                            "endAmount": "1",
                            "identifierOrCriteria": "9984",
                            "itemType": 2,
                            "recipient": "0x7877f092915F21DaBd9D6944a4589d33C1f02B0a",
                            "startAmount": "1",
                            "token": "0x670fd103b1a08628e9557cD66B87DeD841115190"
                        },
                        {
                            "endAmount": "43777500000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 1,
                            "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719",
                            "startAmount": "43777500000000000",
                            "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
                        },
                        {
                            "endAmount": "58311630000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 1,
                            "recipient": "0xa45D808eAFDe8B8E6B6B078fd246e28AD13030E8",
                            "startAmount": "58311630000000000",
                            "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
                        }
                    ],
                    "counter": 0,
                    "endTime": "1684933577",
                    "offer": [
                        {
                            "endAmount": "1751100000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 1,
                            "startAmount": "1751100000000000000",
                            "token": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
                        }
                    ],
                    "offerer": "0x7877f092915f21dabd9d6944a4589d33c1f02b0a",
                    "orderType": 0,
                    "salt": "0x360c6ebe0000000000000000000000000000000000000000a42b8cdfa5f0b4c0",
                    "startTime": "1684674392",
                    "totalOriginalConsiderationItems": 3,
                    "zone": "0x0000000000000000000000000000000000000000",
                    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "signature": null
            },
            "quantity": 1,
            "taker": null
        },
        "sent_at": "2023-05-21T13:07:05.317496+00:00"
    },
    "ref": null,
    "topic": "collection:y00ts"
}
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
        console.log('Received message:', event.data);

        const data = JSON.parse(event.data)
        const webhook = 'https://discord.com/api/webhooks/1109806312344264807/tYu8S6UpcZqxoJELV6e7q5bj0AHwk9jrIM5mxCRmj8CdkC6JYUYWXwQdTRYs5zBJfQjL'

        if (data && data.payload.event_type === 'trait_offer') {
            var payload = {
                embeds: [
                    {
                        title: data.payload.payload.item.metadata.name + " | " + data.payload.event_type,
                        fields: [
                            {
                                name: 'Event Type',
                                value: data.payload.event_type,
                                inline: true
                            },
                            {
                                name: 'Bid Amount',
                                value: y00ts.payload.payload.base_price / 10 * 18,
                                inline: true
                            },
                            {
                                name: 'Trait Name',
                                value: data.payload.payload.trait_criteria.trait_name,
                                inline: true
                            },
                            {
                                name: 'Trait Type',
                                value: data.payload.payload.trait_criteria.trait_type,
                                inline: true
                            },
                            // Add more fields as needed
                        ],
                        timestamp: new Date().toISOString()
                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'item_listed') {
            var payload = {
                embeds: [
                    {
                        title: data.payload.event_type,
                    }
                ]
            }
        }

        else if (data && data.payload.event_type === 'item_received_bid') {
            var payload = {
                embeds: [
                    {
                        title: data.payload.event_type,
                        fields: [
                            {
                                name: 'Event Type',
                                value: data.payload.event_type,
                                inline: true
                            },
                            {
                                name: 'Item',
                                value: data.payload.payload.item.metadata.name,
                                inline: true
                            }, {
                                name: 'Bid Amount',
                                value: data.payload.payload.base_price / 10 * 18,
                                inline: true
                            }

                            // Add more fields as needed
                        ],
                        timestamp: new Date().toISOString()
                    }
                ]
            };
        } else if (data.event === 'phx_reply') {
            var payload = { content: '' };
        } else {
            var payload = { content: 'No event type' };
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        const req = await fetch(webhook, options);
        const res = await req.text()
        console.log(res)
    });

});


socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});
