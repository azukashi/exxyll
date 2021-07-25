const { Client, Message, MessageEmbed } = require("discord.js");
const request = require("superagent");

module.exports = {
  name: "hug",
  aliases: [],
  usage: "@mentionedUser",
  description: "Hug someone!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    let ment = message.mentions.users.first();
    if (!ment) return message.lineReplyNoMention("Please mention a user!");
    if (ment.id == message.author.id)
      return message.lineReplyNoMention("How Is That Possible?");
    if (ment.id == bot.user.id && message.author.id == "788260234409672754")
      return message.channel.send("B-BAKA!");
    const { body } = await request.get("https://api.waifu.pics/sfw/hug");

    let e = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle(`${message.author.username} Hugged ${ment.username}`)
      .setImage(body.url)
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.lineReplyNoMention({ embed: e });
  },
};
