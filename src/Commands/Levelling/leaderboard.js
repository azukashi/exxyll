const Levels = require('discord-xp');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'See Levelling Leaderboards',
    aliases: ['lb', 'levels'],
    emoji: '📊',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if (rawLeaderboard.length < 1)
            return message.reply({
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

        message.channel.send({ embeds: [embed] });
    },
};
