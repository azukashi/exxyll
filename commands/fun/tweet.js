const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tweet",
  aliases: ["twit"],
  usage: "text-to-tweet",
  description: "Tweet Something!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const query = args.join(" ");
    if (!query) return message.lineReply(`Please specify a query!`);

    fetch(
      `https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        let embed = new MessageEmbed()
          .setTitle("Tweet!")
          .setImage(data.message)
          .setColor("BLUE")
          .setTimestamp();
        message.channel.send(embed);
      });
    message.channel.stopTyping();
  },
};
