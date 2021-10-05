const Levels = require('discord-xp');
const dotenv = require('dotenv');
dotenv.config();

Levels.setURL(process.env.MONGO);
