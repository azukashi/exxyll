const {
  CommandInteraction,
  Client,
  WebhookClient,
  MessageEmbed,
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "discordbotsgg",
  description: "Returns Detailed Listed / Waitlisted Bot in discord.bots.gg",
  options: [
    {
      type: 3,
      name: "id",
      description: "Your Discord Bot ID",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [id] = args;
    fetch(`https://discord.bots.gg/api/v1/bots/${id}`)
      .then((res) => res.json())
      .then((body) => {
        const name = `${body.username}#${body.discriminator}`;
        const avatar = body.avatarURL;
        const clientid = body.clientId;
        const details = body.shortDescription;
        const prefix = body.prefix;
        const library = body.libraryName || "No Library Specified";
        const website = body.website || "No Website Specified";
        const owner = `${body.owner.username}#${body.owner.discriminator}`;
        const e = new MessageEmbed()
          .setTitle(name)
          .setThumbnail(avatar)
          .setDescription(details)
          .addField("Client ID", clientid, true)
          .addField("Prefix", prefix, true)
          .addField("Library", library, true)
          .addField("Owner", owner, true)
          .addField("Website", website, true)
          .setColor("ORANGE");
        interaction.followUp({ embeds: [e] });
      })
      .catch((err) => {
        const errembed = new MessageEmbed()
          .setTitle(`:x: Not Listed`)
          .setDescription(
            `${id} is not listed / removed at [discord.bots.gg](https://discord.bots.gg)`
          )
          .setColor("RED");
        interaction.followUp({ embeds: [errembed] });
      });
  },
};
