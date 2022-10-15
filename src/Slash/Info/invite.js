const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Invite me to your server',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setTitle('Invite me to your server!')
            .setDescription(
                `[Invite and authorize](https://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=1077226614&scope=bot) | [Website](https://exxyll.github.io) | [Join support server](https://discord.gg/j2MfuWySfD)\n\n[Vote at Top.gg](https://top.gg/bot/848232775798226996)`
            )
            .setFooter({
                text: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            });

        interaction.followUp({ embeds: [embed] });
    },
};
