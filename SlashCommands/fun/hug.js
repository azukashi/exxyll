const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "hug",
  description: "Hug specified user",
  options: [
    {
      type: 6,
      name: "user",
      description: "User who you want to hug",
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
    const userUsername = client.users.cache.get(user).username;
    fetch("https://api.waifu.pics/sfw/hug")
      .then((res) => res.json())
      .then((body) => {
        const embed = new MessageEmbed()
          .setTitle(`${interaction.user.username} Hugged ${userUsername}`)
          .setImage(body.url)
          .setColor("#FFC0CB")
          .setFooter(
            `${interaction.user.tag}`,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();

        interaction.followUp({ embeds: [embed] });
      });
  },
};
