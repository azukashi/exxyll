const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'youtube-together',
    description: 'Start YouTube Together Activity in a Voice Channel',
    aliases: ['ytt'],
    emoji: '👥',
    userperm: ['SEND_MESSAGES', 'CONNECT'],
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
        client.discordTogether.createTogetherCode(voicechannel, 'youtube').then(async invite => {
            return message.reply({
                content: `Hey, here is your link! Click on the link to start the activity! ${invite.code}`,
            });
        });
    },
};
