const { Client, Message, MessageEmbed } = require("discord.js");
const { afk } = require("../../Collection");

module.exports = {
  name: "afk",
  aliases: [],
  usage: "reason",
  description: "Set your account status to AFK Mode.",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const reason = args.join(" ") || "No Reason!";

    afk.set(message.author.id, [Date.now(), reason]);

    const embed = new MessageEmbed()
      .setTitle(`You are now AFK!`)
      .setDescription(`Reason : \`${reason}\``)
      .setFooter(`${message.author.tag} is now AFK!`)
      .setColor("GREEN");

    message.lineReply(embed);
  },
};
