const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "neko",
  aliases: [],
  usage: "",
  description: "Get Random Neko Images",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const {
      data: { url },
    } = await axios.get(`https://nekos.life/api/v2/img/neko`);
    const uri = url;
    const embed = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle("There is a Neko Images!")
      .setImage(uri)
      .setFooter(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
