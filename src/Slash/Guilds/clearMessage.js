const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clear and delete messages',
    options: [
        {
            type: 4,
            name: 'amount',
            description: "How many messages you'd like to clear? (2 ~ 100)",
            required: true,
        },
    ],
    userPermissions: ['MANAGE_MESSAGES'],
    userperm: ['MANAGE_MESSAGES'],
    botperm: ['MANAGE_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let [amount] = args;
        amount = Number(amount, 10) || parseInt(amount);
        if (amount <= 2 || amount > 100)
            return interaction.followUp({
                content: 'Please enter a number of message between 2 and 100',
                ephemeral: true,
            });
        try {
            await interaction.deleteReply();
            await interaction.channel.bulkDelete(amount).then(async m => {
                let embed = new MessageEmbed()
                    .setColor('0x#00ffff')
                    .setDescription(`:white_check_mark: cleared **${m.size}**/**${amount}** messages!`);

                interaction.followUp({ embeds: [embed] }).then(msg => {
                    msg.delete({ setTimeout: 4000 });
                });
            });
        } catch (e) {
            console.log(e);
            interaction.followUp({
                content: `You can only delete the messages which are not older than 14 days.`,
                ephemeral: true,
            });
        }
    },
};
