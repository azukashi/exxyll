const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "disbotgg",
  description:
    "Returns Detailed Listed / Waitlisted Bot at [discord.bots.gg](https://discord.bots.gg)",
  emoji: "<:discordbotsgg:875331402776850482>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const id = args.join(" ");
    if (!id)
      return message.reply({
        content: "Please specify Bot ID to Search!",
        ephemeral: true,
      });
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
        message.channel.send({ embeds: [e] });
      })
      .catch((err) => {
        const errembed = new MessageEmbed()
          .setTitle(`:x: Not Listed`)
          .setDescription(
            `${id} is not listed / removed at [discord.bots.gg](https://discord.bots.gg)`
          )
          .setColor("RED");
        message.channel.send({ embeds: [errembed], ephemeral: true });
      });
  },
};
