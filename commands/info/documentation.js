const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "djs",
  aliases: ["docs"],
  usage: "<query>",
  description: "See Discord.js Stable Documentations",
  hidden: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const query = args.join(" ");
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.lineReplyNoMention({ embed: data });
      }
    });
    message.channel.stopTyping();
  },
};
