const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'dscbotgg',
    aliases: ['discordbotgg', 'discordbotsgg'],
    usage: '<tag-bot || bot-id>',
    description: 'Returns Detailed Listed / Waitlisted Bot in https://discord.bots.gg',
    hidden: false,
    premium: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = args[0]
        if(!user) return message.lineReply('Please Tag a Bot / Specify the Bot ID!');
        fetch(`https://discord.bots.gg/api/v1/bots/${user}`)
            .then(res => res.json())
            .then(body => {
                const name = `${body.username}#${body.discriminator}`;
                const avatar = body.avatarURL;
                const clientid = body.clientId;
                const details = body.shortDescription;
                const prefix = body.prefix;
                const library = body.libraryName || "No Library Specified";
                const website = body.website || "No Website Specified";
                const owner = `${body.owner.username}#${body.owner.discriminator}`
                const e = new MessageEmbed()
                    .setTitle(name)
                    .setThumbnail(avatar)
                    .setDescription(details)
                    .addField('Client ID', clientid)
                    .addField('Prefix', prefix)
                    .addField('Library', library)
                    .addField('Owner', owner)
                    .addField('Website', website)
                    .setColor('ORANGE')
                message.lineReplyNoMention(e)
            })
            .catch(err => message.lineReplyNoMention(new MessageEmbed().setTitle(`:x: Not Listed`).setDescription(`${user} is not listed / removed at https://discord.bots.gg`).setColor('RED')))
    }
}