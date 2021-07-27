const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["myavatar"],
  usage: "<user>",
  description: "Show user avatar.",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((u) =>
        u.user.username
          .toLowerCase()
          .includes(
            args.join(" ") || u.user.tag.toLowerCase() === args.join(" ")
          )
      ) ||
      message.member;
    const pngFormat = user.user.displayAvatarURL({ format: "png" });
    const jpgFormat = user.user.displayAvatarURL({ format: "jpg" });
    const webpFormat = user.user.displayAvatarURL();
    const avatar = user.user.displayAvatarURL({ dynamic: true, size: 512 });
    message.channel.send(
      new MessageEmbed()
        .setTitle(`${user.user.username}'s avatar`)
        .setDescription(
          `[PNG](${pngFormat}) | [JPG](${jpgFormat}) | [WEBP](${webpFormat})`
        )
        .setImage(avatar)
        .setColor("BLUE")
    );
  },
};
