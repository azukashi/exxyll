const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");

module.exports = {
  name: "support",
  aliases: ["donate"],
  description: "Support and Donate to Developers!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Support the Developers!")
      .setDescription("You can support me with many ways!")
      .addField(`[Buy me a Coffee](https://ko-fi.com/gifaldyazkaa)`)
      .setFooter(message.author.tag)
      .setColor("BLUE")
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
