const { MessageEmbed } = require('discord.js');
const client = require('../../index');
const generalChannel = '1335333906165137510';
client.on('messageCreate', message => {
    if (generalChannel.includes(message.channel.id) && message.mentions.has(client.user)) {
        const answerChannel = client.channels.cache.get('1341033772228935681');
        const embed = new MessageEmbed()
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true, size: 128 }),
            })
            .setTitle('Jawaban QOTD baru!')
            .setDescription(
                `Kalo kata <@${message.author.id}> sih, katanya:\n> _"${message.content}"_.\n-${message.author.username}`
            )
            .setColor(`#DC50B3`)
            .setTimestamp();

        answerChannel.send({ embeds: [embed] });
    }
});
