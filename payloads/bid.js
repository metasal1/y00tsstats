const trait = {
    "event": "trait_offer",
    "payload": {
        "event_type": "trait_offer",
        "payload": {
            "asset_contract_criteria": {
                "address": "0x60e4d786628fea6478f785a6d7e704777c86a7c6"
            },
            "base_price": "9658900000000000000",
            "collection": {
                "slug": "mutant-ape-yacht-club"
            },
            "collection_criteria": {
                "slug": "mutant-ape-yacht-club"
            },
            "created_date": "2023-05-22T00:52:51.000000+00:00",
            "event_timestamp": "2023-05-22T00:52:54.412985+00:00",
            "expiration_date": "2023-05-22T01:12:46.000000+00:00",
            "item": {},
            "maker": {
                "address": "0x2081afdbbbdd8814991fe4dc500026248227bc89"
            },
            "order_hash": "0xdbf261ad4bca870219f142a79f46abea0b511232921d60424a494ea180d0b88a",
            "payment_token": {
                "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "decimals": 18,
                "eth_price": "1.000000000000000",
                "name": "Wrapped Ether",
                "symbol": "WETH",
                "usd_price": "1806.019999999999982000"
            },
            "protocol_address": "0x00000000000000adc04c56bf30ac9d3c0aaf14dc",
            "protocol_data": {
                "parameters": {
                    "conduitKey": "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
                    "consideration": [
                        {
                            "endAmount": "1",
                            "identifierOrCriteria": "32258212988602046267479872838467769783108160267212708040588146074199840681969",
                            "itemType": 4,
                            "recipient": "0x2081AfdbBBdD8814991Fe4DC500026248227bC89",
                            "startAmount": "1",
                            "token": "0x60E4d786628Fea6478F785A6d7e704777c86a7c6"
                        },
                        {
                            "endAmount": "241472500000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 1,
                            "recipient": "0x0000a26b00c1F0DF003000390027140000fAa719",
                            "startAmount": "241472500000000000",
                            "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                        }
                    ],
                    "counter": 0,
                    "endTime": "1684717966",
                    "offer": [
                        {
                            "endAmount": "9658900000000000000",
                            "identifierOrCriteria": "0",
                            "itemType": 1,
                            "startAmount": "9658900000000000000",
                            "token": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                        }
                    ],
                    "offerer": "0x2081afdbbbdd8814991fe4dc500026248227bc89",
                    "orderType": 1,
                    "salt": "0x5c2795417592230",
                    "startTime": "1684716771",
                    "totalOriginalConsiderationItems": 2,
                    "zone": "0x0000000000000000000000000000000000000000",
                    "zoneHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "signature": null
            },
            "quantity": 1,
            "taker": null,
            "trait_criteria": {
                "trait_name": "M2 White",
                "trait_type": "Fur"
            }
        },
        "sent_at": "2023-05-22T00:52:57.949666+00:00"
    },
    "ref": null,
    "topic": "collection:*"
}

trait.payload.payload.protocol_data.parameters.offer

trait.payload.payload.trait_criteria.trait_name
trait.payload.payload.trait_criteria.trait_type

trait.payload.payload.collection.slug

