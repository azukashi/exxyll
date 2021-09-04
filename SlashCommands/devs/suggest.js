const {
  CommandInteraction,
  Client,
  MessageEmbed,
  WebhookClient,
} = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggest a Features or Something to Developers.",
  options: [
    {
      type: 3,
      name: "suggestion",
      description: "Describe your suggestion",
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
    const [suggestion] = args;
    const wc = new WebhookClient(
      "849144486013042719",
      "rzb2wcGg5sFV8Ky1PpdhkEpBYEV0Bxt0AT5BS65EEr9M6U_a8V63D4amImbDKMpz7heX"
    );
    const suggestEmbed = new MessageEmbed()
      .setTitle(`New Suggestion!`)
      .setDescription(suggestion)
      .setColor("#0000FF")
      .setFooter(`Sent from ${interaction.guild.name}`);
    wc.send({
      username: interaction.user.tag,
      avatarURL: interaction.user.displayAvatarURL({ dynamic: true }),
      embeds: [suggestEmbed],
    });
    const sankyuu = new MessageEmbed()
      .setTitle(`<:tickYes:863367013464408084> Thanks for your suggestion!`)
      .setDescription(
        `Hey <@${interaction.user.id}>, Thanks for your suggestion!\nYour suggestion has been sent to : [**Exxyll Development**](https://discord.gg/j2MfuWySfD) at <#849139267471933502>`
      )
      .setColor("#00FF00")
      .setTimestamp();
    interaction.followUp({ embeds: [sankyuu] });
  },
};
