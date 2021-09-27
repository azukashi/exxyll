const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'topgg-post',
  description: 'Post Server Count, Shard Count to Top.gg API',
  aliases: ['post-stats'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== '788260234409672754') return;
    const key = process.env.TOPGG_TOKEN;
    setInterval(() => {
      fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
        method: 'POST',
        body: JSON.stringify({
          server_count: client.guilds.cache.size,
        }),
        headers: {
          Authorization: key,
          'Content-Type': 'application/json',
        },
      });
    }, 3600000);
  },
};
