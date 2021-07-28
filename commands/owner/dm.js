const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dm",
  description: "Send a message via Direct Message to Specified User",
  aliases: ["dm-user"],
  usage: "<user-id> <message>",
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.author.id === "788260234409672754") return;
    const user =
      message.mentions.users.first() ||
      client.users.cache.get(args.join(" ")) ||
      message.author;
    const msgs = args.join(" ").split(1);
    if (!msgs) return message.lineReply("Please specify a message to sent!");
    user.send(
      new MessageEmbed()
        .setColor("#0000FF")
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true, size: 128 })
        )
        .setDescription(msgs)
        .setTimestamp()
    );
    message.lineReplyNoMention(
      new MessageEmbed()
        .setDescription(`Successfully sent a message to ${user}!`)
        .setColor("#00FF00")
    );
  },
};
