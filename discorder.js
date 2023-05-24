import dotenv from 'dotenv';
dotenv.config();

export default async function postToDiscord(data) {
    try {

        var payload = {
            "embeds": [
                {
                    "title": data?.title,
                    "image": { "url": data?.imageUrl },
                    "description": data?.description
                }
            ]
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }



        const req = await fetch(process.env.DISCORD_WEBHOOK_URL_STATS, options);
        const res = await req.text()
        console.log('Posted to Discord successfully:', res);
    } catch (error) {
        console.error('Error posting to Discord:', error.message);
    }
}

// Usage example
// postToDiscord({ title: 'test title', imageUrl: 'https://i.imgur.com/4M34hi2.png', description: 'test description' })
