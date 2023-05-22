import WebSocket from 'ws';
import dotenv from 'dotenv';
import tweeter from './tweeter.js';

const GWEI_IN_ETH = 1_000_000_000_000_000_000;

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

    // Send heartbeat every 27 seconds
    setInterval(() => {
        socket.send(JSON.stringify(heartbeat));
    }, 27000);

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
        console.log('\n\n\n------------------------\n', event.data + " " + new Date(), '\n----------------------\n');

        const data = JSON.parse(event.data)
        const webhook = 'https://discord.com/api/webhooks/1109806312344264807/tYu8S6UpcZqxoJELV6e7q5bj0AHwk9jrIM5mxCRmj8CdkC6JYUYWXwQdTRYs5zBJfQjL'

        if (data && data.payload.event_type === 'trait_offer') {
            var payload = {
                "embeds": [
                    {
                        "title": "Trait Offer",
                        "description": `A degen just offered ${(data.payload?.payload?.protocol_data?.parameters.offer[0].startAmount / GWEI_IN_ETH).toFixed(2)} for ${data.payload.payload.collection.slug} with ${(data.payload.payload.trait_criteria.trait_name).toLowerCase()} ${(data.payload.payload.trait_criteria.trait_type).toLowerCase()}.`
                    }
                ]
            }

        }
        else if (data && data.payload.event_type === 'traits_offer') {
            var payload = { "title": `Traits Offer`, "content": `traits offer made` }
        }
        else if (data && data.payload.event_type === 'item_listed') {
            var payload = {
                "embeds": [
                    {
                        "title": "New Listing",
                        "image": { "url": data.payload.payload.item.metadata.image_url },
                        "description": `${data.payload.payload.item.metadata.name} just listed for ${(data.payload.payload.base_price / GWEI_IN_ETH).toFixed(2)} ${data.payload.payload.item.permalink}`
                    }
                ]
            }

            const tweet = `${data.payload.payload.item.metadata.name} just listed for ${(data.payload.payload.base_price / GWEI_IN_ETH).toFixed(2)} ${data.payload.payload.item.permalink}`
            const req = await tweeter(tweet)
        }
        else if (data && data.payload.event_type === 'item_received_bid') {
            var payload = {
                "embeds": [
                    {
                        "title": "Bid Received",
                        "description": `${data.payload.payload.item.metadata.name} for ${(data.payload?.payload?.protocol_data?.parameters.offer[0].startAmount / GWEI_IN_ETH).toFixed(2)}\n See it @  ${data.payload.payload.item.permalink}`,
                        "image": { "url": data.payload.payload.item.metadata.image_url },

                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'item_received_offer') {
            var payload = {
                "embeds": [
                    {
                        "title": "Offer Received",
                        "image": { "url": data.payload.payload.item.metadata.image_url },
                        "description": `A degen just offered ${(data.payload?.payload?.protocol_data?.parameters.offer[0].startAmount / GWEI_IN_ETH).toFixed()} for ${data.payload.payload.collection.slug}\n Have a geyser @ ${data.payload.payload.item.permalink}`
                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'item_metadata_updated') {
            var payload = {
                "embeds": [
                    {
                        "title": "Metadata Updated",
                        "image": { "url": data.payload.payload.item.metadata.image_url },
                        "description": `The metadata for ${data.payload.payload.name} was just updated. Have a look @ ${data.payload.payload.item.permalink}`
                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'item_sold') {
            var payload = {
                "embeds": [
                    {
                        "title": "Item Sold",
                        "image": { "url": data.payload.payload.item.metadata.image_url },
                        "description": `${data.payload.payload.item.metadata.name} just sold for ${(data.payload.payload.sale_price / GWEI_IN_ETH).toFixed(2)}! ${data.payload.payload.item.permalink}`
                    }
                ]
            }
            const tweet = `${data.payload.payload.item.metadata.name} just sold for ${(data.payload.payload.sale_price / GWEI_IN_ETH).toFixed(2)}! ${data.payload.payload.item.permalink}`
            const req = await tweeter(tweet)

        }
        else if (data && data.payload.event_type === 'item_cancelled') {
            var payload = {
                "embeds": [
                    {
                        "title": "Listing Cancelled",
                        "image": { "url": data.payload?.payload?.item?.metadata?.image_url },
                        "description": `${data.payload.payload.item.metadata.name} was just delisted! You missed it @ ${data.payload.payload.item.permalink}`
                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'collection_offer') {
            var payload = {
                "embeds": [
                    {
                        "title": "Collection Offer Made",
                        "description": `A degen just offered ${(data.payload?.payload?.protocol_data?.parameters.offer[0].startAmount / GWEI_IN_ETH).toFixed(2)} for ${data.payload.payload.collection.slug} which is ${(data.payload.payload.base_price - data.payload.payload.protocol_data.parameters.offer[0].startAmount).toFixed()} below the flooprice of ${data.payload.payload.base_price / GWEI_IN_ETH}.`
                    }
                ]
            }
        }
        else if (data && data.payload.event_type === 'item_transferred') {
            var payload = {
                "embeds": [
                    {
                        "title": "Item Transferred",
                        "image": { "url": data.payload.payload.item.metadata.image_url },
                        "description": `A degen just transferred ${data.payload.payload.item.metadata.name}\n Sus it out @ ${data.payload.payload.item.permalink}`
                    }
                ]
            }

        }

        else if (data.event === 'phx_reply') {
            // var payload = { content: `heartbeat` };
        }
        else {
            var payload = { content: JSON.stringify(data.event) };
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        if (payload) {
            const req = await fetch(webhook, options);
            const res = await req.text()
            console.log(res)
        }
    });

});


socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
});
