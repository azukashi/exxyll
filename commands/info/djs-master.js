const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "djs-master",
  aliases: ["docs-master", "discord.js@dev"],
  usage: "<query>",
  description: "See Discord.js Master Branch Documentations",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.lineReply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.lineReplyNoMention({ embed: data });
      }
    });
  },
};
