const { ShardingManager } = require('discord.js');
const chalk = require('chalk');
const { token } = require('./config.json');

const manager = new ShardingManager('./index.js', {
  totalShards: 'auto',
  shardList: 'auto',
  token: token,
});

manager.on('shardCreate', async (shard) => {
  console.log(
    chalk.cyan('[Information] ') +
      chalk.blue(`${new Date()} Spawned ${shard.id}`)
  );
});

manager.spawn();
