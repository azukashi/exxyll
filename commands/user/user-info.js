const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ["user", "usr", "usrinfo"],
  usage: "",
  description: "Shows User Information",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first() || message.member;
    let embed = new MessageEmbed()
      .setTitle(`${user}'s User Information`)
      .setTimestamp(user.displayAvatarURL({ dynamic: true }))
      .setColor("BLUE")
      .addField("User Tag", user.tag)
      .addField("Created At", user.createdAt)
      .addField("Joined At", member.joinedAt)
      .addField("User ID", user.id)
      .setFooter(message.author.tag)
      .setTimestamp();
    message.lineReplyNoMention(embed);
  },
};
