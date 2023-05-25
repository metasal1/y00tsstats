import WebSocket from 'ws';
import dotenv from 'dotenv';
import tweeter from './tweeter.js';
import discorder from './discorder.js';
import fetch from 'node-fetch';

// "content": "Hello, **bold** and *italic* and __underlined__ and ~~strikethrough~~!"

const GWEI_IN_ETH = 1_000_000_000_000_000_000;
const webhook = process.env.DISCORD_WEBHOOK_Y00TS_LISTINGS;
dotenv.config();

const connectWebSocket = () => {

    const socket = new WebSocket(`wss://stream.openseabeta.com/socket/websocket?token=${process.env.OPENSEA_API_KEY}`);

    const heartbeat = {
        "topic": "phoenix",
        "event": "heartbeat",
        "payload": {},
        "ref": 0
    }
    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');

        // Send heartbeat every 28 seconds
        setInterval(() => {
            socket.send(JSON.stringify(heartbeat));
        }, 28000);

        // subscribe to collection
        const subscribe = {
            // "topic": "collection:*",
            "topic": "collection:y00ts",
            // "topic": "collection:mutant-ape-yacht-club",
            "event": "phx_join",
            "payload": {},
            "ref": 0
        }
        socket.send(JSON.stringify(subscribe));
        // Handle incoming messages
        socket.addEventListener('message', async (event) => {
            const data = JSON.parse(event.data)
            console.log('\n\n\n------------------------\n', data.event + " " + new Date(), '\n----------------------\n');

            const eventType = data?.event;

            const item = {
                name: `__${data?.payload?.payload?.item?.metadata?.name}__`,
                price: `**${(data?.payload?.payload?.base_price / GWEI_IN_ETH).toFixed(2)}**`,
                offer: `**__${(data.payload?.payload?.maker?.offer?.startAmount / GWEI_IN_ETH).toFixed(2)}__**`,
                image: data?.payload?.payload?.item?.metadata?.image_url,
                url: data?.payload?.payload?.item?.permalink,
                collection: `__${data?.payload?.payload?.collection?.slug}__`,
                trait_name: `*${data?.payload?.payload?.trait_criteria?.trait_name.toLowerCase()}*`,
                trait_type: `*${data?.payload?.payload?.trait_criteria?.trait_type.toLowerCase()}*`,
            }
            if (eventType === 'phx_reply') {
                console.log('heartbeat' + new Date());
            }
            if (eventType === 'trait_offer') {

                const discord_post = {
                    title: 'Offer to buy based on trait',
                    image: item.image,
                    url: item.url,
                    description: `A degen just offered ${item.price} for ${item.collection} with ${item.trait_name} ${item.trait_type}`
                }

                const post = discorder(webhook, discord_post);

            }
            if (eventType === 'traits_offer') {

                const discord_post = {
                    title: 'Offer to buy based on traits',
                    image: item.image,
                    url: item.url,
                    description: `Many traits offer`
                }

                const post = discorder(webhook, discord_post);

            }
            if (eventType === 'item_listed') {

                const discord_post = {
                    title: `${item.name} just listed`,
                    image: item.image,
                    url: item.url,
                    description: `You can buy it for ${item.price}`,
                    color: '3066993' //green
                }

                const post = discorder(webhook, discord_post);
                const req = await tweeter(`🔔🔔🔔🔔🔔🔔🔔🔔🔔\n\n${item.name} just listed for ${item.price}\n\n${item.url}\n\🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔`)
            }
            if (eventType === 'item_received_bid') {
                const discord_post = {
                    title: 'Bid received',
                    image: item.image,
                    url: item.url,
                    description: `${item.name} just received a bid for ${item.price}`,
                    // purple
                    color: '10181046'
                }

                const post = discorder(webhook, discord_post);
            }
            if (eventType === 'item_received_offer') {

                const discord_post = {
                    title: 'Offer received',
                    image: item.image,
                    url: item.url,
                    description: `${item.name} just received an offer for ${item.price}`,
                    // orange
                    color: '15105570'
                }

                const post = discorder(webhook, discord_post);

            }
            if (eventType === 'item_metadata_updated') {
                const discord_post = {
                    title: 'Metadata Updated',
                    image: item.image,
                    url: item.url,
                    description: `${item.name} just updated its metadata`,
                    // red
                    color: '15158332'
                }

                const post = discorder(webhook, discord_post);

            }
            if (eventType === 'item_sold') {

                const discord_post = {
                    title: `${item.name} just sold for ${item.price}`,
                    image: item.image,
                    url: item.url,
                    // red
                    color: 'ffffff'
                }

                const post = discorder(webhook, discord_post);

                const req = await tweeter(`🚨🚨🚨🚨🚨🚨🚨🚨🚨\n\n${item.name} just sold for ${item.price}\n\n${item.url} \n\n🚨🚨🚨🚨🚨🚨🚨🚨🚨`)

            }
            if (eventType === 'item_cancelled') {
                const discord_post = {
                    title: `${item.name} just was delisted.`,
                    image: item.image,
                    url: item.url,
                    // grey
                    color: '9807270'
                }

                const post = discorder(webhook, discord_post);
            }
            if (eventType === 'collection_offer') {

                const discord_post = {
                    title: `${item.collection} was offered ${item.price} `,
                    image: item.image,
                    url: item.url,
                    // pink
                    color: '16711808'
                }
                const post = discorder(webhook, discord_post);

            }
            if (eventType === 'item_transferred') {
                const discord_post = {
                    title: `${item.name} just got transferred`,
                    image: item.image,
                    url: item.url,
                    // yellow
                    color: '16776960'
                }
                const post = discorder(webhook, discord_post);

            }

        });

    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
        connectWebSocket();
    });
}


// Initial connection
connectWebSocket();
