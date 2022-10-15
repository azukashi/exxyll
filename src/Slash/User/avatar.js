const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Shows user avatar',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'Target user to show. (optional)',
            required: false,
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
        let [user] = args;
        if (!user) user = interaction.user.id;
        // Convert uid to advanced properties by using Client
        const fixUser = client.users.cache.get(user);
        const pngFormat = fixUser.displayAvatarURL({ format: 'png' });
        const jpgFormat = fixUser.displayAvatarURL({ format: 'jpg' });
        const webpFormat = fixUser.displayAvatarURL();
        const avatar = fixUser.displayAvatarURL({
            dynamic: true,
            size: 512,
        });
        const embed = new MessageEmbed()
            .setTitle(`${fixUser.username}'s avatar`)
            .setDescription(`[PNG](${pngFormat}) | [JPG](${jpgFormat}) | [WEBP](${webpFormat})`)
            .setImage(avatar)
            .setColor('BLUE');
        interaction.followUp({ embeds: [embed] });
    },
};
