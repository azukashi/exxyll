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
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "You must have `ADMINISTRATOR` Permission in order to run this command."
      );
    const role = message.guild.roles.everyone;
    if (!args.length) return message.channel.send("Please specify a query!");
    const query = args[0].toLowerCase();
    if (!["true", "false"].includes(query))
      return message.channel.send("The option you have stated isn't valid.");
    const perms = role.permissions.toArray();

    if (query === "false") {
      perms.push("SEND_MESSAGES");
      console.log(perms);
      await role.edit({ permissions: perms });
      message.channel.send("Server is unlocked now.");
    } else {
      const newPerms = perms.filter((perm) => perm !== "SEND_MESSAGES");
      console.log(newPerms);

      await role.edit({ permissions: newPerms });
      message.channel.send("Server is Now Locked Down for @everyone Role.");
    }
  },
};
