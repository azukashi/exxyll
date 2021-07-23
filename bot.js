// This file is used for sharding the bot. If you want
// Just run `node bot.js` to shard the bot.
// I'm not sure if this is the best way to do it, but it works.
// Just do if the bot is over 2000 servers.

const { ShardingManager } = require("discord.js");
const config = require("./config.json");
const chalk = require("chalk");

const manager = new ShardingManager("./index.js", {
  totalShards: "auto",
  shardList: "auto",
  token: config.token,
});

manager.on("shardCreate", async (shard) => {
  console.log(
    chalk.cyan("[Information] ") +
      chalk.blue(`${new Date()} Spawned ${shard.id}`)
  );
});

manager.spawn();
