const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.lineReply(
        "You need `MANAGE_CHANNELS` Permission to run this command.\nIf you already have `MANAGE_CHANNELS` Permission, Make sure I Have `MANAGE_CHANNELS` Permission Too."
      );
    if (message.member.hasPermission("MANAGE_CHANNELS"))
      if (isNaN(amount))
        return message.lineReply("<:x:It doesn't seem to be valid value");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.lineReplyNoMention("Slowmode is now " + amount + " seconds");
        return;
      } else {
        message.lineReplyNoMention("Slowmode is now " + amount + " second");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.lineReplyNoMention("Slowmode is now " + amount + " minutes");
        return;
      } else {
        message.lineReplyNoMention("Slowmode is now " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.lineReplyNoMention("Slowmode is now " + amount + " hours");
        return;
      } else {
        message.lineReplyNoMention("Slowmode is now " + amount + " hour");
        return;
      }
    } else {
      message.lineReplyNoMention(
        "You can only set seconds(s), minutes(min) and Hours(h)"
      );
    }
  },
};
