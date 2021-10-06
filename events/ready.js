require('dotenv').config;
const client = require('../index');
const chalk = require('chalk');
const prefix = process.env.PREFIX;

client.on('ready', async () => {
  client.user.setActivity(
    `${prefix}help | Live at ${client.guilds.cache.size} Servers`,
    {
      type: 'STREAMING',
      url: 'https://www.twitch.tv/falcxxr',
    }
  );

  console.log(
    `${chalk.blueBright.bold(client.user.username)}${chalk.white.bold(
      ' is Up and Ready to Go!'
    )}`
  );
});
