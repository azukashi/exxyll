const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fishing-together',
    description: 'Play Fishing Together Game in a Voice Channel',
    aliases: [],
    emoji: '🎣',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES', 'CONNECT'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const voicechannel = message.member.voice.channelId;
        const notInVc = new MessageEmbed()
            .setDescription(':x: | You need to be in a voice channel to run this command!')
            .setColor('RED');
        if (!voicechannel) return message.channel.send({ embeds: [notInVc] });
        client.discordTogether.createTogetherCode(voicechannel, 'fishing').then(async invite => {
            return message.reply({
                content: `Hey here is your link! Click on the link to start! ${invite.code}`,
            });
        });
    },
};
