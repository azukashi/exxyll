const { Client, Message, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pooh",
  description: "Generate Pooh Memes",
  aliases: [],
  emoji: "<:Peepo_Happy:880273539985469450>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const split = args.join(" ").split(",");
    const user = split[0];
    const user2 = split[1];
    if (!user || !user2)
      return message.reply(
        `You need to specify two sentences separated with comma \`,\``
      );
    const res = await fetch(
      `https://api.popcatdev.repl.co/pooh?text1=${user}&text2=${user2}`,
      {}
    );
    let Image = await res.buffer();
    const poohmeme = new MessageAttachment(Image);
    message.channel.send({ files: [poohmeme] });
  },
};
