const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Support the Developer by donating them!',
    aliases: ['donate'],
    emoji: '💳',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embeds = new MessageEmbed()
            .setTitle('Support the Developer!')
            .setDescription(
                'Support or Donate the Developers to help keeping this project alive!\n\n[Buy me a Coffee](https://ko-fi.com/gifaldyazkaa)',
            )
            .setFooter({ text: message.author.tag })
            .setColor('BLUE')
            .setTimestamp();

        message.channel.send({ embeds: [embeds] });
    },
};
