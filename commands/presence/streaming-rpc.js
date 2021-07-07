const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "streaming-rpc",
  aliases: ["str-rpc", "stream-rpc", "streamrpc"],
  usage: "<text>",
  description: "Change Custom Presence to Streaming Status Text",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    const text = args.join(" ");
    if (!text) return message.lineReply("Please define a text bro, noob");
      client.user.setActivity(`${text}`, {
        type: "STREAMING",
        url: "https://www.twitch.tv/falcxxr",
      });
      message.lineReplyNoMention(
        `Successfully Set Presence to => \`${text}\`.\nWith Presence Type : **Streaming**\nStreaming URL : \`https://twitch.tv/falcxxr\` (Default)`
      );
  },
};