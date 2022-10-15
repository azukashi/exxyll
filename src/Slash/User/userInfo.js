const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'Returns user information',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'User to show their information. (optional)',
            required: false,
        },
    ],
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [user] = args;
        if (!user) user = interaction.user.id;
        const fixedUser = client.users.cache.get(user);
        const member = interaction.guild.members.cache.get(fixedUser.id) || interaction.member;
        // Getdays func
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        }
        // Fetch & get user banner
        fetch(`https://discord.com/api/users/${fixedUser.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        })
            .then(res => res.json())
            .then(body => {
                if (body.banner) {
                    const extension = body.banner.startsWith('a_') ? '.gif' : '.png';
                    const bannerUrl =
                        `https://cdn.discordapp.com/banners/${fixedUser.id}/${body.banner}${extension}?size=1024` ||
                        "User doesn't have a banner!";
                    let embed = new MessageEmbed()
                        .setTitle(`${fixedUser.username}'s User Information`)
                        .setThumbnail(fixedUser.displayAvatarURL({ dynamic: true, size: 512 }))
                        .setColor('BLUE')
                        .addFields(
                            { name: 'User tag', value: fixedUser.tag },
                            { name: 'User ID', value: fixedUser.id },
                            {
                                name: 'Creation date',
                                value: `${moment(fixedUser.createdAt).format('LLLL')} (${checkDays(
                                    fixedUser.createdAt
                                )})`,
                            },
                            {
                                name: 'Date joined',
                                value: `${moment(member.joinedAt).format('LLLL')} (${checkDays(member.joinedAt)})`,
                            },
                            { name: 'Highest role', value: `<@&${member.roles.highest.id}>` },
                            { name: 'Roles', value: member.roles.cache.map(r => `${r}`).join(' | ') }
                        )
                        .setImage(bannerUrl)
                        .setFooter({ text: interaction.user.tag })
                        .setTimestamp();
                    interaction.followUp({ embeds: [embed] });
                } else {
                    if (body.accent_color) {
                        const bannerColor = body.accent_color;
                        let embed = new MessageEmbed()
                            .setTitle(`${fixedUser.username}'s User Information`)
                            .setThumbnail(fixedUser.displayAvatarURL({ dynamic: true, size: 512 }))
                            .setColor(bannerColor)
                            .addFields(
                                { name: 'User tag', value: fixedUser.tag },
                                { name: 'User ID', value: fixedUser.id },
                                {
                                    name: 'Creation date',
                                    value: `${moment(fixedUser.createdAt).format('LLLL')} (${checkDays(
                                        fixedUser.createdAt
                                    )})`,
                                },
                                {
                                    name: 'Date joined',
                                    value: `${moment(member.joinedAt).format('LLLL')} (${checkDays(member.joinedAt)})`,
                                },
                                { name: 'Highest role', value: `<@&${member.roles.highest.id}>` },
                                { name: 'Roles', value: member.roles.cache.map(r => `${r}`).join(' | ') }
                            )
                            .setFooter({ text: interaction.user.tag })
                            .setTimestamp();
                        interaction.followUp({ embeds: [embed] });
                    } else {
                        let embed = new MessageEmbed()
                            .setTitle(`${fixedUser.username}'s User Information`)
                            .setThumbnail(fixedUser.displayAvatarURL({ dynamic: true, size: 512 }))
                            .setColor('BLUE')
                            .addFields(
                                { name: 'User tag', value: fixedUser.tag },
                                { name: 'User ID', value: fixedUser.id },
                                {
                                    name: 'Creation date',
                                    value: `${moment(fixedUser.createdAt).format('LLLL')} (${checkDays(
                                        fixedUser.createdAt
                                    )})`,
                                },
                                {
                                    name: 'Date joined',
                                    value: `${moment(member.joinedAt).format('LLLL')} (${checkDays(member.joinedAt)})`,
                                },
                                { name: 'Highest role', value: `<@&${member.roles.highest.id}>` },
                                { name: 'Roles', value: member.roles.cache.map(r => `${r}`).join(' | ') }
                            )
                            .setFooter({ text: interaction.user.tag })
                            .setTimestamp();
                        interaction.followUp({ embeds: [embed] });
                    }
                }
            });
    },
};
