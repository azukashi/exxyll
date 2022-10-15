const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear and Delete Messages',
    aliases: ['cls', 'purge'],
    emoji: '🧹',
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const amount = Number(args[0], 10) || parseInt(args[0]);
        if (isNaN(amount) || !Number.isInteger(amount))
            return message.reply({
                content: `Please enter a number of message to clear!`,
            });
        if (amount <= 2 || amount > 100)
            return message.reply({
                content: `Please enter a number of message between 2 and 100`,
            });
        try {
            await message.delete();
            await message.channel.bulkDelete(amount).then(async m => {
                let embed = new MessageEmbed()
                    .setColor('0x#00ffff')
                    .setDescription(`:white_check_mark:  Cleared **${m.size}**/**${amount}** messages!`);

                message.channel.send({ embeds: [embed] }).then(msg => msg.delete({ timeout: 4000 }));
            });
        } catch (e) {
            console.log(e);
            message.channel.send({
                content: `You can only delete the messages which are not older than 14 days.`,
            });
        }
    },
};
