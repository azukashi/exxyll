const { Client, Message, MessageEmbed } = require("discord.js");
const prefix = require('../../config.json').prefix;

module.exports = {
  name: "default-rpc",
  aliases: ["def-rpc", "reset-rpc", "defaultrpc"],
  usage: "<text>",
  description: "Change Custom Presence to Default State",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
      client.user.setActivity(`${prefix}help or @Exxyll`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/falcxxr",
      });
      message.lineReplyNoMention(
        `Successfully Set Presence to => \`Default State\`.\nWith Presence Type : **Streaming**\nStreaming URL : \`https://twitch.tv/falcxxr\` (Default)`
      );
  },
};