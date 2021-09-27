const { Client, Message, MessageEmbed, Util } = require('discord.js');

module.exports = {
  name: 'fetch-guild',
  description: 'Fetch and List All Guild',
  aliases: ['fetch-server', 'list-server'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let clientGuilds = message.client.guilds.cache;
    let messageObj = Util.splitMessage(
      clientGuilds.map(
        (g) =>
          '`' +
          g.id +
          `\` **|** \`` +
          g.name +
          `\` **|** \`` +
          g.members.cache.size +
          '`'
      ) || 'None'
    );
    if (messageObj.length == 1) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Showing Guild List`)
            .setDescription(
              `Guild ID | Guild Name | Total Members\n${messageObj[0]}`
            )
            .setColor('#800080'),
        ],
      });
    } else {
      for (i = 0; messageObj.length < i; i++) {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle(`Showing Guild List`)
              .setDescription(
                `Guild ID | Guild Name | Total Members\n${messageObj[i]}`
              )
              .setColor('#800080'),
          ],
        });
      }
    }
  },
};
