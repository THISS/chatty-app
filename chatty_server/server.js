const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v1');

 
function checkImgUrl(content) {
  return (content.includes(".jpg") || content.includes(".png") || content.includes(".gif"));
}

function broadcastUserCount() {
  wss.broadcast( {type: "userCount", numUsers: wss.clients.size} );
}

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let userId = 1;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // set the users color between 0 and 3
  const colorNum = userId % 4;
  userId++;
  broadcastUserCount();

  ws.onmessage = (message) => {
    const messageObj = JSON.parse(message.data);
    const broadcastObj = {};
    console.log( `User ${messageObj.username} said ${messageObj.content}`);
    broadcastObj.id = uuid();
    broadcastObj.colorNum = colorNum;
    if(messageObj.type === "postMessage") {
      broadcastObj.username = messageObj.username;
      broadcastObj.type = "incomingMessage";
      if (checkImgUrl(messageObj.content)) {
        broadcastObj.img = messageObj.content;
      }else {
        broadcastObj.content = messageObj.content;
      }
    }
    if(messageObj.type === "postNotification") {
      broadcastObj.type = "incomingNotification";
      broadcastObj.oldName = messageObj.oldName;
      broadcastObj.newName = messageObj.newName;
    }

    wss.broadcast(broadcastObj);
  };
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastUserCount();
  });

});

// Broadcast to all.
wss.broadcast = (data) => {
  const stringdUp = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(stringdUp);
    }
  });
};