const { Client, Message, MessageEmbed } = require("discord.js");
const { fetchTranscript } = require("reconlx");

module.exports = {
  name: "fetch-transcript",
  aliases: ["transcript", "tsc"],
  usage: "",
  description: "Transcript 15 chat to HTML File",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    fetchTranscript(message, 15).then((data) => {
      const file = new MessageAttachment(data, "index.html");
      message.channel.send(file);
    });
  },
};
