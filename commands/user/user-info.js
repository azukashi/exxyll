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
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find((u) =>
        u.user.username
          .toLowerCase()
          .includes(
            args.join(" ") || u.user.tag.toLowerCase() === args.join(" ")
          )
      ) ||
      message.member;
    let member = message.mentions.members.first() || message.member;
    let embed = new MessageEmbed()
      .setTitle(`${user.tag}'s User Information`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor("BLUE")
      .addField("User Tag", user.tag)
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
      .addField("User ID", user.id)
      .setFooter(message.author.tag)
      .setTimestamp();
    message.lineReplyNoMention(embed);
  },
};
