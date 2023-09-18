const { Server } = require('ws');
const WebSocketServer = Server;
const http = require('http');

let onlineUsers = 0;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server running on Vercel\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    onlineUsers++;
    updateOnlineUsers();

    ws.on('close', () => {
        onlineUsers--;
        updateOnlineUsers();
    });
});

function updateOnlineUsers() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocketServer.OPEN) {
            client.send(onlineUsers.toString());
        }
    });
}

module.exports = server;
