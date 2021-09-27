const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'remind',
  description: 'Reminds you about what you will do in specific times',
  aliases: ['remindme'],
  emoji: '⌛',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let reminder = args.slice(1).join(' ');
    let time = args[0];

    if (!time)
      return message.reply({ content: 'Please set a time to reminder!' });
    if (!reminder)
      return message.reply({ content: 'Please state a reminder!' });
    if (reminder.length > 200)
      return message.reply({
        content: 'Max Reminder Length Is 500 Characters',
      });

    const setreminderembed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle('Reminder Set!')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Successfully set <@${message.author.id}> a reminder!`)
      .addField('⌛ Reminded In ⌛', `\`${time}\``)
      .addField('👥 Reminder 👥', `${reminder}`)
      .setTimestamp();

    message.channel.send({ embeds: [setreminderembed] });

    // Pake arrow function () => {} biar keren :v
    setTimeout(async () => {
      message.reply({ content: `<@${message.author.id}> Reminder Timeout!` });

      const alertembed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Reminder Alert!')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
          `Hey, <@${message.author.id}>! Your reminder is timeout!`
        )
        .addField('⌛ Reminder ⌛', `\`${reminder}\``)
        .setTimestamp();

      message.channel.send({ embeds: [alertembed] });
    }, ms(time));
  },
};
