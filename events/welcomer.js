const Schema = require("../models/welcomeChannel.js");
const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = (client) => {
  client.on("guildMemberAdd", async (user, member) => {
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;

      const channel = member.guild.channels.cache.get(data.Channel);
      let base = "https://luminabot.xyz/api/image/welcomecard2?";
      let image =
        base +
        `avatar=${user.user.displayAvatarURL({
          dynamic: false,
          format: "png",
        })}&username=${user.user.username}&membercount=${
          user.guild.memberCount
        }&guildname=${user.guild.name}`;
      let att = new MessageAttachment(image, "welcome.png");

      channel.send(
        new MessageEmbed()
          .setTitle("New Member!")
          .setThumbnail(
            user.user.displayAvatarURL({ size: 512, dynamic: true })
          )
          .setDescription(
            `Hey <@${member.user.id}>, Welcome to **${member.guild.name}!**`
          )
          .setFooter(`${member.guild.memberCount} members`)
          .setColor("BLUE")
          .setTimestamp()
      );
      channel.send(att);
    });
  });
};
