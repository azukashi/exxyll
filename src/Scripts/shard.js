const { ShardingManager } = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
require('dotenv').config();

const manager = new ShardingManager('./index.js', {
    totalShards: 'auto',
    shardList: 'auto',
    token: process.env.TOKEN,
});

manager.on('shardCreate', async shard => {
    console.log(
        chalk.grey.bold('[INFO]  ') + chalk.blue.bold(`${moment(new Date()).format('llll')} Spawned ${shard.id}`)
    );
});

manager.spawn();
