const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = new Map(); // Store rooms and their users

// Serve static files (e.g., HTML, CSS, and JavaScript)
app.use(express.static('public'));

// WebSocket server logic
wss.on('connection', (ws) => {
    console.log('Client connected.');

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const { type, room, username, content } = data;

        switch (type) {
            case 'join':
                joinRoom(room, username, ws);
                break;
            case 'message':
                sendMessage(room, username, content);
                break;
            case 'audio':
                sendAudio(room, username, content);
                break;
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

function joinRoom(room, username, ws) {
    if (!rooms.has(room)) {
        rooms.set(room, new Map());
    }

    const roomUsers = rooms.get(room);
    roomUsers.set(username, ws);

    // Send a welcome message to the new user
    const welcomeMessage = {
        type: 'message',
        username: 'System',
        content: `Welcome to room "${room}", ${username}!`,
    };
    ws.send(JSON.stringify(welcomeMessage));
}

function sendMessage(room, username, content) {
    const roomUsers = rooms.get(room);

    for (const [user, userWs] of roomUsers) {
        const message = {
            type: 'message',
            username,
            content,
        };
        userWs.send(JSON.stringify(message));
    }
}

function sendAudio(room, username, audioData) {
    const roomUsers = rooms.get(room);

    for (const [user, userWs] of roomUsers) {
        const audioMessage = {
            type: 'audio',
            username,
            audioData,
        };
        userWs.send(JSON.stringify(audioMessage));
    }
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
