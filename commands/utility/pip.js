const { Client, Message, MessageEmbed } = require("discord.js");
const { create } = require("sourcebin");
const fetch = require("node-fetch");

module.exports = {
  name: "pip",
  aliases: ["python-pip"],
  usage: "package-name",
  description: "Search PIP Packages",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const argument = args.join(" ");
    if (!argument)
      return message.lineReply("Please specify a package name to search!");
    try {
      await fetch(`https://pypi.org/pypi/${argument}/json`)
        .then((res) => res.json())
        .then(async (data) => {
          if (!data) return message.lineReply(`Invalid pip.`);
          const msg = await message.lineReply(`Fetching...`);
          create(
            [
              {
                name: `Pip!`,
                content: data.info.description,
                language: "python",
              },
            ],
            {
              title: data.info.name,
              description: "Pip requested by " + message.author.tag,
            }
          ).then((bin) => {
            return message
              .lineReplyNoMention(
                new MessageEmbed()
                  .setAuthor(
                    data.info.name,
                    "https://pbs.twimg.com/profile_images/909757546063323137/-RIWgodF_400x400.jpg"
                  )
                  .setColor(`#7ED3F2`)
                  .addField(`Name`, data.info.name, true)
                  .addField(`Author`, data.info.author, true)
                  .addField(
                    `Package Link`,
                    `[${data.info.name}](${data.info.package_url})`,
                    true
                  )
                  .addField(
                    `Home Page`,
                    `${`[Click Here](${data.info.home_page})` || "No homepage"}`
                  )
                  .addField(`Required Python`, data.info.requires_python, true)
                  .addField(`Summary`, data.info.summary, true)
                  .addField(
                    `Docs`,
                    `${
                      `[Click Here](${data.info.project_urls.Documentation})` ||
                      "No docs"
                    }`,
                    true
                  )
                  .addField(`Description`, `[Click Here](${bin.url})`)
              )
              .then(() => message.delete());
          });
        });
    } catch (e) {
      return message.lineReply(`Invalid pip.`);
    }
  },
};
