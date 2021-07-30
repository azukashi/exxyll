const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
  name: "anime",
  description: "Search details about an anime!",
  options: [
    {
      type: 3,
      name: "title",
      description: "Title of the anime",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [title] = args;
    fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        const title = body.results[0].title;
        const mal_url = body.results[0].url;
        const imgae = body.results[0].image_url;
        const synopsis = body.results[0].synopsis;
        const type = body.results[0].type;
        const episode = body.results[0].episodes;
        const score = body.results[0].score;
        const start_date = body.results[0].start_date;
        const rate = body.results[0].rated || "Unknown";

        console.log({
          title,
          mal_url,
          imgae,
          synopsis,
          type,
          episode,
          score,
          start_date,
          rate,
        });
        const embed = new MessageEmbed()
          .setTitle(title)
          .setURL(mal_url)
          .setThumbnail(imgae)
          .setDescription(synopsis)
          .addFields(
            {
              name: "Type",
              value: title,
            },
            {
              name: "Total Episode",
              value: episode,
            },
            {
              name: "Ratings (at MyAnimeList)",
              value: score,
            },
            {
              name: "Released",
              value: moment(start_date).format("LLLL"),
            },
            {
              name: "Rate",
              value: rate,
            }
          );

        interaction.followUp({ embeds: [embed] });
      })
      .catch((err) => {
        const embedd = new MessageEmbed()
          .setDescription(
            `<:tickNo:863367014092898314> | That anime isn't found!\n\n\`\`\`js\n${err}\n\`\`\``
          )
          .setColor("RED");
        interaction.followUp({ embeds: [embedd] });
      });
  },
};
