const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

const manager = new ShardingManager('./index.js', {
  totalShards: 'auto',
  shardList: 'auto',
  token: process.env.TOKEN,
});

manager.on('shardCreate', async (shard) => {
  console.log(
    chalk.cyan('[Information] ') +
      chalk.blue(`${new Date()} Spawned ${shard.id}`)
  );
});

manager.spawn();
