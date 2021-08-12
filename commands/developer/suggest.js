const { Client, Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggest a Features or Something to Developers.",
  emoji: "❔",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const wc = new WebhookClient(
      "849144486013042719",
      "rzb2wcGg5sFV8Ky1PpdhkEpBYEV0Bxt0AT5BS65EEr9M6U_a8V63D4amImbDKMpz7heX"
    );
    const query = args.join(" ");
    if (!query) return message.reply(`Please specify a suggestion!`);
    const suggestEmbed = new MessageEmbed()
      .setTitle(`New Suggestion!`)
      .setDescription(query)
      .setColor("#0000FF")
      .setFooter(`Sent from ${message.member.guild.name}`);
    wc.send({
      username: message.author.tag,
      avatarURL: message.author.displayAvatarURL({ dynamic: true }),
      embeds: [suggestEmbed],
    });

    const sankyuu = new MessageEmbed()
      .setTitle(`<:tickYes:863367013464408084> Thanks for your suggestion!`)
      .setDescription(
        `Hey <@${message.author.id}>, Thanks for your suggestion!\nYour suggestion has been sent to : [**Exxyll Development**](https://discord.gg/j2MfuWySfD) at <#849139267471933502>`
      )
      .setColor("#00FF00")
      .setTimestamp();

    message.channel.send({ embeds: [sankyuu] });
  },
};
