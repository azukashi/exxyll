<h1 align="center">Discord JS - JavaScript Template</h1>
JavaScript Template to Code a Discord Bot with Discord JS More Easier! With Command Handler Included.

# How to use

- Install required dependecies by `npm install` or `yarn add ascii-table`.
- Change `config.json` Configuration to Your Discord Bot Token, Prefix, and Owner ID.
- Easily Run by `npm start` or `yarn start`
- Now, You should look your Discord Bot is Online!

`* As default, This template includes 2 commands. Help and Ping`

# Getting Started

New with Discord Bots? No problem! Here is some guides to get you started.

## Configuration

If you done setup a Project by this CLI, You should configure `config.json` file.
Change some stuff to your own (Bot Token, Bot Prefix, Owner ID).

If you done, try to run with `npm start`. You should see your bot is online. If your `config.json` is valid!

## Adding Commands

You want to adding more commands? Yes you can.

- Go to `/commands/info` directory and create a new file (or creating new folder outside `/info`).
- Create a new file `something-new.js` in that folder.
- Now, You just copy this to your new file.

  ```js
  const { Client, Message, MessageEmbed } = require("discord.js");

  module.exports = {
    name: "test", // Command name
    aliases: ["test-command"], // Command aliases
    description: "New Test Command", // Command description
    run: (client, message, args) => {
      message.channel.send("Hello World! This is Test Commands."); // Send a message to channel
    },
  };
  ```

- You can change `name`, `aliases`, `description` as you want. And it's content.
- Run again by `npm start`.
- You should see your new command is available at the table, and it says `OK` (at the console).
- Now, test it on discord. It should works!

## Adding new Event Listener

You want to add new Event Listener? Yes you can.

- Go to `/events` folder and make one new file like `onKick.js`.
- All events requires `client` from `../index.js`. Require it at the top line.
  ```js
  const client = require("../index.js");
  ```
- Now you can add your event listener by
  ```js
  client.on("guildDelete", async () => {
    console.log("Guild Deleted");
  });
  ```

## Adding Database Models, etc

If you know with Discord.js, MongoDB, etc. You can add new folder like `models/`, `utils`, `Collection`, or something and get connect to MongoDB.

# Install CLI

Want to make a generated JavaScript / TypeScript Template for Discord Bot Looks Like This? Just easily install My CLI by running

```bash
> npm install -g gifaldyazka
```

While you done installing this CLI, Just run `gifaldyazka` in your Bash / Command Prompt. It should ask you what language you want. JavaScript or TypeScript.
