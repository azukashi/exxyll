const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "channelinfo",
  description: "Returns Information aboout Channels",
  options: [
    {
      type: 7,
      name: "channel",
      description: "Channel to show information about",
      required: true,
    },
  ],
  userperm: "SEND_MESSAGES",
  botperm: "SEND_MESSAGES",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? " day" : " days") + " ago";
    }
    let [channel] = args;
    let fixedChannel = client.channels.cache.get(channel);
    let channelType = fixedChannel.type;
    if (channelType === "GUILD_TEXT") {
      channelType = "Text Channel";
    }
    if (channelType === "GUILD_VOICE") {
      channelType = "Voice Channel";
    }
    if (channelType === "GUILD_PUBLIC_THREAD") {
      channelType = "Public Thread";
    }
    if (channelType === "GUILD_PRIVATE_THREAD") {
      channelType = "Private Thread";
    }
    if (channelType === "GUILD_CATEGORY") {
      channelType = "Category";
    }
    let inline = true;
    try {
      let e = new MessageEmbed()
        .setTitle(`<:channel:863363700463632414> Channel Information`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: false }))
        .setDescription(`Information About ${fixedChannel}`)
        .addField("Created At:", `${checkDays(fixedChannel.createdAt)}`, inline)
        .addField("Channel ID:", `${fixedChannel.id}`, inline)
        .addField("Channel Type:", `${channelType}`, inline)
        .setFooter(
          `Channel Information | Command Request by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("BLUE");
      interaction.followUp({ embeds: [e] });
    } catch (error) {
      interaction.followUp(error);
    }
  },
};
