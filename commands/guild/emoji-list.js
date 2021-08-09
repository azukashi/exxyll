const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojilist",
  description: "List all emojis",
  aliases: ["emojis"],
  emoji: "<:add_reaction:863214931599818783>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      let Emojis = "";
      let EmojisAnimated = "";
      let EmojiCount = 0;
      let Animated = 0;
      let OverallEmojis = 0;
      function Emoji(id) {
        return client.emojis.cache.get(id).toString();
      }
      message.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
          Animated++;
          EmojisAnimated += Emoji(emoji.id);
        } else {
          EmojiCount++;
          Emojis += Emoji(emoji.id);
        }
      });
      let emn = new MessageEmbed();
      emn.setTitle(
        `<:add_reaction:863214931599818783> Showing Emojis of ${message.guild.name}`
      );
      emn.setThumbnail(
        message.guild.iconURL({ dynamic: true, format: "png", size: 512 })
      );
      emn.setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`
      );
      emn
        .setColor("BLUE")
        .setFooter(
          `Emoji Lists | Command Request by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send({ embeds: [emn] });
    } catch (err) {
      message.channel.send(
        "Oops! Looks like something went wrong, Please try again Later."
      );
      console.log(err);
    }
  },
};
