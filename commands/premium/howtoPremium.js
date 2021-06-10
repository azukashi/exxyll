const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "premium",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Upgrading to Premium Plan")
      .setDescription("Upgrade to Premium to Unlock Premium Commands!")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/848232775798226996/a1663c970cb38f341a53a0be608fbb56.png?size=128"
      )
      .setColor("BLUE")
      .addField(
        "How I Can Upgrading to Premium?",
        "You can Contact / DM Me at Discord.\nor\nDonate to me by doing `.support`"
      )
      .addField(
        "How much it costs?",
        "You can upgrade for only $1 or whatever you want to pay. Just do `.support` and Start to DM me."
      )
      .addField(
        "How I Can DM The Owner?",
        "Here is His Discord Tag!\n`Falcxxdev#1113`"
      )
      .setFooter(message.author.tag)
      .setTimestamp();

    message.channel.startTyping();
    message.lineReplyNoMention(embed);
    message.channel.stopTyping();
  },
};
