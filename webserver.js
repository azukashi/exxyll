const client = require("./index.js");
const config = require("./config.json");
const prefix = config.prefix;

const clientDetails = {
  guilds: client.guilds.cache.size,
  users: client.users.cache.size,
  channels: client.channels.cache.size,
};
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("Main Page");
});

app.get("/info", (req, res) => {
  res.status(200).send(clientDetails);
});

app.listen(port);
