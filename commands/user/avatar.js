const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["myavatar"],
  usage: "",
  description: "See your account avatar!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;

    message.channel.send(
      new MessageEmbed()
        .setTitle(`${member.user.tag}'s avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor("RANDOM")
        .setFooter(`Requested by ${member.user.tag}`)
        .setTimestamp()
    );
  },
};
