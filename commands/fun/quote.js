const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "quote",
  aliases: [],
  usage: "@user text",
  description: "Quote a text",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!user)
      return message.channel.send(
        "You need to mention a user and provide text!"
      );

    let msg = args.join(" ").slice(22);

    const e = user.displayAvatarURL({ format: "png" });

    const img = await canvacord.Canvas.quote({
      username: `${user.username}`,
      color: "#7289da",
      message: `${msg}`,
      image: e,
    });
    let attachment = new Discord.MessageAttachment(img, "awik-awok.png");
    return message.channel.send(attachment);
  },
};
