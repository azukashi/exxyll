const prefixSchema = require("../models/prefix.js");

module.exports = (client) => {
  client.on("guildDelete", async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        prefixSchema
          .findOneAndDelete({ Guild: guild.id })
          .then(console.log(`Deleted data.`));
      }
    });
  });
};
