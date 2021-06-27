const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");

module.exports = {
  name: "pooh",
  aliases: ["tuxedopooh"],
  usage: "<text_1>, <text_2>",
  description: "Generate a Tuxedo Pooh Meme",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const split = args.join(" ").split("/");
    const text1 = split[0];
    const text2 = split[1];
    if (!text1 || !text2)
      return message.reply(
        "You need 2 sentences separated with `/` for this to work."
      );
    const Image = `https://api.popcatdev.repl.co/pooh?text1=${encodeURIComponent(
      text1
    )}&text2=${encodeURIComponent(text2)}`;
    const poo = MessageAttachment(Image, "tuxedopooh.png");
    message.channel.send(poo);
    message.channel.stopTyping();
  },
};
