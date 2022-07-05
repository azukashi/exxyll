const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../Models/Prefix');

module.exports = {
    name: 'set-prefix',
    description: 'Set default prefix for this server',
    options: [
        {
            type: 3,
            name: 'new_prefix',
            description: 'Type new default prefix here',
            required: true,
        },
    ],
    userPermission: ['MANAGE_GUILD'],
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [new_prefix] = args;

        prefixSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) return console.log(err);
            if (data) {
                prefixSchema.findOneAndDelete({ Guild: interaction.guild.id });
                data = new prefixSchema({
                    Guild: interaction.guild.id,
                    Prefix: new_prefix,
                });
                data.save();
                interaction.followUp({
                    content: `Prefix has been updated to **${new_prefix}**`,
                });
            } else {
                data = new prefixSchema({
                    Guild: interaction.guild.id,
                    Prefix: new_prefix,
                });
                data.save();
                interaction.followUp({
                    content: `Custom prefix in this server is now set to **${new_prefix}**`,
                });
            }
        });
    },
};
