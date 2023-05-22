onst sdk = require('api')('@opensea/v1.0#10fy4ug30l7qohm4q');

sdk.retrievingASingleAsset({
    include_orders: 'false',
    asset_contract_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    token_id: '1'
})
    .then(({ data }) => console.log(data))
    .catch(err => console.error(err));