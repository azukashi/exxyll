const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'kiss',
    description: 'Kiss specified user',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'User who you want to kiss',
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
        const [user] = args;
        const userUsername = client.users.cache.get(user).username;
        if (user == interaction.user.id) return interaction.followUp(`No, U can't kiss yourself.`);
        if (user == client.user.id) return interaction.followUp(`No, U can't kiss me.`);
        if (user == interaction.user.bot) return interaction.followUp(`No, U can't kiss bots.`);
        fetch('https://api.waifu.pics/sfw/kiss')
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(`${interaction.user.username} Kissed ${userUsername}`)
                    .setImage(body.url)
                    .setColor('#FFC0CB')
                    .setFooter({
                        text: `${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                    })
                    .setTimestamp();

                interaction.followUp({ embeds: [embed] });
            });
    },
};
