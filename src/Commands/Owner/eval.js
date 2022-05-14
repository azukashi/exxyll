require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
  name: 'eval',
  description: 'Evaluate some code',
  aliases: ['evaluate'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.author.id === process.env.OWNERID) return;
    const code = args.join(' ');
    if (!code) return message.reply('Please provide some code to evaluated!');

    try {
      const result = await eval(code);
      let output = result;

      if (typeof result !== 'string') {
        output = inspect(result);
      }

      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`✔️ | 200 : Success`)
            .setDescription(`Results\n\`\`\`yml\n${output}\n\`\`\``)
            .setFooter(`Actioned by : ${message.author.tag}`),
        ],
      });
    } catch (error) {
      console.log(error);
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`❌ | Evaluated Content too long to displayed`)
            .setDescription(`Error Logs\n\`\`\`yml\n${error}\n\`\`\``)
            .setColor('#FF0000')
            .setFooter(`Actioned by : ${message.author.tag}`),
        ],
      });
    }
  },
};
