const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });
const client = require("../index");
const prefix = require("../config.json").prefix;

client.on("ready", () => {
  client.user.setActivity(`${prefix}help`, {
    type: "STREAMING",
    url: "https://www.twitch.tv/falcxxr",
  });
  console.log(`${client.user.username} has logged on!`);
});
