const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Create a ticket',
    userperm: "SEND_MESSAGES",
    botperm: "SEND_MESSAGES",
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(interaction.guild.name, interaction.guild.iconURL({
                dynamic: true
            }))
            .setDescription(
                "__**How to make a ticket**__\n" +


                "> Click on the reaction that relates to your need\n" +

                "> Once the ticket is made you will be able to type in there"

            )
            .setTitle('Tickets')


        const bt = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('tic')
                .setLabel('🎫 Create Ticket!')
                .setStyle('PRIMARY'),
            );

        interaction.followUp({
            embeds: [embed],
            components: [bt]
        });
    }
}