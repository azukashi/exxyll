const { Client, Message, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../Models/Prefix');

module.exports = {
    name: 'set-prefix',
    description: 'Set Custom Prefixes',
    emoji: '➕',
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const res = await args.join(' ');
        if (!res) return message.reply('Please specify a prefix to change to.');
        prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                prefixSchema.findOneAndDelete({ Guild: message.guild.id });
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                });
                data.save();
                message.channel.send({ content: `Prefix has been updated to **${res}**` });
            } else {
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res,
                });
                data.save();
                message.channel.send({ content: `Custom prefix in this server is now set to **${res}**` });
            }
        });
    },
};
