const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });
const client = require("../index");
const prefix = require("../config.json").prefix;

client.on("ready", () => {
  const arrayOfStatus = [
    `.help or @Exxyll`,
    `${client.guilds.cache.size} Servers`,
    `${client.channels.cache.size} Channels`,
    `${client.users.cache.size} Users`,
  ];
  let indexnum = 0;
  setInterval(() => {
    if (indexnum === arrayOfStatus.length) index = 0;
    const presenceStatus = arrayOfStatus[indexnum];
    console.log(presenceStatus);
    client.user.setActivity(presenceStatus, {
      type: "STREAMING",
      url: "https://www.twitch.tv/falcxxr",
    });
    indexnum++;
  }, 15000);
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
