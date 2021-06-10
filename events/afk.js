const { afk } = require("../Collection");
const client = require("../index");
const moment = require("moment");

client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return;

  const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id);

    if (data) {
      const [timestamp, reason] = data;
      const timeAgo = moment(timestamp).fromNow();

      message.lineReply(
        `${mentionedMember} is currently afk (${timeAgo})\nReason : \`${reason}\``
      );
    }
  }

  const getData = afk.get(message.author.id);
  if (getData) {
    afk.delete(message.author.id);
    message.lineReplyNoMention(
      `**Welcome back, ${message.member}**. Your AFK has been Removed.`
    );
  }
});
