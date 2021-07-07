const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "listening-rpc",
  aliases: ["listen-rpc", "listenrpc"],
  usage: "<text>",
  description: "Change Custom Presence Listening Status Text",
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
    if(!text) return message.lineReply(`Specify a text for this bro or i'll killing u rn`);
     client.user.setActivity(`${text}`, { type: 'LISTENING' })
      message.lineReplyNoMention(
        `Successfully Set Presence to => \`${text}\`.\nWith Presence Type : **Listening**`
      );
  },
};