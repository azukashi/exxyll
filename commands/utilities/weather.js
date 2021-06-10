const weather = require("weather-js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "weather",
  aliases: ["wthr"],
  usage: "location",
  description: "See currently weather in your location.",
  run: async (client, message, args) => {
    weather.find(
      { search: args.join(" "), degreeType: "C" },
      function (error, result) {
        // 'C' can be changed to 'F' for farneheit results
        if (!args[0])
          return message.lineReply(
            new MessageEmbed()
              .setTitle("Error Usage")
              .setDescription(`Usage: ${client.prefix}weather <place>`)
          );

        if (result === undefined || result.length === 0)
          return message.lineReply(
            new MessageEmbed()
              .setTitle("Error 404")
              .setDescription(`Couldn't Find This Country`)
          );

        var current = result[0].current;
        var location = result[0].location;

        const roleColor =
          message.guild.me.displayHexColor === "#000000"
            ? "#ffffff"
            : message.guild.me.displayHexColor;

        const weatherinfo = new Discord.MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather Information for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(roleColor)
          .addField("Timezone", `UTC${location.timezone}`, true)
          .addField("Degree Type", "Celsius", true)
          .addField("Temperature", `${current.temperature}°`, true)
          .addField("Wind", current.winddisplay, true)
          .addField("Feels like", `${current.feelslike}°`, true)
          .addField("Humidity", `${current.humidity}%`, true)
          .setFooter(
            `Weather | Command Request by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.lineReplyNoMention(weatherinfo);
      }
    );
  },
};
