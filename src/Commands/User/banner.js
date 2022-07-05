const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'banner',
    description: 'Get and see user banner',
    aliases: [],
    emoji: '🖼️',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.author || message.mentions.members.first() || client.users.cache.get(args.join(' '));
        fetch(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        })
            .then(res => res.json())
            .then(body => {
                if (body.banner) {
                    const extension = body.banner.startsWith('a_') ? '.gif' : '.png';
                    const url = `https://cdn.discordapp.com/banners/${user.id}/${body.banner}${extension}?size=1024`;

                    const embed = new MessageEmbed()
                        .setTitle(`${user.username}'s Banner Image`)
                        .setImage(url)
                        .setColor('BLUE');

                    message.channel.send({ embeds: [embed] });
                } else {
                    if (body.accent_color) {
                        const embed = new MessageEmbed()
                            .setDescription(`${user.username} doesn't have a banner. But they do have a accent color!`)
                            .setColor(body.accent_color);

                        message.channel.send({ embeds: [embed] });
                    } else
                        return message.channel.send({
                            content: `${user.username} is not have a banner and accent color!`,
                        });
                }
            });
    },
};
