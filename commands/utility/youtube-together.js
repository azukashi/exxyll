const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube-together",
  aliases: ["ytt", "ytogether"],
  usage: "",
  description: "Play a YouTube Video in a Voice Channel with your friends!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.startTyping();
    const voicechannel = message.member.voice.channelID;
    const notInVc = new MessageEmbed()
      .setDescription(
        ":x: | You need to be in a voice channel to run this command!"
      )
      .setColor("RED");
    message.channel.stopTyping();
    if (!voicechannel) return message.lineReply(notInVc);
    message.channel.startTyping();
    client.discordTogether
      .createTogetherCode(voicechannel, "youtube")
      .then(async (invite) => {
        return message.lineReply(
          `Hey here is your link! Click on the link to start! ${invite.code}`
        );
      });
    message.channel.stopTyping();
  },
};
