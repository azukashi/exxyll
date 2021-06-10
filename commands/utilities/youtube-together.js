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
    const notInVc = new MessageEmbed()
      .setDescription(
        ":x: | You need to be in a voice channel to run this command!"
      )
      .setColor("RED");
    if (!voicechannel) return message.reply(notInVc);
    client.discordTogether
      .createTogetherCode(voicechannel, "youtube")
      .then(async (invite) => {
        return message.reply(
          `Hey here is your link! Click on the link to start! ${invite.code}`
        );
      });
  },
};
