const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: 'Returns Server Information',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const vanityCode = interaction.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const members = interaction.guild.members.cache;
        const roles = interaction.guild.roles.cache
            .filter(r => r.id !== interaction.guild.id)
            .map(role => role.toString());
        // prettier-ignore
        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(interaction.guild.name)
            .setColor('RANDOM')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                { name: 'General information', value: `:identification_card: Name: ${interaction.guild.name}\n🆔 ID: ${interaction.guild.id}\n👑 Owner: ${(await interaction.guild.fetchOwner()).user}` },
                { name: 'Counts', value: `:busts_in_silhouette: Members: ${interaction.guild.memberCount.toString()}\n:roll_of_paper: Roles: ${roles.length}\n💬 Channels : ${interaction.guild.channels.cache.filter(ch => ch.type === 'text' || ch.type === 'voice').size} total (Text: ${interaction.guild.channels.cache.filter(ch => ch.type === 'text').size}, Voice: ${interaction.guild.channels.cache.filter(ch => ch.type === 'voice').size})\n:smiley: Emojis: ${interaction.guild.emojis.cache.size} (Regular: ${interaction.guild.emojis.cache.filter(e => !e.animated).size}, Animated: ${interaction.guild.emojis.cache.filter(e => e.animated).size})` },
                { name: 'Additional information', value: `📅 Created at: ${moment(interaction.guild.createdTimestamp).format('LLL')} | \`${moment(interaction.guild.createdTimestamp).fromNow()}\`\n🗺️ Region: ${interaction.guild.region}\n:rocket: Boost tier: ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : 'None'}\n🔐 Verification level: ${interaction.guild.verificationLevel.toString()}\n🔗 Vanity URL: ${vanityInvite}` },
                { name: `Roles [${roles.length}]`, value: roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length - 15} roles...\`` : 'None' }
            );
        interaction.followUp({ embeds: [embed] });
    },
};
