const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!db.has(`premod_${message.guild.id}`) == true) {
    
      
      return message.channel.send(" Bu sunucuda **premium mod aktif değil**, bu sebepten dolayı premium sunucu kodlarını kullanamazsınız.")

    
  } else {
const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setTitle('Kayıt Sistemi')
.setTimestamp()
.setDescription('!yardımkomut komutismi yazarak komutların ne işe yaradığını bulabilirsiniz')
.addField('!kayıtsistemi','kayıt sistemini açar veya kapatırsınız..')
.addField('!kayıtkanal','kayıt kanalını ayarlarsınız kayıt-ol komutu sadece orda çalışır.')
.addField('!kayıt-rol-ayarla','kayıt-ol komutunu kullanınıca verilecek rol')
.addField('!kayıt-ol','kayıt olma komutu kayıtsistemi açık değilken kullanılmaz.')
.setFooter('2019 Nemesis Kayıt Sistemi.')
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'kayıtyardım',
  description: 'kayıt komutlarını gösterir.',
  usage: 'kayıtyardım'
};