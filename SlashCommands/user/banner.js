const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "banner",
  description: "Shows user banner",
  options: [
    {
      type: 6,
      name: "user",
      description:
        "Who is the user? Fill it with your username if you want to look yourself.",
      required: true,
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [user] = args;
    console.log(user);
    const userFixed = client.users.cache.get(user);
    fetch(`https://discord.com/api/users/${user}`, {
      headers: {
        Authorization: `Bot ${client.token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.banner) {
          const extension = body.banner.startsWith("a_") ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/banners/${user}/${body.banner}${extension}?size=1024`;

          const embed = new MessageEmbed()
            .setTitle(`${userFixed.username}'s Banner Image`)
            .setImage(url)
            .setColor("BLUE");

          interaction.followUp({ embeds: [embed] });
        } else {
          if (body.accent_color) {
            const embed = new MessageEmbed()
              .setDescription(
                `${userFixed.username} doesn't have a banner. But they do have a accent color!`
              )
              .setColor(body.accent_color);

            interaction.followUp({ embeds: [embed] });
          } else
            return interaction.followUp({
              content: `${userFixed.username} is not have a banner and accent color!`,
            });
        }
      });
  },
};
