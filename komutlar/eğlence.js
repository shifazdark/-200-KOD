const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
      const juke = new Discord.RichEmbed()
      .setColor('BLUE')
      .setAuthor(`Nemesis`, client.user.avatarURL) 
    .setDescription('**!yardımkomut  Komut ismi yazarak komutların ne işe yaradığını bulabilirsiniz.**')
      .setThumbnail(client.user.avatarURL)
      .addField('**:fire: **','`espri`,`eyaz`, `koş`, `karat`, `tokatat`, `lafsok`')
      .addField('**:fire: **','`çıkma-teklifi-et`,`avatar`, `aşkölçer`, `mcödül`,`zar-at`')
      .addField('**:fire: **','`gol-at`,`sansli-sayim`,`öp`')
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
    name: 'eğlence',
      category: 'eğlence',
      description: 'eğlence komutlarını gösteir.',
};