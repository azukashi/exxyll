const { MessageEmbed } = require('discord.js');
const client = require('../../index');
const qotdChannel = '1341024533728989285';
client.on('messageCreate', message => {
    if (qotdChannel.includes(message.channel.id)) {
        const generalChannel = client.channels.cache.get('1335333906165137510');
        const embed = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true, size: 128 }),
            })
            .setTitle('New QOTD!')
            .setDescription(
                `Cek <#${qotdChannel}> sekarang dan jawab pendapat kalian disini yaa! **Untuk menjawab, silahkan reply ke pesan ini dan pastikan mention menyala @ON**.\n> QOTD ini ditanyakan oleh <@${message.author.id}>.`
            )
            .setColor(`#DC50B3`)
            .setTimestamp();

        generalChannel.send({
            content: `<@&1341021920715341885> Ada QOTD baru nih. Yuk cek <#${qotdChannel}> sekarang!`,
            embeds: [embed],
        });
    }
});
