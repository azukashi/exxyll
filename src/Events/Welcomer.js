const Schema = require('../Models/WelcomeChannel');
const { MessageEmbed } = require('discord.js');
const client = require('../../index');

client.on('guildMemberAdd', async member => {
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
        if (!data) return;

        const channel = member.guild.channels.cache.get(data.Channel);
        // const guildAvatar = client.guilds.cache
        //   .get(member.guild.id)
        //   .iconURL({ dynamic: true });
        const userAvatar = member.user.displayAvatarURL({
            dynamic: true,
            size: 1024,
        });

        try {
            channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle('New member!')
                        .setThumbnail(userAvatar)
                        .setDescription(`Hello <@${member.user.id}>, welcome to **${member.guild.name}**!`)
                        .setFooter({ text: `${member.guild.memberCount} members` })
                        .setColor('BLUE')
                        .setTimestamp(),
                ],
            });
        } catch (err) {
            console.log(err);
        }
    });
});
