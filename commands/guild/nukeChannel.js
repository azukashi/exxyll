const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nuke",
  description: "Command to Nuke a Text Channel.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.lineReply(
        "You need `MANAGE_CHANNELS` Permission to run this command."
      );
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.lineReply("I'm Need `MANAGE_CHANNELS` Permission.");

    message.channel.clone().then((ch) => {
      ch.setParent(message.channel.parent.id);
      ch.setPosition(message.channel.position);
      message.channel.delete();

      ch.send(
        new MessageEmbed()
          .setTitle("This channel has been nuked!")
          .setImage(
            "https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831"
          )
          .setColor("RED")
          .setFooter(`Action performed by ${message.author.tag}`)
      ).then((m) => m.delete({ timeout: 7000 }));
    });
  },
};
