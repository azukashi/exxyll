const { Client, Message, MessageEmbed } = require("discord.js");
const request = require("superagent");
const { owner } = require("../../config.json");

module.exports = {
  name: "kiss",
  aliases: [],
  usage: "@mentionedUser",
  description: "Kiss someone you loved by this command!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    let ment = message.mentions.users.first();
    let dev = ["788260234409672754"];
    if (!ment)
      return message.lineReplyNoMention(
        "You Need To Mention Someone you love. Pog :O"
      );
    if (ment.id == bot.user.id && message.author.id !== dev.join(" || "))
      return message.lineReplyNoMention("You Can't Kiss Me >:(");
    if (ment.id == message.author.id)
      return message.lineReplyNoMention(
        "How Is That Possible? Not have someone to love?"
      );
    if (ment.id == bot.user.id && message.author.id == "788260234409672754")
      return message.lineReplyNoMention(
        "B-BAKA, Its not i like you or something"
      );
    const { body } = await request.get("https://api.waifu.pics/sfw/kiss");

    const e = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle(`${message.author.username} Kissed ${ment.username} Pog :O`)
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setImage(body.url);
    message.lineReplyNoMention({ embed: e });
  },
};
