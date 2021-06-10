const { Client, Message, MessageEmbed } = require("discord.js");
const child = require("child_process");

module.exports = {
  name: "terminal",
  aliases: ["bash", "sh"],
  usage: "commands",
  description: "Command to Execute Terminal Commands inside Discord.",
  /**
   *@param {Client} client
   *@param {Message} message
   *@param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;

    const command = args.join(" ");
    if (!command)
      return message.lineReplyNoMention("Please specify a command to execute!");

    child.exec(command, (err, res) => {
      if (err) return message.channel.send(err);
      message.lineReplyNoMention(res.slice(0, 2000), { code: "js" });
    });
  },
};
