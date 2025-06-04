// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Broadcast message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });const WebSocket = require('ws');
  const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });
  
  wss.on('connection', ws => {
    console.log('New client connected');
    ws.on('message', message => {
      console.log(`Broadcasting: ${message}`);
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  console.log('WebSocket server running on ws://0.0.0.0:8080 (accessible on LAN)');
});

console.log('WebSocket server running on ws://localhost:8080');