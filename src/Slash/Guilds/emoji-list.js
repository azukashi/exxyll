const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emojilist',
    description: 'Displays every emoji of the guild, Where the command is used',
    aliases: [],
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            let Emojis = '';
            let EmojisAnimated = '';
            let EmojiCount = 0;
            let Animated = 0;
            let OverallEmojis = 0;
            function Emoji(id) {
                return client.emojis.cache.get(id).toString();
            }
            interaction.guild.emojis.cache.forEach(emoji => {
                OverallEmojis++;
                if (emoji.animated) {
                    Animated++;
                    EmojisAnimated += Emoji(emoji.id);
                } else {
                    EmojiCount++;
                    Emojis += Emoji(emoji.id);
                }
            });
            const emn = new MessageEmbed()
                .setTitle(`:smiley: Showing emojis of ${interaction.guild.name}`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true, format: 'png', size: 512 }))
                .setDescription(
                    `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
                )
                .setColor('BLUE')
                .setFooter({
                    text: `Emoji list | Command request by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                });
            interaction.followUp({ embeds: [emn] });
        } catch (err) {
            interaction.followUp('Oops! Looks like something went wrong, Please try again Later.');
            console.log(err);
        }
    },
};
