const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
  name: 'npm',
  description: 'Search and Returns information about a npm package',
  aliases: ['npmjs'],
  emoji: '📦',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let query = args.join(' ');
    if (!query) query = await awaitMessages(message);
    if (!query) return;
    const res = await fetch(
      `https://registry.npmjs.com/${encodeURIComponent(query)}`
    ).catch((err) => console.log(err));
    if (res.status === 404)
      return message.channel.send({
        content:
          'No search results found, maybe try searching for something that exists.',
      });
    const body = await res.json();
    const embed = new MessageEmbed()
      .setColor(0xde2c2c)
      .setTitle(body.name)
      .setURL(`https://www.npmjs.com/package/${body.name}`)
      .setDescription(body.description || 'No description.')
      .addField('❯ Version', body['dist-tags'].latest, true)
      .addField('❯ License', body.license || 'None', true)
      .addField('❯ Author', body.author ? body.author.name : '???', true)
      .addField(
        '❯ Creation Date',
        moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'),
        true
      )
      .addField(
        '❯ Modification Date',
        body.time.modified
          ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss')
          : 'None',
        true
      )
      .addField(
        '❯ Repository',
        body.repository
          ? `[View Here](${body.repository.url.split('+')[1]})`
          : 'None',
        true
      )
      .addField(
        '❯ Maintainers',
        body.maintainers.map((user) => user.name).join(', ')
      );
    message.channel.send({ embeds: [embed] });

    async function awaitMessages(message) {
      let responce;

      const filter = (user) => {
        return user.author.id === message.author.id;
      };

      const serchembed = new MessageEmbed()
        .setTitle('<:npm:853250839808180234> Search at npmjs')
        .setDescription(
          'What npm Package Are You Looking For? Just Type Then I Will Search! You Have **30s** ⌛ \nType `cancel` to cancel the command.'
        )
        .setThumbnail(
          'https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png'
        )
        .setColor('GREEN');

      message.channel.send({ embeds: [serchembed] });

      await message.channel
        .awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        .then((msg) => {
          const firstMsg = msg.first();
          if (firstMsg.content.toLowerCase() === 'cancel')
            return firstMsg.react('👍');
          responce = firstMsg.content;
        })
        .catch(() => {
          message.channel.send({
            content: "You didn't Respond. Command Canceled.",
          });
        });

      return responce;
    }
  },
};
