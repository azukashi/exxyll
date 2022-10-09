const Levels = require('discord-xp');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
    name: 'rank',
    description: 'See your current level',
    emoji: '📈',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

        const target = await Levels.fetch(member.id, message.guild.id);
        if (!target)
            return message.channel.send({
                content: `${member.user.tag} doesn't have any xp so far. Start chatting to gain xp.`,
            });

        const reqXP = Levels.xpFor(parseInt(target.level) + 1);

        const rank = new canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setCurrentXP(target.xp)
            .setRequiredXP(reqXP)
            .setLevel(target.level)
            .setRank(1, 'RANK', false)
            .setBackground('IMAGE', 'https://images-na.ssl-images-amazon.com/images/I/61qBaKk%2B88L._SL1000_.jpg')
            // .setStatus(Member.presence.status)
            .setProgressBar('#ffc0cb', 'COLOR')
            .setUsername(member.username)
            .setDiscriminator(member.discriminator);
        rank.build().then(data => {
            const attachment = new MessageAttachment(data, 'rank.png');
            message.reply({ files: [attachment] });
        });
    },
};
