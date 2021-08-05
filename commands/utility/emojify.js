const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "emojify",
  description: "Emojify a text",
  aliases: [],
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const ctx = args.join(" ");
    if(!ctx) return message.lineReply('Please specify a text!')
    fetch(`https://luminabot.xyz/api/text/emojify?text=${ctx}`)
      .then((res) => res.json())
      .then((body) => {
        message.lineReplyNoMention(body.emojifyed);
      })
      .catch((err) => {
        message.lineReply(`An error occured!\nError Message : \n\`\`\`yml\n${err}\n\`\`\``);
        console.log(err);
      });
  },
};
