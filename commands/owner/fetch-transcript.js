const { Client, Message, MessageEmbed } = require("discord.js");
const { fetchTranscript } = require("reconlx");

module.exports = {
  name: "fetch-transcript",
  aliases: ["transcript", "tsc"],
  usage: "",
  description: "Transcript chat to HTML File",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    const amount = args[0];
    if (!amount)
      return message.lineReply("Please specify a number to transcripted!");
    fetchTranscript(message, amount).then((data) => {
      const file = new MessageAttachment(data, "index.html");
      message.channel.send(file);
    });
  },
};
