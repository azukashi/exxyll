const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

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
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let embed = new MessageEmbed()
      .setTitle(`${user.username}'s User Information`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor("BLUE")
      .addField("User Tag", user.tag)
      .addField("User ID", user.id)
      .addField("Status", user.presence.status)
      .addField(
        "Created At",
        `${moment(user.createdAt).format("LLLL")} (${checkDays(
          user.createdAt
        )})`
      )
      .addField(
        "Joined At",
        `${moment(member.joinedAt).format("LLLL")} (${checkDays(
          member.joinedAt
        )})`
      )
      .addField("Highest Role", `<@&${member.roles.highest.id}>`)
      .addField("Roles", member.roles.cache.map((r) => `<@&${r.id}>`).join(" "))
      .setFooter(message.author.tag)
      .setTimestamp();
    message.lineReplyNoMention(embed);
  },
};
