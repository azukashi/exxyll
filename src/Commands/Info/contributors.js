const { Client, Message, MessageEmbed } = require('discord.js');
const https = require('https');

module.exports = {
	name: 'contributors',
	description:
		'Lists of all [exxyll-origin](https://github.com/gifaldyazkaa/exxyll-origin) contributors',
	emoji: '<:members:863214932883800138>',
	userperm: ['SEND_MESSAGES'],
	botperm: ['SEND_MESSAGES'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		try {
			const list = new Promise((resolve, reject) => {
				https
					.get(
						{
							hostname: 'api.github.com',
							path: '/repos/gifaldyazkaa/exxyll-origin/contributors',
							headers: {
								'User-Agent': 'gifaldyazkaa',
								Accept: 'application/vnd.github.v3+json',
								'Cache-Control': 'no-store',
							},
						},
						(response) => {
							response.setEncoding('utf8');
							let body = '';

							response.on('data', (data) => (body += data));

							response.on('end', () => {
								try {
									resolve(JSON.parse(body));
								} catch (error) {
									reject(error);
								}
							});

							response.on('error', (error) => reject(error));
						}
					)
					.on('error', (error) => reject(error));
			});

			list.then((contributors) => {
				let listContri =
					'**A List of People Contributing to __exxyll-origin__ Repository**\n\n';

				contributors
					.filter(
						(contributor) =>
							!contributor.login.includes('[bot]') ||
							contributor.type === 'User'
					)
					.map(
						(contributor) =>
							(listContri += ` **${contributor.login}** with \`${contributor.contributions}\` Contributions.\n`)
					);

				message.channel.send({ content: listContri });
			});
		} catch (err) {
			return message.channel.send({ content: err });
		}
	},
};
