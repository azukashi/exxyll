const { CommandInteraction, Client, WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'Report a bugs or something to the developers!',
    options: [
        {
            type: 3,
            name: 'details',
            description: 'Details of the bugs or something',
            required: true,
        },
    ],
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [details] = args;
        const owner = client.users.cache.get('788260234409672754');
        const embedBugnya = new MessageEmbed()
            .setTitle(`New Bugs Reported!`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addField(`Bug Details`, details)
            .addField(
                `Reported by`,
                `${interaction.user.tag} from **${interaction.guild.name}** (${interaction.user.id})`
            )
            .setColor('#FF0000')
            .setTimestamp();

        owner.send({ embeds: [embedBugnya] });

        const makasihOm = new MessageEmbed()
            .setTitle('Thanks for reporting this incident!')
            .setDescription(
                `<@${interaction.user.id}>, Sorry for the inconvenience, and thanks for reporting the issues!\nYour report now is reviewed by our staff.`
            )
            .setColor('#FF0000')
            .setTimestamp();

        interaction.followUp({ embeds: [makasihOm] });
    },
};
