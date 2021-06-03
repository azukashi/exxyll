const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "waifu",
  aliases: [],
  usage: "",
  description: "Get Random Waifu Images",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const {
      data: { url },
    } = await axios.get(`https://nekos.life/api/v2/img/waifu`);
    const uri = url;
    const embed = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle("There is Your Waifu!")
      .setImage(uri)
      .setFooter(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
