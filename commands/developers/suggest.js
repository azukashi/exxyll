const { Client, Message, MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
  name: "suggest",
  usage: "suggestion to suggest",
  description:
    "Suggest something to Developers! Your suggestion will sent to **Exxyll Development Discord Server**!",
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
    const suggestionQuery = args.join(" ");

    if (!suggestionQuery)
      return message.lineReply("Please specify a suggestion!");

    const suggestionEmbed = new MessageEmbed()
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField("Suggestion", suggestionQuery)
      .addField("Sent From", message.member.guild.name)
      .setColor("BLUE")
      .setTimestamp();

    const confirmationEmbed = new MessageEmbed()
      .addField(
        "✅ Successfully Sent!",
        `Hey, <@${message.author.id}> Thanks for your suggestion!`
      )
      .addField(
        "📨 Sent to",
        `Discord Server : **Exxyll Development** at **<#849139267471933502>** Channel.`
      )
      .setColor("GREEN");

    wc.send({
      username: message.author.tag,
      avatarURL: message.author.displayAvatarURL({ dynamic: true }),
      embeds: [suggestionEmbed],
    });

    // Send Confirmation to user that suggesting a suggestion
    message.lineReplyNoMention(confirmationEmbed);
  },
};

// ✅ | Hey, <@${message.author.id}> Thanks for your suggestion! Your suggestion has been sent!

// Webhook URL
// https://discord.com/api/webhooks/849144486013042719/rzb2wcGg5sFV8Ky1PpdhkEpBYEV0Bxt0AT5BS65EEr9M6U_a8V63D4amImbDKMpz7heX
