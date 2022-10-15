const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'translate',
    description: 'Translate a text',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'Text to translated',
            required: true,
        },
        {
            type: 3,
            name: 'locale',
            description: 'Country code to be translated to (e.g : English = en, Indonesia = id)',
            required: true,
        },
    ],
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [text, locale] = args;
        try {
            const translated = await translate(text, { to: locale });

            const embed = new MessageEmbed()
                .setTitle('Translation result')
                .addFields(
                    { name: 'Query', value: text, inline: true },
                    { name: 'Result', value: translated.text, inline: true },
                    { name: 'Translated to', value: locale, inline: true }
                )
                .setColor('BLUE')
                .setFooter({ text: interaction.user.tag })
                .setTimestamp();
            interaction.followUp({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            interaction.followUp({
                content: `Uh oh! Something unexcepted. Maybe you want to check the usage? is that right?`,
                ephemeral: true,
            });
        }
    },
};
