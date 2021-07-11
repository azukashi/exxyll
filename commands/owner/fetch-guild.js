const { Client, Message, MessageEmbed, Util } = require("discord.js");
const owner_id = require("../../config.json").owner_id;

module.exports = {
  name: "fetch-guild",
  aliases: ["list-server", "fetch-server"],
  usage: "",
  description: "Fetch and Get List of Server",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== owner_id) return;
    let clientGuilds = message.client.guilds.cache;
    let messageObj = Util.splitMessage(
      clientGuilds.map(
        (g) =>
          "`" +
          g.id +
          `\` **|** \`` +
          g.name +
          `\` **|** \`` +
          g.members.cache.size +
          "`"
      ) || "None"
    );
    if (messageObj.length == 1) {
      message.lineReplyNoMention(
        new MessageEmbed()
          .setTitle(`Showing Guild List`)
          .setDescription(`Guild ID | Guild Name | Total Members\n${messageObj[0]}`)
          .setColor("#800080")
      );
    } else {
      for (i = 0; messageObj.length < i; i++) {
        message.lineReplyNoMention(
          new MessageEmbed()
            .setTitle(`Showing Guild List`)
            .setDescription(`Guild ID | Guild Name | Total Members\n${messageObj[i]}`)
            .setColor("#800080")
        );
      }
    }
  },
};
