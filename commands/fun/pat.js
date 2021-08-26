const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "pat",
  description: "Pat someone!",
  aliases: [],
  emoji: "<a:Peepo_Pat:880270920126709830>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    if (!user) return message.reply("Please mention a user!");
    if (user == message.author.id)
      return message.reply(`No, U can't hug yourself.`);
    if (user == client.user.id) return message.reply(`No, U can't hug me.`);
    if (user == message.author.bot)
      return message.reply(`No, U can't hug bots.`);
    fetch("https://api.waifu.pics/sfw/pat")
      .then((res) => res.json())
      .then((body) => {
        const embed = new MessageEmbed()
          .setTitle(`${message.author.username} Patting ${user.username}`)
          .setImage(body.url)
          .setColor("#FFC0CB")
          .setFooter(
            `${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      });
  },
};
