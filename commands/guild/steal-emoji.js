const { Client, Message, MessageEmbed, Util } = require("discord.js");

module.exports = {
  name: "steal-emoji",
  aliases: ["steal-emoji"],
  usage: "emoji",
  description: "Steal emojis from other server",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args.length)
      return message.channel.send(`Please provide some emojis!`);
    if (!message.member.hasPermission("MANAGE_EMOJIS"))
      return message.channel.send(
        "You Don't Have Permission to use this Command!"
      );

    for (const rawEmoji of args) {
      const parsedEmoji = Util.parseEmoji(rawEmoji);

      if (parsedEmoji.id) {
        const extension = parsedEmoji.animated ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/emojis/${
          parsedEmoji.id + extension
        }`;
        message.guild.emojis.create(url, parsedEmoji.name).then((emoji) =>
          message.channel.send(
            new MessageEmbed()
              .setTitle("Added Emojis!")
              .setDescription(
                `Added ${parsedEmoji} to This Server!\nUrl : ${emoji.url}`
              )
              .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              .setColor("GREEN")
          )
        );
      }
    }
  },
};
