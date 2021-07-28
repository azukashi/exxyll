// This file is used for sharding the bot.
// Just run `node bot.js` to shard the bot.
// Just do this if the bot is over 2000 servers.

const { ShardingManager } = require("discord.js");
const chalk = require("chalk");

const manager = new ShardingManager("./index.js", {
  totalShards: "auto",
  shardList: "auto",
  token: process.env.TOKEN,
});

manager.on("shardCreate", async (shard) => {
  console.log(
    chalk.cyan("[Information] ") +
      chalk.blue(`${new Date()} Spawned ${shard.id}`)
  );
});

manager.spawn();
