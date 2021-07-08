const { Client, Message, MessageEmbed, TeamMember } = require("discord.js");

module.exports = {
  name: "lockdown",
  categories: "Moderation",
  aliases: ["lock"],
  usage: "true || false",
  description:
    "Lockdown the server. True for Lockdown, False for Unlock Server.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.lineReply(
        "You need `MANAGE_GUILD` Permission in order to run this command!"
      );
    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.lineReply(`I Need \`MANAGE_GUILD\` Permission in order to run this command!`)
    const role = message.guild.roles.everyone;
    if (!args.length) return message.lineReply("Please specify a query!");
    const query = args[0].toLowerCase();
    if (!["true", "false"].includes(query))
      return message.lineReply("The option you have stated isn't valid.");
    const perms = role.permissions.toArray();

    if (query === "false") {
      perms.push("SEND_MESSAGES");
      console.log(perms);
      await role.edit({ permissions: perms });
      message.lineReplyNoMention("Server is unlocked now.");
    } else {
      const newPerms = perms.filter((perm) => perm !== "SEND_MESSAGES");
      console.log(newPerms);

      await role.edit({ permissions: newPerms });
      message.lineReplyNoMention(
        "Server is Now Locked Down for @everyone Role."
      );
    }
  },
};
