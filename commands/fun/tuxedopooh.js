const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pooh",
  aliases: [],
  usage: "<text_1>, <text_2>",
  description: "Tuxedo Pooh Meme Maker",
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
    if (!user || !user2)
      return message.lineReply(
        "You need two sentences separatted with comma `,`"
      );
    const res = await fetch(
      `https://api.popcatdev.repl.co/pooh?text1=${user}&text2=${user2}`,
      {}
    );
    let Image = await res.buffer();
    const poohmeme = new Discord.MessageAttachment(Image);
    message.lineReply(poohmeme);
    message.channel.stopTyping();
  },
};
