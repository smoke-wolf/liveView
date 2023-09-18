const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let onlineUsers = 0;

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
        if (client.readyState === WebSocket.OPEN) {
            client.send(onlineUsers.toString());
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
