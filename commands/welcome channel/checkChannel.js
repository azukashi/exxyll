const Schema = require('../../models/welcomeChannel');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'check-channel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply(`This guild has no data stored.`);

            const channel = client.channels.cache.get(data.Channel);

            message.reply(`Welcome channel => ${channel}`);
        });
    },
};