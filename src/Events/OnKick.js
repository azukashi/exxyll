const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const client = require('../../index');
const prefixSchema = require('../Models/Prefix');
const logChannel = client.channels.cache.get('891970597876285451');

client.on('guildDelete', async guild => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log(`Deleted ${guild.name} data.`));
            const embed = new MessageEmbed()
                .setTitle('Kicked from 1 Guild')
                .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
                .addFields([
                    { name: 'Guild name', value: guild.name },
                    { name: 'Guild owner', value: (await guild.fetchOwner()).user },
                    { name: 'Guild members', value: guild.members.cache.size },
                    { name: 'Creation date', value: moment(guild.createdAt).format('LLL') },
                ])
                .setColor(`#FF0000`)
                .setFooter({ text: 'Log Message' })
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    });
});
