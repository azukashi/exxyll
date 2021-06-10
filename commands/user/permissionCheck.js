const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "checkperms",
  aliases: ["permcheck"],
  description: "Command to Check User's Permissions.",
  run: async (client, message, [member = ""]) => {
    if (!member.match(/\d{17,19}/)) {
      member = message.author.id;
    }
    member = await message.guild.members
      .fetch(member.match(/\d{17,19}/)[0])
      .catch(() => null);
    if (!member) {
      return message.lineReply(`\\❌ User not found.`);
    }
    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();
    return message.lineReplyNoMention(
      new MessageEmbed()
        .setColor(member.displayColor || "GREY")
        .setTitle(`${member.displayName}'s Permissions`)
        .setFooter(
          `Check Permissions | Command Request by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          [
            "\\♨️ - This Server",
            "\\#️⃣ - The Current Channel",
            "```properties",
            "♨️ | #️⃣ | Permission",
            "========================================",
            `${Object.keys(sp)
              .map((perm) =>
                [
                  sp[perm] ? "✅ |" : "❌ |",
                  cp[perm] ? "✅ |" : "❌ |",
                  perm
                    .split("_")
                    .map((x) => x[0] + x.slice(1).toLowerCase())
                    .join(" "),
                ].join(" ")
              )
              .join("\n")}`,
            "```",
          ].join("\n")
        )
    );
  },
};
