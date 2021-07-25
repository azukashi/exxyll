const { Client, Message, MessageEmbed } = require("discord.js");
const request = require("superagent");

module.exports = {
  name: "pat",
  aliases: [],
  usage: "<@mentionedUser>",
  description: "Pat someone!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    let ment = message.mentions.users.first();
    let dev = [788260234409672754];
    if (!ment)
      return message.lineReplyNoMention("You Need To Mention Someone. Pog :O");
    if (ment.id == bot.user.id && message.author.id !== dev.join(" || "))
      return message.lineReplyNoMention("You Can't Pat Me >:(");
    if (ment.id == message.author.id)
      return message.lineReplyNoMention("How Is That Possible?");
    if (ment.id == bot.user.id && message.author.id == "788260234409672754")
      return message.lineReplyNoMention("B-BAKA");
    const { body } = await request.get("https://api.waifu.pics/sfw/pat");

    const e = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle(`${message.author.username} Pat ${ment.username} Pog :O`)
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setImage(body.url);
    message.lineReplyNoMention({ embed: e });
  },
};
