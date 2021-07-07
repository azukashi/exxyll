const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });
const client = require("../index");
const prefix = require("../config.json").prefix;

client.on("ready", () => {
  client.user.setActivity(`.help or @Exxyll | Live on ${client.guilds.cache.size}`, {
      type: "STREAMING",
      url: "https://www.twitch.tv/falcxxr",
  })
  console.log(`${client.user.username} has logged on!`);

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
});
