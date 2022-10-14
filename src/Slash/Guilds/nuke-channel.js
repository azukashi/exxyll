const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nuke',
    description: 'Nuke current channel',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.channel.clone().then(ch => {
            ch.setParent(interaction.channel.parent.id);
            ch.setPosition(interaction.channel.position);
            interaction.channel.delete();

            const embed = new MessageEmbed()
                .setTitle('This channel has been nuked!')
                .setColor('RED')
                .setFooter({ text: `Action performed by ${interaction.user.tag}` });

            ch.send({ embeds: [embed] }).then(m => m.delete({ timeout: 7000 }));
        });
    },
};
