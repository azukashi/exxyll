const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  aliases: [],
  usage: "<user-id>",
  description: "Unban user from Server by User ID",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.member.permissions.has("BAN_MEMBERS"))
      return message.lineReply(
        "You need `BAN_MEMBERS` Permisssion to run this command.\nIf you already have `BAN_MEMBERS` Permission, Make sure I Have `BAN_MEMBERS` Permission Too."
      );

    const id = args[0];
    if (!id) return message.lineReply("Please send an ID!");

    const bannedMembers = await message.guild.fetchBans();
    if (!bannedMembers.find((user) => user.user.id === id))
      return message.lineReply("User is not Banned!");

    message.guild.members.unban(id);
    message.lineReply("Unbanned User!");
  },
};
