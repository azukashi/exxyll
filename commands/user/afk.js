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

    message.reply(`You are now afk. \nReason : \`${reason}\``);
  },
};
