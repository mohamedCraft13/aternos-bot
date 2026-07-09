const bedrock = require('bedrock-protocol');

const host = 'pikeblenny.aternos.host'; 
const port = 52738; 
const username = 'Bedrock_Bot';

function startBot() {
    console.log(`[${new Date().toLocaleTimeString()}] Connecting to Bedrock server ${host}:${port}...`);

    const client = bedrock.createClient({
        host: host,
        port: port,
        username: username,
        offline: true, // Bypasses Xbox Live, mapping directly to your Aternos settings
        skipPing: true
    });

    client.on('join', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Success! ${username} is now online in the world.`);
    });

    client.on('close', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Disconnected. Reconnecting in 30 seconds...`);
        setTimeout(startBot, 30000);
    });

    client.on('error', (err) => {
        console.error(`[${new Date().toLocaleTimeString()}] Connection Error:`, err.message);
    });
}

startBot();
