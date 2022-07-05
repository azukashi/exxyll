const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    description: 'See Leaderboard Rank',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);

        if (rawLeaderboard.length < 1)
            return interaction.followUp({
                content: "This server doesn't have a leaderboard.",
            });

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(
            e =>
                `**${e.position}**. ${e.username}#${e.discriminator}\n**Level**: ${
                    e.level
                }\n**XP**: ${e.xp.toLocaleString()}`
        );

        const embed = new MessageEmbed()
            .setTitle('**Leaderboard**')
            .setColor('#ffc0cb')
            .setDescription(`\n\n${lb.join('\n\n')}`);

        interaction.followUp({ embeds: [embed] });
    },
};
