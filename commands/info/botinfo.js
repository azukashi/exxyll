const { Client, Message, MessageEmbed } = require("discord.js");

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
    const embed = new MessageEmbed()
      .setTitle("Bot Info")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(`Name`, `Exxyll`)
      .addField(`Description`, `Exxyll is A Multipurpose Discord Bot!`)
      .addField(`Developer`, `Gifaldy Azka || \`Falcxxdev#0001\``)
      .addField(`Developed Since`, `30 May 2021`)
      .addField(`Default Prefix`, `\`.\` (Dot)`)
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
