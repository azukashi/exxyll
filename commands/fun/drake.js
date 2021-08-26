const { Client, Message, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "drake",
  description: "Generate Drake Memes",
  aliases: [],
  emoji: "<:drakeYea:880266535908819025>",
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
      `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${user}&text2=${user2}`,
      {}
    );
    let Image = await res.buffer();
    const drakememe = new MessageAttachment(Image);
    message.channel.send({ files: [drakememe] });
  },
};
