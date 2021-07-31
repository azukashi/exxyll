const { CommandInteraction, Client, MessageAttachment } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports = {
  name: "rank",
  description: "See your current ranking at the levelling system",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    let Member = interaction.user;

    const target = await Levels.fetch(Member.id, interaction.guild.id);
    if (!target)
      return interaction.followUp({
        content: `${Member.tag} doesn't have any xp so far. Start chatting to gain xp.`,
      });

    const reqXP = Levels.xpFor(parseInt(target.level) + 1);

    const rank = new canvacord.Rank()
      .setAvatar(Member.displayAvatarURL({ dynamic: true, format: "png" }))
      .setCurrentXP(target.xp)
      .setRequiredXP(reqXP)
      .setLevel(target.level)
      .setRank(1, "RANK", false)
      .setBackground(
        "IMAGE",
        "https://images-na.ssl-images-amazon.com/images/I/61qBaKk%2B88L._SL1000_.jpg"
      )
      // .setStatus(Member.presence.status)
      .setProgressBar("#ffc0cb", "COLOR")
      .setUsername(Member.username)
      .setDiscriminator(Member.discriminator);
    rank.build().then((data) => {
      const attachment = new MessageAttachment(data, "rank.png");
      interaction.followUp({ files: [attachment] });
    });
  },
};
