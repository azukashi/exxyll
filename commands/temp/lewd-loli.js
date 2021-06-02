const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "lewd",
  aliases: ["loli"],
  usage: "",
  description: "Get Random Lewd Loli Images",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const {
      data: { url },
    } = await axios.get(`https://nekos.life/api/v2/img/lewd`);
    const uri = url;
    const embed = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle("There is a Lewd Loli Images!")
      .setImage(uri)
      .setFooter(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
