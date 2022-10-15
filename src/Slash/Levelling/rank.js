const { CommandInteraction, Client, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    description: 'See your current ranking at the levelling system',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let member = interaction.user;

        const target = await Levels.fetch(member.id, interaction.guild.id);
        if (!target)
            return interaction.followUp({
                content: `${member.tag} doesn't have any xp so far. Start chatting to gain xp.`,
            });

        const reqXP = Levels.xpFor(parseInt(target.level) + 1);

        const rank = new canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setCurrentXP(target.xp)
            .setRequiredXP(reqXP)
            .setLevel(target.level)
            .setRank(1, 'RANK', false)
            .setBackground('IMAGE', 'https://images-na.ssl-images-amazon.com/images/I/61qBaKk%2B88L._SL1000_.jpg')
            // .setStatus(member.presence.status)
            .setProgressBar('#ffc0cb', 'COLOR')
            .setUsername(member.username)
            .setDiscriminator(member.discriminator);
        rank.build().then(data => {
            const attachment = new MessageAttachment(data, 'rank.png');
            interaction.followUp({ files: [attachment] });
        });
    },
};
