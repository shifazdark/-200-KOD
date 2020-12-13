const Discord = require('discord.js');
const db = require('quick.db')
const a = require('../ayarlar.json')

exports.run = async (client, message,args) => {
let kanalkorumadb = await db.fetch(`kanalkoruma${message.guild.id}`)


const nmskoruma = new Discord.RichEmbed()
.setColor("#00ff88")
.setTitle(`**\`Kanal Koruma Bilgi;\`**`)
.setDescription(`** ** \n**Açmak İçin:** \`${a.prefix}\`kanalkoruma aç\n\n **Kapatmak İçin:** \`${a.prefix}kanalkoruma kapat\``)
.setFooter(`Nemesis | Kanal Koruma Sistemi.`, client.user.avatarURL)


if (!args[0]) return message.channel.send(nmskoruma);
if (args[0] == 'aç') {
if (kanalkorumadb === 'Açık') {
message.channel.send('Kanal Koruması Zaten Aktif!')
return;
} 
else {
    db.set(`kanalkoruma${message.guild.id}`, 'Açık')
     message.channel.send('Kanal Koruması başarıyla açıldı!')
}
  }
  else if (args[0] == 'kapat') {
    db.delete(`kanalkoruma${message.guild.id}`, 'Kapalı')
      message.channel.send('Kanal Koruması başarıyla kapatıldı!')
  }


}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

module.exports.help = {
  name: 'kanalkoruma',
  description: 'kanal silme korumasını açar veya kapatırsınız.',
  usage: 'kanalkoruma'
};


