import api from 'api';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import discorder from './discorder.js';
import fs from 'fs';

dotenv.config();

const LAMPORTS_PER_SOL = 1000000000;

const me = api('@tallal-test/v1.0#1dpgalhi1f8wj');

// minute | hour | day of month | month | day of week monday = 1
// const tweetSchedule = schedule.scheduleJob('0 * * * *', async function () {

me.server('https://api-mainnet.magiceden.dev/v2');
const req = await me.getCollectionsSymbolActivities({ symbol: 'lily' })
const data = req.data;
console.log(new Date(req.data[0].blockTime * 1000), `count: ${data.length}`, req.data[0].type, req.data[0].price, req.data[0].image);

fs.writeFileSync(`lily/last.json-${Date.now()}`, JSON.stringify(data, null, 2));

// [{
//     signature: '2vJn7YJd9ftPxCZimc5k5oB7udt79kc5fTVqa4mRqrts7sXC9MZb49nnT7yuzWGKSksvBaxh6ZmH35UJwWvbszHE',
//     type: 'bid',
//     source: 'magiceden_v2',
//     tokenMint: 'GRGZy9rTnKTScAyFqkzPdLtLqpDxSzWGciGvsdG2mBht',
//     collection: 'lily',
//     collectionSymbol: 'lily',
//     slot: 195758382,
//     blockTime: 1684958503,
//     buyer: 'hadeaC5JQvAJugvsa97BPPSdeGQzhWxqK6DAqq5TsW8',
//     buyerReferral: '',
//     seller: null,
//     sellerReferral: '',
//     price: 8.22,
//     image: 'https://bafybeic2ljcj2zz6ceqtqy2prjww2g2p2v3bgqhyti3c6hjqwfuelah2fa.ipfs.nftstorage.link/6714.png?ext=png'
//   }]

// discorder(process.env.DISCORD_LILY_LISTINGS, { title: 'Lily Stats', description: `Current Floor Price: ${(req.data.floorPrice / LAMPORTS_PER_SOL).toFixed(2)} SOL\nHow many listed: ${req.data.listedCount}\nAverage Price (24hr): ${(req.data.avgPrice24hr / LAMPORTS_PER_SOL).toFixed(2)} SOL\nVolume (24hr): ${(req.data.volumeAll / LAMPORTS_PER_SOL).toFixed(2)} SOL` });

// });
