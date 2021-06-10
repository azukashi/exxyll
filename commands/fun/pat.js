const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "pat",
  aliases: [],
  usage: "",
  description: "Pat someone you loved, or pat your friends!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const {
      data: { url },
    } = await axios.get(`https://nekos.life/api/pat`);
    const uri = url;

    // const wibu!
    const ke_target = message.mentions.members.first();
    const user = message.author.tag;

    if (!ke_target) return message.reply("You must tag someone to pat.");

    const embed = new MessageEmbed()
      .setColor("#FFC0CB")
      .setTitle(`${user} Patting ${ke_target} Pog :O`)
      .setImage(uri)
      .setFooter(
        message.author.tag,
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.lineReplyNoMention(embed);
  },
};
