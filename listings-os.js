import crypto from "crypto";
import OAuth from "oauth-1.0a";
import dotenv from "dotenv";
import schedule from "node-schedule";
import fs from "fs";

dotenv.config();

// minute | hour | day of month | month | day of week monday = 1
const tweetSchedule = schedule.scheduleJob('0 * * * *', async function () {

  const access_token = process.env.TWITTER_ACCESS_TOKEN;
  const access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

  const consumer_key = process.env.TWITTER_CONSUMER_KEY;
  const consumer_secret = process.env.TWITTER_CONSUMER_SECRET;


  const request = await fetch('https://api.opensea.io/api/v1/collection/y00ts')
  const response = await request.json();

  const todaySales = response.collection.stats.one_day_sales.toLocaleString(); // Format with commas
  const totalSales = response.collection.stats.total_sales.toLocaleString(); // Format with commas
  const owners = response.collection.stats.num_owners.toLocaleString(); // Format with commas
  const avgPrice = response.collection.stats.average_price.toFixed(2);
  const marketCap = response.collection.stats.market_cap.toFixed().toLocaleString(); // Format with commas
  const floorPrice = response.collection.stats.floor_price;
  const sevenDaySales = response.collection.stats.seven_day_sales.toLocaleString(); // Format with commas

  const tweet =
    `y00tsNFT Stats\n
24h Sales = ${todaySales} 🔄
7 day Sales = ${sevenDaySales} 🗓
Total Sales = ${totalSales} 💹
Unique Owners = ${owners} 👀
Average Price = ${avgPrice}Ξ 🤑
Total Market Cap = ${marketCap}Ξ 🏦
Floor Price = ${floorPrice}Ξ 🕺🏼`
  const data = {
    text: tweet,
  };
  console.log(data);
  const endpointURL = `https://api.twitter.com/2/tweets`;

  const oauth = OAuth({
    consumer: {
      key: consumer_key,
      secret: consumer_secret,
    },
    signature_method: "HMAC-SHA1",
    hash_function: (baseString, key) =>
      crypto.createHmac("sha1", key).update(baseString).digest("base64"),
  });

  async function getRequest(token) {
    const authHeader = oauth.toHeader(
      oauth.authorize(
        {
          url: endpointURL,
          method: "POST",
        },
        token
      )
    );

    const req = await fetch(endpointURL, {
      method: "POST",
      headers: {
        Authorization: authHeader["Authorization"],
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(req.status, req.statusText);

    if (req.body) {
      fs.writeFileSync(
        `logs/${Math.floor(Date.now() / 1000)}.json`,
        JSON.stringify(req.body)
      );
      return req.body;
    } else {
      throw new Error("Unsuccessful request");
    }
  }

  (async () => {
    try {
      // Get user token and secret
      const userToken = {
        key: access_token,
        secret: access_token_secret,
      };
      // Make the request
      const response = await getRequest(userToken);
    } catch (e) {
      console.dir(e);
      fs.writeFileSync(
        `logs/error-${Math.floor(Date.now() / 1000)}.json`,
        JSON.stringify(e)
      );

      process.exit(-1);
    }
    process.exit();
  })();

});
