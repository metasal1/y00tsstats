import WebSocket from 'ws';
import dotenv from 'dotenv';
import tweeter from './tweeter.js';
import discorder from './discorder.js';
import fetch from 'node-fetch';

// "content": "Hello, **bold** and *italic* and __underlined__ and ~~strikethrough~~!"

const payload = {
    "event_type": "collection_offer",
    "sent_at": "2022-12-01T16:09:23.287500+00:00",
    "payload": {
        "asset_contract_criteria": {
            "address": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e"
        },
        "base_price": "6055100000000000000",
        "collection": {
            "slug": "doodles-official"
        },
        "collection_criteria": {
            "slug": "doodles-official"
        },
        "created_date": "2022-12-01T16:09:22.000000+00:00",
        "event_timestamp": "2022-12-01T16:09:22.951285+00:00",
        "expiration_date": "2022-12-01T16:25:22.000000+00:00",
        "item": {

        },
        "maker": {
            "address": "0xc1bb39ba8ab14b37d4dd59c457042f639dfef95d"
        },
        "order_hash": "0xde046c3273a8811e32a52de3b2c705366e67e27115793382c84ef865fc36d941",
        "payment_token": {
            "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "decimals": 18,
            "eth_price": "1.000000000000000",
            "name": "Wrapped Ether",
            "symbol": "WETH",
            "usd_price": "1215.779999999999973000"
        },
        "protocol_data": {
            "parameters": {
                "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                "consideration": [
                    {
                        "endAmount": 1,
                        "identifierOrCriteria": 1.0479044511256843e+77,
                        "itemType": 4,
                        "recipient": "0xC1BB39bA8aB14b37d4dD59C457042F639dfef95d",
                        "startAmount": 1,
                        "token": "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e"
                    },
                    {
                        "endAmount": 151377500000000000,
                        "identifierOrCriteria": 0,
                        "itemType": 1,
                        "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719",
                        "startAmount": 151377500000000000,
                        "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    },
                    {
                        "endAmount": 302755000000000000,
                        "identifierOrCriteria": 0,
                        "itemType": 1,
                        "recipient": "0xd1F124cc900624e1ff2d923180b3924147364380",
                        "startAmount": 302755000000000000,
                        "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    }
                ],
                "counter": 0,
                "endTime": 1669911922,
                "offer": [
                    {
                        "endAmount": 6055100000000000000,
                        "identifierOrCriteria": 0,
                        "itemType": 1,
                        "startAmount": 6055100000000000000,
                        "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    }
                ],
                "offerer": "0xC1BB39bA8aB14b37d4dD59C457042F639dfef95d",
                "orderType": 2,
                "salt": 6.054751888727945e+36,
                "startTime": 1669910962,
                "totalOriginalConsiderationItems": 3,
                "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
                "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
            },
            "signature": "0xbff7067712a3f13d3e81a39f076c62adbb0a4e23d3e0f5634fb7b6a130c0a63c7b26f818240d464bfb84109ca8786a3eaef5c2ee1b416d974ed013e63a1c911f1b"
        },
        "quantity": 1,
        "taker": null
    }
}
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
                offer: `**${(data.payload?.payload?.protocol_data?.parameters?.offer[0]?.startAmount / GWEI_IN_ETH).toFixed(2)}**`,
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
                    description: `A degen just offered ${item.price} for ${item.collection} with ${item.trait_name} ${item.trait_type} and it's listed for ${item.offer}`
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
                    title: `Bid received for ${item.name}`,
                    image: item.image,
                    url: item.url,
                    description: `A bid for ${item.offer} was placed on ${item.name} but you can buy it for ${item.price}`,
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
                    title: `A ${item.collection} was made an offer ${item.price}`,
                    description: `But you can buy it for ${item.floor}`,
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
