const bedrock = require('bedrock-protocol');
const http = require('http');

// 1. Render Mandatory Health Check Server
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Minecraft Bot is Alive!\n');
}).listen(PORT, () => {
    console.log(`Render health check server listening on port ${PORT}`);
});

// 2. Your Original Minecraft Bot Logic
const host = 'fish.aternos.host'; 
const port = 52738; 
const username = 'github_bot';

function startBot() {
    console.log(`[${new Date().toLocaleTimeString()}] Connecting to Bedrock server ${host}:${port}...`);

    const client = bedrock.createClient({
        host: host,
        port: port,
        username: username,
        offline: true, 
        skipPing: true
    });

    client.on('join', () => {
        console.log(`[${new Date().toLocaleTimeString()}] Success! ${username} is now online.`);
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

