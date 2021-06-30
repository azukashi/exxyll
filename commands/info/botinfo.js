const { Client, Message, MessageEmbed } = require("discord.js");
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
        `[Invite Me](https://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=3222646&scope=bot) | [Visit Website](https://exxyll.github.io)`
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(`Name`, `Exxyll`)
      .addField(`Description`, `Exxyll is A Multipurpose Discord Bot!`)
      .addField(`Developer`, `Gifaldy Azka || \`Falcxxdev#0001\``)
      .addField(
        `Developed Since`,
        `${moment(client.user.createdTimestamp).format("llll")} (${
          client.user.createdTimestamp
        })`
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

    message.lineReplyNoMention(embed);
  },
};
