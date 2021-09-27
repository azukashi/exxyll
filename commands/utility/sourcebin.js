const { Client, Message, MessageEmbed } = require('discord.js');
const { create } = require('sourcebin');

module.exports = {
  name: 'sourcebin',
  description: 'Upload a Javascript code to Sourcebin',
  aliases: ['srcbin', 'sourceb.in'],
  emoji: '',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const content = args.join(' ');
    if (!content)
      return message.reply({ content: 'Please give a code to uploaded!' });

    create(
      [
        {
          name: 'Random code',
          content,
          language: 'javascript',
        },
      ],
      {
        title: `Result Code`,
        description: `Code uploaded by Exxyll Discord Bot`,
      }
    ).then((value) => {
      message.channel.send({
        content: `Your code has been posted!\n${value.url}`,
      });
    });
  },
};
