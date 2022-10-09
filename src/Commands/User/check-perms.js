const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'checkperms',
    description: 'Check user permission at current guild & channels',
    aliases: ['userperms'],
    emoji: '✅',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, [member = '']) => {
        if (!member.match(/\d{17,19}/)) {
            member = message.author.id;
        }
        member = await message.guild.members.fetch(member.match(/\d{17,19}/)[0]).catch(() => null);
        if (!member) {
            return message.reply({ content: `\\❌ User not found.` });
        }
        const sp = member.permissions.serialize();
        const cp = message.channel.permissionsFor(member).serialize();
        const embed = new MessageEmbed()
            .setColor(member.displayColor || 'GREY')
            .setTitle(`${member.displayName}'s Permissions`)
            .setFooter({
                text: `Check permissions | Command request by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(
                [
                    '\\♨️ - This Server',
                    '\\#️⃣ - The Current Channel',
                    '```properties',
                    '♨️ | #️⃣ | Permission',
                    '========================================',
                    `${Object.keys(sp)
                        .map(perm =>
                            [
                                sp[perm] ? '✅ |' : '❌ |',
                                cp[perm] ? '✅ |' : '❌ |',
                                perm
                                    .split('_')
                                    .map(x => x[0] + x.slice(1).toLowerCase())
                                    .join(' '),
                            ].join(' ')
                        )
                        .join('\n')}`,
                    '```',
                ].join('\n')
            );
        return message.channel.send({ embeds: [embed] });
    },
};
