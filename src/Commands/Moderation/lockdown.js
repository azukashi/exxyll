require('dotenv').config;
const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = {
    name: 'lockdown',
    description: 'Lockdown the server',
    aliases: ['lock-server'],
    emoji: '🔒',
    userperm: ['MANAGE_GUILD', 'SEND_MESSAGES'],
    botperm: ['MANAGE_GUILD', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const role = message.guild.roles.everyone;
        const hello = new MessageEmbed()
            .setTitle(`Lockdown Server`)
            .setDescription('Lockdown your server to avoid spamming, flooding, etc. for `@everyone` role')
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .addFields(
                {
                    name: 'Available options',
                    value: `\`true\` - Set lockdown for this server\n\`false\` - Unset/unlock lockdown`,
                },
                { name: 'Usage', value: `\`${prefix}lockdown true\` or \`${prefix}lockdown false\`` }
            )
            .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')
            .setTimestamp();
        if (!args.length) return message.channel.send({ embeds: [hello] });
        const query = args[0].toLowerCase();
        if (!['true', 'false'].includes(query))
            return message.reply({
                content: 'Option is not valid!',
            });
        const perms = role.permissions.toArray();

        if (query === 'false') {
            perms.push('SEND_MESSAGES');
            console.log(perms);
            await role.edit({ permissions: perms });
            message.channel.send({ content: 'Server is now unlocked.' });
        } else {
            const newPerms = perms.filter(perm => perm !== 'SEND_MESSAGES');
            console.log(newPerms);

            await role.edit({ permissions: newPerms });
            message.channel.send({
                content: 'Server is now locked down for `@everyone` role.',
            });
        }
    },
};
