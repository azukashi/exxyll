const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  usage: "@user reason",
  description: "Kick mentioned user with reason",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.lineReply(
        "You need `KICK_MEMBERS` Permission in order to run this command."
      );
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReply(`I Need \`KICK_MEMBERS\` Permission in order to run this command!`)

    const member = message.mentions.members.first();
    if (!member) return message.lineReply("Please mention a member to kick!");

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.lineReply(
        "You can punish because u either have the same role or your role is lower."
      );

    const reason = args.slice(1).join(" ") || "No Reason Provided";
    const embed = new MessageEmbed()
      .setTitle(`Successfully Kicked!`)
      .addField("Kicked User", member)
      .addField("Moderator", `<@${message.author.id}>`)
      .addField("Reason", reason)
      .setColor("RED")
      .setTimestamp();

    const memberEmbed = new MessageEmbed()
      .setTitle(`You have been kicked from ${message.guild.name}!`)
      .addField("Moderator", message.author)
      .addField("Reason", reason);

    member
      .kick({ reason })
      .catch((err) =>
        message.lineReplyNoMention(
          "An error has occured while trying to kick.\n\nYou can report this error with `.report` to Developers!"
        )
      );
    message.lineReplyNoMention(embed);
  },
};
