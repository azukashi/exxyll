const { Client, Message, MessageEmbed } = require("discord.js");
const blacklist = require("../../models/blacklist");

module.exports = {
  name: "blacklist-remove",
  aliases: ["remove-blacklist"],
  usage: "user id",
  description: "Remove User from Blacklist Database",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;
    const User = message.guild.members.cache.get(args[0]);
    if (!User) return message.lineReply("Please specify a user to blacklist!");

    blacklist.findOne({ id: User.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await blacklist
          .findOneAndDelete({ id: User.user.id })
          .catch((err) => console.log(err));
        message.lineReplyNoMention(
          `**${User.displayName}** has been removed from blacklist!`
        );
      } else {
        message.lineReply(`**${User.displayName}** is not blacklisted!`);
      }
    });
  },
};
