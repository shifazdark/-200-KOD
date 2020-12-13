const Discord = require('discord.js');
const db = require('quick.db')
const a = require('../ayarlar.json')

exports.run = async (bot, message,args) => {
  let logk = message.mentions.channels.first();
  let logkanal = db.fetch(`klog_${message.guild.id}`)
  let nmsrol = message.mentions.roles.first()
  let nmsroldb = await db.fetch(`nmsrol${message.guild.id}`)
  let nmsroldb2 = await db.fetch(`nmsrol2${message.guild.id}`)
  
  const nms1 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Kanal Koruma Rolü Sıfırlandı!`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms2 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`KanalKoruma-Log Seçilmemiş!`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms3 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Alınacak Rol Zaten <@&${nmsroldb}> olarak ayarlanmış.`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms7 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Alınacak 2. Rol Zaten <@&${nmsroldb2}> olarak ayarlanmış.`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms4 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Alınacak Rol ${nmsrol} olarak ayarlandı.`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms8 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Alınacak 2. Rol ${nmsrol} olarak ayarlandı.`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms5 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Rol Seçilmemiş`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms6 = new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`Bir Rol Etiketlemelisin`)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
  const nms9= new Discord.RichEmbed()
  .setColor("#00ff88")
  .setDescription(`** ** \n**Ayarmak İçin:** \`${a.prefix}kanalkoruma-rol @rol\`\n\n **2. Rolü Ayarlamak İçin:** \`${a.prefix}kanalkoruma-rol 2 @rol\`\n\n **Sıfırlamak İçin:** \`${a.prefix}kanalkoruma-rol sıfırla\``)
  .setFooter(`Nemesis| Kanal Koruma Sistemi.`, bot.user.avatarURL)
 
  
  
  if(!args[0]) return message.channel.send(nms9)
  
  if (args[0] === "sıfırla") {
    
    
    
    if (!nmsroldb) return message.channel.send(nms5);
    if (!logkanal) return message.channel.send(nms2);
    
    
    db.delete(`nmsrol${message.guild.id}`)
    db.delete(`nmsrol2${message.guild.id}`)
    message.channel.send(nms1);
    
    return
  }

  if (args[0] === "2") {
    
    
    if(!logkanal) return message.channel.send(nms2);
    if(!nmsrol) return message.channel.send(nms6)
    if (nmsroldb2 === nmsrol.id) return message.channel.send(nms7);
    
    db.set(`nmsrol2${message.guild.id}`, nmsrol.id)
    message.channel.send(nms8);
    
    return
    
  }

    
    if(!logkanal) return message.channel.send(nms2);
    if(!nmsrol) return message.channel.send(nms6)
    if (nmsroldb === nmsrol.id) return message.channel.send(nms3);
    
    db.set(`nmsrol${message.guild.id}`, nmsrol.id)
    message.channel.send(nms4);
  }

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['krol'],
  permLevel: 4
};

module.exports.help = {
  name: 'kanalkoruma-rol',
  description: 'kanal koruma rolunu ayarlarsınız.',
  usage: 'kanalkoruma-rol'
};

