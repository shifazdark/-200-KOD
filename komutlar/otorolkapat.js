const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
let kanal = await db.fetch(`otok_${message.guild.id}`)  
let rol = await db.fetch(`otorol_${message.guild.id}`)   
let mesaj =  db.fetch(`otomesaj_${message.guild.id}`)  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  
  if(!kanal) return message.channel.send('<a:x:654818016717963291> Otorol Zaten Kapalı')

  db.delete(`otok_${message.guild.id}`)  
  db.delete(`otorol_${message.guild.id}`)   
  db.delete(`otomesaj_${message.guild.id}`)
 message.channel.send('<a:white_check_mark:654817759724699668> Otorol **'+message.guild.name+'** Sunucusunda Devre Dışı Bırakılmıştır.')


};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'otorol-kapat',
  description: 'taslak', 
  usage: 'otorolkapat'
};