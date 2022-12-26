const { EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    category: "Information",
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
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setTitle(message.guild.name)
            .setColor(client.embedColor)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'General information', value: `<:line2:972782869481144340> Name: ${message.guild.name}\n<:line2:972782869481144340> ID: ${message.guild.id}\n<:line:972780438118629386> Owner: ${(await message.guild.fetchOwner()).user}` },
                { name: 'Counts', value: `<:line2:972782869481144340> Members: ${message.guild.memberCount.toString()}\n<:line2:972782869481144340> Roles: ${roles.length}\n<:line:972780438118629386> Channels : ${message.guild.channels.cache.filter(ch => ch.type === 'text' || ch.type === 'voice').size} total (Text: ${message.guild.channels.cache.filter(ch => ch.type === 'text').size},<:line:972780438118629386> Voice: ${message.guild.channels.cache.filter(ch => ch.type === 'voice').size})\n Emojis: ${message.guild.emojis.cache.size} (Regular: ${message.guild.emojis.cache.filter(e => !e.animated).size}, Animated: ${message.guild.emojis.cache.filter(e => e.animated).size})` },
                { name: 'Additional information', value: `<:line2:972782869481144340> Created at: ${moment(message.guild.createdTimestamp).format('LLL')} | \`${moment(message.guild.createdTimestamp).fromNow()}\`\n<:line2:972782869481144340> Region: ${message.guild.region}\n:rocket: Boost tier: ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\n<:line2:972782869481144340> Verification level: ${message.guild.verificationLevel.toString()}\n<:line2:972782869481144340> Vanity URL: ${vanityInvite}` },
                { name: `<:line:972780438118629386> Roles [${roles.length}]`, value: roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length - 15} roles...\`` : 'None' }
            );
        message.channel.send({ embeds: [embed] });
    },
};
