const { CommandInteraction, Client, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "drake",
  description: "Create a Drake Memes",
  options: [
    {
      type: 3,
      name: "text_1",
      description: "First Argument",
      required: true,
    },
    {
      type: 3,
      name: "text_2",
      description: "Second Argument",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [text_1, text_2] = args;
    fetch(
      `https://frenchnoodles.xyz/api/endpoints/drake/?text1=${text_1}&text2=${text_2}`
    )
      .then((res) => res.buffer())
      .then((img) => {
        const Image = new MessageAttachment(img);
        interaction.followUp({ files: [Image] });
      });
  },
};
