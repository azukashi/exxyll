const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const client = require('../index');
const prefixSchema = require('../models/prefix');
const logChannel = client.channels.cache.get('891970597876285451');

client.on('guildDelete', async (guild) => {
  prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      prefixSchema
        .findOneAndDelete({ Guild: guild.id })
        .then(console.log(`Deleted ${guild.name} data.`));
      const embed = new MessageEmbed()
        .setTitle('Kicked from 1 Guild')
        .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
        .addField(`Guild Name`, `${guild.name}`)
        .addField(`Guild Owner`, `${(await guild.fetchOwner()).user}`)
        .addField(`Guild Members`, `${guild.members.cache.size}`)
        .addField(`Created at`, `${moment(guild.createdAt).format('LLL')}`)
        .setColor(`#FF0000`)
        .setFooter(`Log Message`)
        .setTimestamp();

      logChannel.send({ embeds: [embed] });
    }
  });
});
