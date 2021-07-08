const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");

module.exports = {
  name: "drake",
  aliases: [],
  usage: "<text_1>, <text_2>",
  description: "Drake Meme Maker",
  permissions: ["SEND_MESSAGES"],
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const split = args.join(" ").split(",");
    const user = split[0];
    const user2 = split[1];
    if(!user || !user2) return message.lineReply(`You need to specify two sentences separatted with comma `,``)
    const res = await fetch(
      `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`,
      {}
    );
    let Image = await res.buffer();
    const drakememe = new Discord.MessageAttachment(Image);
    message.lineReplyNoMention(drakememe);
    message.channel.stopTyping();
  },
};
