const bid = {
    "event": "item_sold",
    "payload": {
        "event_type": "item_sold",
        "payload": {
            "closing_date": "2023-05-22T00:52:47.000000+00:00",
            "collection": {
                "slug": "emblem-vault"
            },
            "event_timestamp": "2023-05-22T00:52:47.000000+00:00",
            "is_private": false,
            "item": {
                "chain": {
                    "name": "ethereum"
                },
                "metadata": {
                    "animation_url": null,
                    "image_url": "https://i.seadn.io/gcs/files/58c35d90b24aaef0c5f187d562d2f815.png?w=500&auto=format",
                    "metadata_url": "https://api.emblemvault.io/s:evmetadata/meta/36243717267408641",
                    "name": "StamPunk #7401"
                },
                "nft_id": "ethereum/0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab/36243717267408641",
                "permalink": "https://opensea.io/assets/ethereum/0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab/36243717267408641"
            },
            "listing_type": null,
            "maker": {
                "address": "0x9c21ba9b67696c192007691c1126bf22d34468e6"
            },
            "order_hash": "0x44683b701286ccc9053bb4b4c433d9fb22795498cd6fa4bf5846597f73199ac1",
            "payment_token": {
                "address": "0x0000000000000000000000000000000000000000",
                "decimals": 18,
                "eth_price": "1.000000000000000",
                "name": "Ether",
                "symbol": "ETH",
                "usd_price": "1805.279999999999973000"
            },
            "protocol_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
            "protocol_data": {
                "parameters": {
                    "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                    "consideration": [
                        {
                            "endAmount": "117808000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 0,
                            "recipient": "0x9c21Ba9B67696C192007691C1126bf22D34468E6",
                            "startAmount": "117808000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        },
                        {
                            "endAmount": "592000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 0,
                            "recipient": "0x74Ce08242C97FaC3BE8B63A9d5061c5EF2c1C3a8",
                            "startAmount": "592000000000000",
                            "token": "0x0000000000000000000000000000000000000000"
                        }
                    ],
                    "counter": 0,
                    "endTime": "1687308624",
                    "offer": [
                        {
                            "endAmount": "1",
                            "identifierOrCriteria": "36243717267408641",
                            "itemType": 2,
                            "startAmount": "1",
                            "token": "0x82C7a8f707110f5FBb16184A5933E9F78a34c6ab"
                        }
                    ],
                    "offerer": "0x9c21ba9b67696c192007691c1126bf22d34468e6",
                    "orderType": 0,
                    "salt": "0x72db8c0b0000000000000000000000000000000000000000a223dbbf02210ee0",
                    "startTime": "1684716624",
                    "totalOriginalConsiderationItems": 2,
                    "zone": "0x004C00500000aD104D7DBd00e3ae0A5C00560C00",
                    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "signature": null
            },
            "quantity": 1,
            "sale_price": "118400000000000000",
            "taker": {
                "address": "0xf78ee64bbc365d43e3ec86cdcc61a2e7389b4561"
            },
            "transaction": {
                "hash": "0x43d6305f26b0b64034883b3a93aa1bafd6a1c20749e9ea84a0cb6ad5a3eb132c",
                "timestamp": "2023-05-22T00:52:47.000000+00:00"
            }
        },
        "sent_at": "2023-05-22T00:52:57.056776+00:00"
    },
    "ref": null,
    "topic": "collection:*"
}
bid.payload.payload.base_price
bid.payload.payload.item.metadata.name
bid.payload.payload.protocol_data.parameters.offer

bid.payload.payload.item.metadata.image_url

bid.payload.payload.sale_price