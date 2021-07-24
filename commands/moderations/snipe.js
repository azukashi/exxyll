const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "snipe",
  description: "Snipe deteled messages!",
  aliases: [],
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.lineReply(
        `You need \`MANAGE_MESSAGES\` Permission in order to run this command!`
      );
    const snipes = client.snipes.get(message.channel.id);
    if (!snipes)
      return message.lineReply(`There is no messages deleted in this channel!`);
    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];
    if (!target)
      return message.lineReply(`There is only ${snipes.length} messages!`);
    const { msg, time, image } = target;
    message.lineReplyNoMention(
      new MessageEmbed()
        .setAuthor(
          msg.author.tag,
          msg.author.displayAvatarURL({ dynamic: true })
        )
        .setImage(image)
        .setDescription(msg.content)
        .setFooter(
          `${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`
        )
        .setColor("BLUE")
    );
  },
};
