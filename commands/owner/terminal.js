const { Client, Message, MessageEmbed } = require('discord.js');
const child = require('child_process');

module.exports = {
  name: 'terminal',
  description: 'Runs a Terminal Command',
  aliases: ['sh', 'bash', 'zsh'],
  emoji: '<:terminal:864415792320610324>',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== '788260234409672754') return;

    const command = args.join(' ');
    if (!command) return message.reply('Please specify a command to execute!');

    try {
      child.exec(command, (err, res) => {
        if (err) return message.channel.send(err);
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle('<:terminal:864415792320610324> Terminal - GNU Bash')
              .setDescription(`\`\`\`js\n${res.slice(0, 2000)}\`\`\``)
              .setFooter(`GNU Bash - Actioned by ${message.author.tag}`)
              .setColor('#800080'),
          ],
        });
      });
    } catch (err) {
      console.log(err);
      message.channel.send({ content: `zsh: command not found ${command}` });
    }
  },
};
