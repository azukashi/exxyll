const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nuke a Channel',
    aliases: ['nuclear'],
    emoji: '💣',
    userperm: ['MANAGE_CHANNELS'],
    botperm: ['MANAGE_CHANNELS'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.channel.clone().then(ch => {
            ch.setParent(message.channel.parentId);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('This channel has been nuked!')
                        .setColor('RED')
                        .setFooter({ text: `Action performed by ${message.author.tag}` }),
                ],
            }).then(m => m.delete({ timeout: 7000 }));
        });
    },
};
