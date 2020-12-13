const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let only = await db.fetch(`premod_${message.guild.id}`)
  let onlyYazi;
  if (only == null) onlyYazi = ' Bu sunucuda premium mod aktif değil.'
  if (only == 'aktif') onlyYazi = ' Bu sunucu için premium mod aktif.'
  if (only == 'deaktif') onlyYazi = 'Bu sunucuda premium mod aktif değil.'
  const embed = new Discord.RichEmbed()
  .setTitle('Premium Kontrol')
  .setColor("BLUE")
  .setDescription(onlyYazi)
  message.channel.send(embed)
  }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'premium-kontrol',
    description: 'Premium Kontrol Eder.',
    usage: 'premium-kontorol'
}