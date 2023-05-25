import api from 'api';
import dotenv from 'dotenv';
import discorder from './discorder.js';
import schedule from 'node-schedule';

console.log('RUNNING started @ ' + new Date());
dotenv.config();

const LAMPORTS_PER_SOL = 1000000000;

const me = api('@tallal-test/v1.0#1dpgalhi1f8wj');

// minute | hour | day of month | month | day of week monday = 1
const tweetSchedule = schedule.scheduleJob('0 * * * *', async function () {

    me.server('https://api-mainnet.magiceden.dev/v2');
    const req = await me.getCollectionsSymbolStats({ symbol: 'lily' })
    console.log(req.data);

    //{
    //   symbol: 'lily',
    //   floorPrice: 8570000000,
    //   listedCount: 537,
    //   avgPrice24hr: 8178149308.839158,
    //   volumeAll: 875138574051391.5
    // }

    discorder(process.env.DISCORD_LILY_STATS, { title: 'Lily Stats', description: `Current Floor Price: ${(req.data.floorPrice / LAMPORTS_PER_SOL).toFixed(2)} SOL 💃\nHow many listed: ${req.data.listedCount} 🙉\nAverage Price (24hr): ${(req.data.avgPrice24hr / LAMPORTS_PER_SOL).toFixed(2)} SOL 🥑\nVolume (24hr): ${(req.data.volumeAll / LAMPORTS_PER_SOL).toFixed(2)} SOL 🏛️` });
    discorder(process.env.DISCORD_NFTMATE_LILY, { title: 'Lily Stats', description: `Current Floor Price: ${(req.data.floorPrice / LAMPORTS_PER_SOL).toFixed(2)} SOL 💃\nHow many listed: ${req.data.listedCount} 🙉\nAverage Price (24hr): ${(req.data.avgPrice24hr / LAMPORTS_PER_SOL).toFixed(2)} SOL 🥑\nVolume (24hr): ${(req.data.volumeAll / LAMPORTS_PER_SOL).toFixed(2)} SOL 🏛️` });

});
