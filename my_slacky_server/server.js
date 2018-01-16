const WebSocket = require("ws");
const server = require("http").createServer();

let numberOfUsers = 0;

const wss = new WebSocket.Server({server});
wss.on("connection", (ws, req) => {
  numberOfUsers += 1;

  ws.on('error', () => console.log('errored'));
  ws.on("message", (data) => {
    console.log("data receive by server " + data);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(4000, () => console.log(`Server listening on 4000`));
