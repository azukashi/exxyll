const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const https = require('https');

module.exports = {
    name: 'contributors',
    description: 'Lists of all exxyll-origin contributors',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const list = new Promise((resolve, reject) => {
                https
                    .get(
                        {
                            hostname: 'api.github.com',
                            path: '/repos/gifaldyazkaa/exxyll/contributors',
                            headers: {
                                'User-Agent': 'gifaldyazkaa',
                                Accept: 'application/vnd.github.v3+json',
                                'Cache-Control': 'no-store',
                            },
                        },
                        response => {
                            response.setEncoding('utf8');
                            let body = '';

                            response.on('data', data => (body += data));

                            response.on('end', () => {
                                try {
                                    resolve(JSON.parse(body));
                                } catch (error) {
                                    reject(error);
                                }
                            });

                            response.on('error', error => reject(error));
                        }
                    )
                    .on('error', error => reject(error));
            });

            list.then(contributors => {
                let contributorRes = '**Contributors on __exxyll__ repository**\n\n';

                contributors
                    .filter(contributor => !contributor.login.includes('[bot]') || contributor.type === 'User')
                    .map(
                        contributor =>
                            (contributorRes += ` **${contributor.login}** with \`${contributor.contributions}\` Contributions.\n`)
                    );

                interaction.followUp({ content: contributorRes });
            });
        } catch (err) {
            return interaction.followUp({ content: err, ephemeral: true });
        }
    },
};
