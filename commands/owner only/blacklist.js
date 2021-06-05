const blacklist = require("../../models/blacklist.js");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "blacklist",
  aliases: [],
  usage: "user id",
  description: "Blacklist mentioned user from using commands",
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
    if (!User) return message.reply("Please specify a user to blacklist!");

    blacklist.findOne({ id: User.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        message.channel.send(
          `**${User.displayName}** has already been blacklisted!`
        );
      } else {
        data = new blacklist({ id: User.user.id });
        data.save().catch((err) => console.log(err));
        message.channel.send(`${User.user.tag} has been added to blacklist!`);
      }
    });
  },
};
