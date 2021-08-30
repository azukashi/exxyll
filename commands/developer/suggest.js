const { Client, Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "suggest",
  description: "Suggest a Features or Something to Developers.",
  emoji: "❔",
  userperm: ["SEND_MESSAGES"],
  botperm: ["SEND_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const wc = new WebhookClient(
      "881846267293089792",
      "CH1aU0g6QOrQ258yVAkTU2jK5DEvNjh9KIFNSyB0dnj5AOI7MVt3Q64E43eGMT5352r4"
    );
    const query = args.join(" ");
    if (!query) return message.reply({content: `Please specify a suggestion!`});
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
