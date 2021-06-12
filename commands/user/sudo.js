const { Client, Message, MessageEmbed } = require("discord.js");
const { sudo } = require("weky");
module.exports = {
  name: "sudo",
  aliases: ["sud"],
  description: "Sudo as someone",
  usage: "[message]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(`MANAGE_MESSAGES`))
      return message.lineReply(
        `You are missing \`MANAGE_MESSAGES\` Permission.`
      );
    const user = message.mentions.members.first();
    if (!user) return message.lineReply(`Mention someone pls`);
    const msg = args.slice(1).join(" ");
    if (!msg) return message.channel.send(`Specify a message!`);
    const xd = new sudo({
      message: message,
      text: msg,
      member: user,
    });
    xd.start();
  },
};
