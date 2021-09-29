const prefix = require('../config.json').prefix;

module.exports = (client) => {
  client.on('ready', () => {
    client.user.setActivity(
      `${prefix}help | Live at ${client.guilds.cache.size} Servers`,
      {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/falcxxr',
      }
    );
    console.log(`${client.user.username} has logged on!`);

    const clientDetails = {
      guilds: client.guilds.cache.size,
      users: client.users.cache.size,
      channels: client.channels.cache.size,
    };
  });
};
