const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "list-member",
  description: "List member in a Guilds with providing Guild ID.",
  aliases: ["memberlist", "member-list"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.author.id === "788260234409672754") return;
    const guild_id = args.join(" ");
    if (!guild_id) return message.lineReply("Specify Guild ID Bro");
    const list = client.guilds.cache.get(guild_id);
    list.members.cache.each((member) =>
      message.lineReplyNoMention(`\`\`\`js\n${member}\`\`\``)
    );
  },
};
