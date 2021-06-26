const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "covid",
  aliases: ["corona"],
  usage: "country",
  description: "See Covid Stats in Specified Country",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
      .setTitle("Missing arguments")
      .setColor(0xff0000)
      .setDescription(
        "You are missing some args (ex: covid all || covid Canada)"
      )
      .setTimestamp();

    if (!args[0]) return message.channel.send(noArgs);

    if (args[0] === "all") {
      fetch(`https://covid19.mathdro.id/api`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Stats 🌎`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths);

          message.channel.send(embed);
        });
    } else {
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats for **${countries}**`)
            .setThumbnail(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/478px-SARS-CoV-2_without_background.png"
            )
            .setColor("RED")
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths);

          message.channel.send(embed);
        })
        .catch((e) => {
          return message.channel.send("Invalid country provided");
        });
    }
  },
};
