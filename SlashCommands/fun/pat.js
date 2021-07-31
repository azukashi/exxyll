const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pat",
  description: "Pat specified user",
  options: [
    {
      type: 6,
      name: "user",
      description: "User who you want to pat",
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
    fetch("https://api.waifu.pics/sfw/pat")
      .then((res) => res.json())
      .then((body) => {
        const embed = new MessageEmbed()
          .setDescription(`**${interaction.user.username} Patting <@${user}>**`)
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
