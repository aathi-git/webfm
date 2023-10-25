const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    // Add the new client to the set
    clients.add(ws);

    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        for (const client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    ws.on('close', () => {
        // Remove the client from the set when they disconnect
        clients.delete(ws);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('WebSocket server is running');
});
