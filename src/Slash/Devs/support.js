const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Support & Donate to the Chef at the back-screen of Exxyll!',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle('Support the developer!')
            .setDescription(
                'Support or donate the developer to help keeping this project alive!\n\n[Buy me a Coffee](https://ko-fi.com/gifaldyazkaa)'
            )
            .setFooter({ text: interaction.user.tag })
            .setColor('BLUE')
            .setTimestamp();

        interaction.followUp({ embeds: [embed] });
    },
};
