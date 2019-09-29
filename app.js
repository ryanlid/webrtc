const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({
  server,
  path: "/socket"
});

wss.on("connection", function(ws) {
  console.info("Total connected clients:", wss.clients.size);
  // app.locals.clients = wss.clients;
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.use("/socket", require("./routes/socket"));

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

server.listen(3000);
