require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');
const child = require('child_process');

module.exports = {
    name: 'terminal',
    description: 'Execute a terminal command',
    aliases: ['sh', 'bash', 'zsh'],
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

        const command = args.join(' ');
        if (!command) return message.reply('Please specify a command to execute!');

        try {
            child.exec(command, (err, res) => {
                if (err) return message.channel.send(err);
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('Terminal - GNU Bash')
                            .setDescription(`\`\`\`js\n${res.slice(0, 2000)}\`\`\``)
                            .setFooter({ text: `GNU Bash - Actioned by ${message.author.tag}` })
                            .setColor('#800080'),
                    ],
                });
            });
        } catch (err) {
            message.channel.send({ content: `zsh: command not found ${command}` });
            console.log(err);
        }
    },
};
