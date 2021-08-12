const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "report",
  description: "Report a bugs or something to the developers!",
  emoji: "❗",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get("788260234409672754");
    const query = args.join(" ");
    const embedBugnya = new MessageEmbed()
      .setTitle(`New Bugs Reported!`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField(`Bug Details`, query)
      .addField(
        `Reported by`,
        `${message.author.tag} from **${message.member.guild.name}** (${message.author.id})`
      )
      .setColor("#FF0000")
      .setTimestamp();

    owner.send({ embeds: [embedBugnya] });

    const makasihOm = new MessageEmbed()
      .setTitle("Thanks for reporting this incident!")
      .setDescription(
        `<@${message.author.id}>, Sorry for the inconvenience, and thanks for reporting the issues!\nYour report now is reviewed by our staff.`
      )
      .setColor("#FF0000")
      .setTimestamp();

    message.channel.send({ embeds: [makasihOm] });
  },
};
