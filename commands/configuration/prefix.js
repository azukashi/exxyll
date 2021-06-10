const { Client, Message, MessageEmbed } = require("discord.js");
const prefixSchema = require("../../models/prefix");

module.exports = {
  name: "prefix",
  aliases: ["set-prefix"],
  usage: "new-prefix",
  description: "Set custom prefix",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const res = await args.join(" ");
    if (!res) return message.lineReply("Please specify a prefix to change to.");

    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        prefixSchema.findOneAndDelete({ Guild: message.guild.id });
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.lineReplyNoMention(`Prefix has been updated to **${res}**`);
      } else {
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.lineReplyNoMention(
          `Custom prefix in this server is now set to **${res}**`
        );
      }
    });
  },
};
