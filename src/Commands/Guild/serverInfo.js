const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Returns Information about Server',
    emoji: '🗂',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const vanityCode = message.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const members = message.guild.members.cache;
        const roles = message.guild.roles.cache.filter(r => r.id !== message.guild.id).map(role => role.toString());
        // prettier-ignore
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(message.guild.name)
            .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'General information', value: `:identification_card: Name: ${message.guild.name}\n🆔 ID: ${message.guild.id}\n👑 Owner: ${(await message.guild.fetchOwner()).user}` },
                { name: 'Counts', value: `:busts_in_silhouette: Members: ${message.guild.memberCount.toString()}\n:roll_of_paper: Roles: ${roles.length}\n💬 Channels : ${message.guild.channels.cache.filter(ch => ch.type === 'text' || ch.type === 'voice').size} total (Text: ${message.guild.channels.cache.filter(ch => ch.type === 'text').size}, Voice: ${message.guild.channels.cache.filter(ch => ch.type === 'voice').size})\n:smiley: Emojis: ${message.guild.emojis.cache.size} (Regular: ${message.guild.emojis.cache.filter(e => !e.animated).size}, Animated: ${message.guild.emojis.cache.filter(e => e.animated).size})` },
                { name: 'Additional information', value: `📅 Created at: ${moment(message.guild.createdTimestamp).format('LLL')} | \`${moment(message.guild.createdTimestamp).fromNow()}\`\n🗺️ Region: ${message.guild.region}\n:rocket: Boost tier: ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\n🔐 Verification level: ${message.guild.verificationLevel.toString()}\n🔗 Vanity URL: ${vanityInvite}` },
                { name: `Roles [${roles.length}]`, value: roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length - 15} roles...\`` : 'None' }
            );
        message.channel.send({ embeds: [embed] });
    },
};
