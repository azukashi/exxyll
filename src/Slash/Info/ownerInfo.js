const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownerinfo',
    description: 'Returns Information about Owner',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const owner = client.users.cache.get('446197585376575489');
        const embed1 = new MessageEmbed()
            .setTitle(`👑 Owner Info`)
            .setThumbnail(owner.displayAvatarURL({ dynamic: true }))
            .addField(`Name`, `Azukashiic`)
            .addField(`Discord Handle`, `@azukashiic`)
            .addField(`Working on`, `Bot Development, Website Development, Feature Development`)
            .addField(
                `Social Media`,
                `[Website](https://hoshiro.space) | [GitHub](https://github.com/azukashi) | [Twitter](https://twitter.com/azukashiic)`
            )
            // .addField(`Buy me a Coffee`, `[Buy me a Coffee Here](https://buymeacoffee.com/gifaldyazkaa)`)
            .setColor('PURPLE');

        interaction.followUp({ embeds: [embed1] });
    },
};
