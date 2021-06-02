const client = require("../index");
const path = require("path");

client.on("ready", () => {
  console.log(`${client.user.username} has logged on!`);

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size,
  };

  // Express Setup
  const express = require("express");
  const app = express();
  const port = 3000 || 3001;

  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
  });
  app.get("/info", (req, res) => {
    res.status(200).send(clientDetails);
  });
  app.get("/commands", (req, res) => {
    res.status(200);
  });
  app.listen(port);
});
