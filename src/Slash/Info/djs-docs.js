const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "djs",
  description: "Search for a Class, Properties at Discord.js Docs",
  options: [
    {
      type: 3,
      name: "query",
      description: "Text to search. Class or Properties or something",
      required: true,
    },
  ],
  userperm: "SEND_MESSAGES",
  botperm: "SEND_MESSAGES",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [query] = args;
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        interaction.followUp({ embeds: [body] });
      });
  },
};
