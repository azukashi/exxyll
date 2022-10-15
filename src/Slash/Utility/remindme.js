const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'remind',
    description: 'Reminds you at specified time about what you want to do',
    options: [
        {
            type: 3,
            name: 'time',
            description: 'Set the time. Second (s), Minutes (m), Hours (h), Days (d)',
            required: true,
        },
        {
            type: 3,
            name: 'todo',
            description: 'Things that you want to do',
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
        const [time, todo] = args;
        if (todo.length > 200)
            return interaction.followUp({
                content: 'Maximum reminder length is 500 characters',
                ephemeral: true,
            });

        const setreminderembed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle('Reminder Set!')
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Successfully set <@${interaction.user.id}> a reminder!`)
            .addFields({ name: '⌛ Reminded in', value: `\`${time}\`` }, { name: '👥 Reminder', value: `${todo}` })
            .setTimestamp();

        interaction.followUp({ embeds: [setreminderembed] });

        // Pake arrow function () => {} biar keren :v
        setTimeout(async () => {
            interaction.followUp({
                content: `<@${interaction.user.id}> Reminder Timeout!`,
            });

            const alertembed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Reminder Alert!')
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey, <@${interaction.user.id}>! Your reminder is timeout!`)
                .addFields({ name: '⌛ Reminder ⌛', value: `\`${todo}\`` })
                .setTimestamp();

            interaction.followUp({ embeds: [alertembed] });
        }, ms(time));
    },
};
