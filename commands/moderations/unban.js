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
        "You need `BAN_MEMBERS` Permission in order to run this command!"
      );
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReply(`I Need \`BAN_MEMBERS\` Permission in order to run this command!`)

    const id = args[0];
    if (!id) return message.lineReply("Please send an ID!");

    const bannedMembers = await message.guild.fetchBans();
    if (!bannedMembers.find((user) => user.user.id === id))
      return message.lineReply("User is not Banned!");

    message.guild.members.unban(id);
    message.lineReply("Unbanned User!");
  },
};
