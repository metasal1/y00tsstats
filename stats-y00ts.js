import dotenv from "dotenv";
import schedule from "node-schedule";
import fetch from "node-fetch";
import discorder from "./discorder.js";
import tweeter from "./tweeter.js";

const cron = process.argv[2] || process.env.CRON_Y00TS_STATS;
dotenv.config();

// minute | hour | day of month | month | day of week monday = 1
const tweetSchedule = schedule.scheduleJob(import.meta.url, cron, async function () {

  const request = await fetch('https://api.opensea.io/api/v1/collection/y00ts')
  const response = await request.json();

  const todaySales = response.collection.stats.one_day_sales.toLocaleString(); // Format with commas
  const totalSales = response.collection.stats.total_sales.toLocaleString(); // Format with commas
  const owners = response.collection.stats.num_owners.toLocaleString(); // Format with commas
  const avgPrice = response.collection.stats.average_price.toFixed(2);
  const marketCap = response.collection.stats.market_cap.toFixed().toLocaleString(); // Format with commas
  const floorPrice = response.collection.stats.floor_price;
  const sevenDaySales = response.collection.stats.seven_day_sales.toLocaleString(); // Format with commas

  const title = `y00tsNFT Stats\n`
  const tweet = `24h Sales = ${todaySales} 🔄
7 day Sales = ${sevenDaySales} 🗓
Total Sales = ${totalSales} 💹
Unique Owners = ${owners} 👀
Average Price = ${avgPrice}Ξ 🤑
Total Market Cap = ${marketCap}Ξ 🏦
Floor Price = ${floorPrice}Ξ 🕺🏼`


  const data = {
    text: title + tweet,
  };

  console.log(data);

  await discorder(process.env.DISCORD_WEBHOOK_Y00TS_STATS, { title, description: tweet })

  await tweeter(data.text);
});


const nextJob = schedule.scheduledJobs[Object.keys(schedule.scheduledJobs)[0]];
const nextJobName = nextJob.name;
const nextJobTime = nextJob.nextInvocation().toString();

console.log('Next Job:', nextJobName);
console.log('Next Job Time:', nextJobTime);