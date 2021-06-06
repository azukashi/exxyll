const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  usage: "@user reason",
  description: "Ban mentioned user with reason",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(
        "You need `BAN_MEMBERS` Permission to run this command.\nIf you already have `BAN_MEMBERS` Permission, Make sure I Have `BAN_MEMBERS` Permission Too."
      );

    const member = message.mentions.members.first();
    if (!member) return message.reply("Please mention a member to ban!");

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.reply(
        "You can punish because u either have the same role or your role is lower."
      );

    const reason = args.slice(1).join(" ") || "No Reason Provided";
    const embed = new MessageEmbed()
      .setTitle(`Successfully Banned!`)
      .addField("Banned User", member)
      .addField("Moderator", `<@${message.author.id}>`)
      .addField("Reason", reason)
      .setColor("RED")
      .setTimestamp();

    const memberEmbed = new MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}!`)
      .addField("Moderator", message.author)
      .addField("Reason", reason);

    member
      .ban({ reason })
      .catch((err) =>
        message.channel.send(
          "An error has occured while trying to kick.\n\nYou can report this error with `.report` to Developers!"
        )
      );
    message.channel.send(embed);
  },
};
