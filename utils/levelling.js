const Levels = require("discord-xp");
const { mongooseConnectionString } = require("../config.json");
Levels.setURL(mongooseConnectionString);
