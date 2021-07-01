const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "premium",
  aliases: ["pro-plan"],
  usage: "",
  description: "Be a Premium User. See How To Be a Premium Here.",
  hidden: false,
  premium: false,
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
      .addField("You can dming the owner, or donating by `.support`!")
      .addField(
        "How much it costs?",
        "You can upgrade for only $1 or whatever you want to pay. Just do `.support` and Confirm by dming onwer."
      )
      .addField(
        "How I Can DM The Owner?",
        "Here is His Discord Tag!\n`Falcxxdev#0001`"
      )
      .setFooter(message.author.tag)
      .setTimestamp();

    message.channel.startTyping();
    message.lineReplyNoMention(embed);
    message.channel.stopTyping();
  },
};
