const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reply",
  aliases: [],
  usage: "",
  description: "",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // Inline Reply With No Mention
    message.lineReplyNoMention("Yea, Inline Replies Without Mention Works.");

    // Inline Reply With Mention
    message.lineReply("Yea again, Inline Replies With Mention Works.");

    // How if We Send Embed + Inline Replies?
    const embed = new MessageEmbed()
      .setTitle("Embed Title")
      .setDescription("Description of a Embed")
      .setTimestamp()
      .setColor("BLUE");

    message.lineReply(embed);
  },
};
