const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user from server by their User ID',
    aliases: ['unbonk'],
    emoji: '🔧',
    userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const id = args.join(' ');
        if (!id) return message.reply({ content: 'Please send a User ID to unban!' });

        const bannedMembers = await message.guild.bans.fetch();
        if (!bannedMembers.find(user => user.user.id === id)) return message.reply({ content: 'User is not banned!' });

        message.guild.members.unban(id);
        message.reply({ content: 'Successfully unlisted user from banned members.' });
    },
};
