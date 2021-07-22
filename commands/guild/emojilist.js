const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojis",
  category: "guild",
  description: "Displays every emoji of the guild, Where the command is used",
  aliases: ["emojilist", "emoji"],
  usage: "",
  timeout: 5,
  run: async (bot, message, args) => {
    try {
      let Emojis = "";
      let EmojisAnimated = "";
      let EmojiCount = 0;
      let Animated = 0;
      let OverallEmojis = 0;
      function Emoji(id) {
        return bot.emojis.cache.get(id).toString();
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
      message.lineReplyNoMention(emn);
    } catch (err) {
      return message.lineReplyNoMention(
        "Oops! Looks like something went wrong, Please try again Later."
      );
    }
  },
};
