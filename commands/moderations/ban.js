const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [""],
  description: "Ban Mention User",
  usage: "<mention|id> [reason]",
  category: "moderation",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let member =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) return message.channel.send(`Please Mention A User`);

    let reason = args.join(" ").slice(22);
    if (!reason) reason = "No Reason Specified";

    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send("You don't have permission to Ban Member!");

    let e = new MessageEmbed()
      .setTitle(`${member} Banned`)
      .setColor("RED")
      .setDescription(
        `
            Banned User: ${member}\n
            Mods: ${message.author}\n
            Reason: ${reason}
        `
      )
      .setTimestamp(new Date());

    let userE = new MessageEmbed()
      .setTitle(`You've Been Banned From **${message.guild.name}!**`)
      .setDescription(
        `
            Mods: ${message.author}\n
            Reason: ${reason}
        `
      )
      .setTimestamp(new Date());

    message.guild.member(member).ban({ reason });
    message.channel.send({ e });
    member.send({ userE });
  },
};
