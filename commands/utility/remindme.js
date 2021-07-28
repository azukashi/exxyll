const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "remind",
  aliases: ["remindme"],
  description: "reminds you about what will you do!",
  usage: "<time> <reminder-message>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let reminder = args.slice(1).join(" ");
    let time = args[0];

    if (!time) return message.lineReply("Please set a time to reminder!");
    if (!reminder) return message.lineReply("Please state a reminder!");
    if (reminder.length > 200)
      return message.lineReply("Max Reminder Length Is 500 Characters");

    const setreminderembed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Reminder Set!")
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Successfully set <@${message.author.id}> a reminder!`)
      .addField("⌛ Reminded In ⌛", `\`${time}\``)
      .addField("👥 Reminder 👥", `${reminder}`)
      .setTimestamp();

    message.lineReplyNoMention(setreminderembed);

    // Pake arrow function () => {} biar keren :v
    setTimeout(async () => {
      message.lineReply(`<@${message.author.id}> Reminder Timeout!`);

      const alertembed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Reminder Alert!")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `Hey, <@${message.author.id}>! Your reminder is timeout!`
        )
        .addField("⌛ Reminder ⌛", `\`${reminder}\``)
        .setTimestamp();

      message.lineReplyNoMention(alertembed);
    }, ms(time));
  },
};
