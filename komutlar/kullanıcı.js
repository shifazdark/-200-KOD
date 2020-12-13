const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
      const juke = new Discord.RichEmbed()
      .setColor('BLUE')
      .setAuthor(`Kullanıcı`, client.user.avatarURL) 
    .setDescription('**!yardımkomut  Komut ismi yazarak komutların ne işe yaradığını bulabilirsiniz.**')
      .setThumbnail(client.user.avatarURL)
      .addField('**:busts_in_silhouette: **','`havadurumu`, `steamfiyat` ')
      .addField('**:busts_in_silhouette: **','`sunucubilgi`,`sunucuresmi`,`kullanıcıbilgim`,`yetkilerim` ')
       .setFooter(``, client.user.avatarURL)
      .setTimestamp()
    message.channel.send(juke).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'kullanıcı',
      usage: 'kullanıcı',
      description: 'Kullanıcı komutlarını gösteir.',
};