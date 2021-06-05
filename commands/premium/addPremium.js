const premiumSchema = require("../../models/premium");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "add-premium",
  aliases: ["db-premium"],
  usage: "<user>",
  description:
    "**[Owner-only]** Add mentioned user to Database for using Premium Features.",
  hidden: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "788260234409672754") return;

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) return message.reply("Please specify a valid member!");

    premiumSchema.findOne(
      {
        User: member.id,
      },
      async (err, data) => {
        if (data)
          return message.reply(
            "This user has already gained premium features!"
          );

        new premiumSchema({
          User: member.id,
        }).save();
        return message.reply(`Added ${member} to the database!`);
      }
    );
  },
};
