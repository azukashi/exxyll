const { Client, Message, MessageEmbed } = require("discord.js");
const owner_id = require("../../config.json").owner_id;

module.exports = {
  name: "list-channel",
  aliases: ["list-ch"],
  usage: "",
  description: "Fetch and List all Channels",
  hidden: true,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== owner_id) return;
    var array = [];
    function getChannelIDs(fetch) {
      try {
        let channels = client.channels.cache.array();
        for (const channel of channels) {
          array.push(channel.name);
          message.channel.send(channel.name);
        }
      } catch (err) {
        console.log("Array error.");
        message.channel.send("An error occoured while getting the channels.");
        console.log(err);
      }

      return array;
    }
    getChannelIDs();
  },
};
