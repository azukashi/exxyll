const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
module.exports = {
    name: "invite",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail('https://cdn.discordapp.com/avatars/848232775798226996/a1663c970cb38f341a53a0be608fbb56.png?size=128')
            .setTitle('Invite me to your server!')
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        const button1 = new MessageButton()
            .setStyle('url')
            .setLabel('Invite Me!')
            .setID('button1')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=848232775798226996&permissions=4294962679&scope=bot')

        const button2 = new MessageButton()
            .setStyle('red')
            .setLabel('Visit Website!')
            .setID('button2')
            .setDisabled()

        message.channel.send({
            buttons: [button1, button2],
            embed: embed
        });
    }
}