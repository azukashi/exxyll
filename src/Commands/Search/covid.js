const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'covid',
    description: 'Returns covid statistics at specified country',
    aliases: ['corona', 'covid19'],
    emoji: '😷',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let countries = args.join(' ');

        const noArgs = new MessageEmbed()
            .setTitle('Missing arguments')
            .setColor(0xff0000)
            .setDescription('You are missing some arguments! (ex: covid all || covid Canada)')
            .setTimestamp();

        if (!args[0]) return message.channel.send({ embeds: [noArgs] });

        if (args[0] === 'all') {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString();
                    let recovered = data.recovered.value.toLocaleString();
                    let deaths = data.deaths.value.toLocaleString();

                    const embed = new MessageEmbed()
                        .setTitle(`Worldwide COVID-19 Stats 🌎`)
                        .addFields(
                            { name: 'Confirmed cases', value: confirmed },
                            { name: 'Recovered', value: recovered },
                            { name: 'Deaths', value: deaths }
                        )
                        .setThumbnail(
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/478px-SARS-CoV-2_without_background.png'
                        )
                        .setColor('RED');

                    message.channel.send({ embeds: [embed] });
                });
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString();
                    let recovered = data.recovered.value.toLocaleString();
                    let deaths = data.deaths.value.toLocaleString();

                    const embed = new MessageEmbed()
                        .setTitle(`COVID-19 Stats for **${countries}**`)
                        .setThumbnail(
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/478px-SARS-CoV-2_without_background.png'
                        )
                        .setColor('RED')
                        .addFields(
                            { name: 'Confirmed cases', value: confirmed },
                            { name: 'Recovered', value: recovered },
                            { name: 'Deaths', value: deaths }
                        );

                    message.channel.send({ embeds: [embed] });
                })
                .catch(e => {
                    return message.channel.send({ content: 'Invalid country provided' });
                });
        }
    },
};
