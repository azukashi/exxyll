const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
    name: 'suggest',
    description: 'Suggest a features or something to dev.',
    emoji: '❔',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const wc = new WebhookClient({
            id: '881846267293089792',
            token: 'CH1aU0g6QOrQ258yVAkTU2jK5DEvNjh9KIFNSyB0dnj5AOI7MVt3Q64E43eGMT5352r4',
        });
        const query = args.join(' ');
        const logChannel = client.channels.cache.get('891970597876285451');
        if (!query) return message.reply({ content: `Please specify a suggestion!` });
        const suggestEmbed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Suggestion', value: `${query}` },
                { name: 'Sent from', value: `${message.member.guild.name}` },
            )
            .setColor('BLUE')
            .setTimestamp();
        wc.send({
            username: message.author.tag,
            avatarURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }),
            embeds: [suggestEmbed],
        });

        const sankyuu = new MessageEmbed()
            .setTitle(`:white_check_mark: Thanks for your suggestion!`)
            .setDescription(
                `Hey <@${message.author.id}>, Thanks for your suggestion!\nYour suggestion has been sent to : [**Exxyll Development**](https://discord.gg/j2MfuWySfD) at <#849139267471933502>`,
            )
            .setColor('#00FF00')
            .setTimestamp();

        const log = new MessageEmbed()
            .setTitle(`New Suggestion`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setDescription(
                `New suggestion from [${message.author.tag}](https://discord.com/users/${message.author.id})!`,
            )
            .addFields(
                { name: 'User ID', value: `${message.author.id}` },
                { name: 'Sent from', value: `${message.member.guild.name}` },
            )
            .setColor('#00FF00')
            .setTimestamp();
        logChannel.send({ embeds: [log] });

        message.channel.send({ embeds: [sankyuu] });
    },
};
