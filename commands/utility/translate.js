const { Client, Message, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
  name: 'translate',
  description: 'Translate a text',
  aliases: ['tl'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(' ');
    const translateTo = args.slice(1).join(' ');
    if (!query)
      return message.reply({ content: 'Please specify a text to translate!' });

    try {
      const translated = await translate(query, { to: translateTo });

      const embed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: false })
        )
        .addField('Query', query, true)
        .addField('Result', translated.text, true)
        .addField('Translated to', translateTo, true)
        .setColor('BLUE')
        .setFooter(message.author.tag)
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      message.reply({
        content: `Uh oh! Something unexcepted. Maybe you want to check the usage? is that right?`,
      });
    }
  },
};
