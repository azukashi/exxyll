const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton } = require('discord-buttons')
const moment = require("moment");

module.exports = {
  name: "botinfo",
  aliases: ["botinf"],
  usage: "",
  description: "Returns Information about the Bot",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    const embed = new MessageEmbed()
      .setTitle("Bot Info")
      .setDescription(
        `[Invite Me](https://discord.bots.gg/bots/848232775798226996) | [Visit Website](https://exxyll.github.io)`
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(`Name`, `Exxyll`)
      .addField(
        `Description`,
        `Exxyll is A Multipurpose Discord Bot with Commands for Fun, Utility, Moderation, Music, Welcoming messages, and many more!`
      )
      .addField(`Developer`, `Falcxxdev#0001`)
      .addField(`With Special Help from`, `\`BayuDC#0690\``)
      .addField(
        `Developed Since`,
        `${moment(client.user.createdTimestamp).format("llll")} (${checkDays(
          client.user.createdAt
        )})`
      )
      .addField(
        `Default Prefix`,
        `\`.\` (Customizable by doing \`.prefix <new-prefix>\`)`
      )
      .addField(
        `Serving on`,
        `${client.guilds.cache.size} Server, ${client.channels.cache.size} Channels, ${client.users.cache.size} Users`
      )
      .setColor("BLUE")
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );

      const invite = new MessageButton()
        .setLabel('Invite Me')
        .setStyle('url')
        .setURL('https://discord.bots.gg/bots/848232775798226996')
        .setEmoji('<:invite:863999093164736562>')

      const support = new MessageButton()
        .setLabel('Join Support Server')
        .setStyle('url')
        .setURL('https://discord.gg/j2MfuWySfD')
        .setEmoji('<:partnernew:863214932585873438>')

    message.lineReplyNoMention(embed);
  },
};
