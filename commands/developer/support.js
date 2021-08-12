const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "support",
  description: "Support & Donate to the Developers!",
  emoji: "<:supporter:863214921320103987>",
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Support the Developers!")
      .setDescription(
        "Support or Donate to the Developers and Get Premium Perks!\n\n[Buy me a Coffee](https://ko-fi.com/gifaldyazkaa)"
      )
      .setFooter(message.author.tag)
      .setColor("BLUE")
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
