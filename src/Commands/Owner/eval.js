require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: 'Evaluate given code',
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
        if (!code) return message.reply('Please provide some code to evaluate!');

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
                        .setDescription(`Result\n\`\`\`yml\n${output}\n\`\`\``)
                        .setFooter({ text: `Evaluated by : ${message.author.tag}` }),
                ],
            });
        } catch (err) {
            console.log(err);
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`❌ | Evaluated content too long to displayed`)
                        .setDescription(`Error Logs\n\`\`\`yml\n${error}\n\`\`\``)
                        .setColor('#FF0000')
                        .setFooter({ text: `Evaluated by : ${message.author.tag}` }),
                ],
            });
        }
    },
};
