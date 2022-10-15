const { ContextMenuInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    type: 'USER',
    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const avatar = interaction.user.displayAvatarURL({
            dynamic: true,
            size: 1024,
        });
        const embed = new MessageEmbed()
            .setTitle(`${interaction.user.username}'s Avatar`)
            .setImage(avatar)
            .setColor('BLUE')
            .setTimestamp();

        interaction.followUp({ embeds: [embed] });
    },
};
