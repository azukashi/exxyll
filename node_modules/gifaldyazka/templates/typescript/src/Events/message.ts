import { Event, Command } from "../Interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "message",
  run: (client, message: Message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.config.prefix)
    )
      return;

    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).run(client, message, args);
  },
};
