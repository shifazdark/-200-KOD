const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
    
var SAHİP = message.guild.members.find("id", "636666776972820490","444919402543054848","611624362277077012","639430589493018644");
if(message.member !== SAHİP)return message.channel.send("Bu komutu kullanmak için uygun izniniz yok.");
if(SAHİP) {
      let args = message.content.split(' ').slice(1).join(" ");
    if (!args) return message.channel.send(" Lütfen oynuyor `yazısını` yazınız.")
client.user.setActivity(args);
message.channel.send('Durum '+args+' olarak değiştirildi.');
}

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'oynuyor',
  description: '',
  usage: '!oynuyor'
};