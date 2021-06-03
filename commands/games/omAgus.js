const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
module.exports = {
  name: "sus",
  aliases: ["su"],
  description: "just sends a sus button?",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const butn = new MessageButton()
      .setLabel(`SUS!?`)
      .setStyle("gray")
      .setID("amogus");

    let msg = await message.channel.send(`Sussy bruh`, {
      button: butn,
    });

    client.on("clickButton", async (button) => {
      if (button.id === "amogus") {
        await button.reply.send(`SUS! THE IMPOSTER IS SUS!!!`);
      }
    });
  },
};
