const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'changelog',
    description: 'Show Change Log at v2.0.0',
    aliases: ['updatelog'],
    emoji: '📜',
    userperm: ["SEND_MESSAGES"],
    botperm: ["SEND_MESSAGES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
          .setTitle(`📜 Updates Changelog`)
          .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
          .setDescription(`Did you know? Exxyll has been updated to v2.0.0 Since 27 Sep, 2021!\nLet's [Read the Changelog](https://github.com/gifaldyazkaa/exxyll-origin/tree/master/docs/changelog.md) and Read what's happening since it's updated to v2.0.0!\n\nThanks to using my bots! Hope you enjoyed the new version.\n~[Falcxxdev#8648](https://discord.com/users/788260234409672754)`)
          .setColor('BLUE')
          .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}