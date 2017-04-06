const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.onmessage = (message) => {
    const messageObj = JSON.parse(message.data);
    console.log( `User ${messageObj.username} said ${messageObj.content}`);
    messageObj.id = uuid();
    if(messageObj.type === "postMessage") {
      messageObj.type = "incomingMessage";
    }
    if(messageObj.type === "postNotification") {
      messageObj.type = "incomingNotification";
    }

    wss.broadcast(messageObj);
  };
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});

// Broadcast to all.
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
 