const { Client, Message, MessageAttachment } = require("discord.js");

module.exports = {
  name: "pikachu",
  aliases: ["pika-pog"],
  usage: "<text>",
  description: "Simply generate pikachu pog meems",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text) return message.lineReply("Please provide text!");
    let image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(
      text
    )}`;
    let imgae = new MessageAttachment(image, "pika.png");
    message.lineReply(imgae);
  },
};
