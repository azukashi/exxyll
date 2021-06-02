const client = require("../index");
const Schema = require("../models/welcomeChannel.js");
const { MessageEmbed } = require("discord.js");

client.on("guildMemberAdd", async (member) => {
  Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
    if (!data) return;

    const channel = member.guild.channels.cache.get(data.Channel);
    const guildAvatar = client;

    channel.send(
      new MessageEmbed()
        .setTitle("New Member!")
        .setDescription(
          `Hey <@${member.user.id}>, Welcome to **${member.guild.name}**`
        )
        .setFooter(`${member.guild.memberCount} members`)
        .setColor("BLUE")
        .setTimestamp()
    );
  });
});
