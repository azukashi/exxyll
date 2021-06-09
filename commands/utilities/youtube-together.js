const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube-together",
  aliases: ["ytt"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const voicechannel = message.member.voice.channelID;
    if (!voicechannel)
      return message.reply(
        `You need to be in a voice channel to run this command`
      );
    client.discordTogether
      .createTogetherCode(voicechannel, "youtube")
      .then(async (invite) => {
        return message.reply(
          `Hey here is your link! Click on the link to start! ${invite.code}`
        );
      });
  },
};
