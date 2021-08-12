const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ownerinfo",
  description: "Returns Information about Exxyll Owner",
  emoji: "<:owner:864432628928217098>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get("788260234409672754");
    const embed1 = new MessageEmbed()
      .setTitle(`<:owner:864432628928217098> Owner Info`)
      .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
      .addField(`Name`, `Gifaldy Azka`)
      .addField(`Discord Tag`, `Falcxxdev#0001`)
      .addField(
        `Working on`,
        `Bot Development, Website Development, Feature Development`
      )
      .addField(`Location`, `Bandung, Indonesia`)
      .addField(
        `Social Media`,
        `[Website](https://gifaldyazka.is-a.dev) | [GitHub](https://github.com/gifaldyazkaa) | [Twitter](https://twitter.com/falcxxr)`
      )
      .addField(
        `Buy me a Coffee`,
        `[Buy me a Coffee Here](https://buymeacoffee.com/gifaldyazkaa)`
      )
      .setColor("PURPLE");

    message.channel.send({ embeds: [embed1] });
  },
};
