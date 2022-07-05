const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sussy',
    description: 'Generates a sussy baka emoji :flushed:',
    aliases: [],
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor(303136)
            .setDescription(
                ':black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:\n:black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square:\n:black_large_square::red_square::red_square::red_square::black_large_square::white_large_square::black_large_square::black_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::black_large_square::black_large_square:\n:black_large_square::red_square::blue_square::blue_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square:\n:black_large_square::red_square::red_square::red_square::black_large_square::black_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::white_large_square::black_large_square::black_large_square::black_large_square::white_large_square::black_large_square:\n:black_large_square::red_square::black_large_square::red_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square::white_large_square::white_large_square::white_large_square::black_large_square:\n:black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square:'
            );

        interaction.followUp({ embeds: [embed] });
    },
};
