const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "memes",
  aliases: ["meme"],
  usage: "",
  description: "Generate Memes",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const res = await fetch(`http://api.popcatdev.repl.co/meme`);
    const meme = await res.json();
    const embed = new MessageEmbed()
      .setTitle(meme.title)
      .setURL(meme.url)
      .setColor("RANDOM")
      .setImage(meme.image)
      .setFooter(`👍 ${meme.upvotes} || 💬 ${meme.comments}`);

    message.lineReplyNoMention(embed);
  },
};
