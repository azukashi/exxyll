require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    description: 'Restart the client',
    aliases: ['reboot'],
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
        await message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle('✅ Successfully rebooted!')
                    .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
                    .setDescription(
                        `The client is scucessfully crashed with exit code 1.\n\nLoaded commands : ${client.commands.size}\n\nJust wait the process restarted automatically. Or, if i am going offline, you can restart manually by visit hosting dashboard!`,
                    )
                    .setColor('GREEN')
                    .setFooter({ text: `Restarted by ${message.author.username}` })
                    .setTimestamp(),
            ],
        });

        const masterLogger = client.channels.cache.get('855151075287498792');
        if (masterLogger) {
            await masterLogger.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('Client Restarted')
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setDescription(`**Actioned by** : ${message.author.tag}`)
                        .setColor('GREEN')
                        .setTimestamp(),
                ],
            });
        }

        return process.exit();
    },
};
