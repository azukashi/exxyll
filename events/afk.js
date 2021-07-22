const { MessageEmbed } = require("discord.js");
const { afk } = require("../Collection");
const moment = require("moment");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
      const data = afk.get(mentionedMember.id);

      if (data) {
        const [timestamp, reason] = data;
        const timeAgo = moment(timestamp).fromNow();

        const taggedEmbed = new MessageEmbed()
          .setTitle(`${mentionedMember} is currently AFK!`)
          .setDescription(`Time : \`${timeAgo}\`\nReason : \`${reason}\``)
          .setFooter(
            `${message.author.tag} Tagged ${mentionedMember}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("RED");

        message.lineReplyNoMention(taggedEmbed);
      }
    }

    const getData = afk.get(message.author.id);
    if (getData) {
      afk.delete(message.author.id);

      const welcomeBack = new MessageEmbed()
        .setTitle(`Your AFK Has Been Removed!`)
        .setDescription(
          `**Welcome back, ${message.member}. Your AFK Has been Removed**`
        )
        .setFooter(`Removed ${message.author.tag} AFK`)
        .setColor("BLUE");

      message.lineReplyNoMention(welcomeBack);
    }
  });
};
