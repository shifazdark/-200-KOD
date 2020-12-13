const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  if (!db.has(`premod_${message.guild.id}`) == true) {
    
      
      return message.channel.send(" Bu sunucuda **premium mod aktif değil**, bu sebepten dolayı premium sunucu kodlarını kullanamazsınız.")

    
  } else {
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

  const db = require('quick.db');
  

  
    let args = message.content.split(' ').slice(1);
    const secenekler = args.slice(0).join(' ');

    if(secenekler.length < 1)  return message.reply("Lütfen aç yada kapat yazınız.");
    //if(secenekler === "aç" || "kapat") return message.channel.send(errembed);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off")  return message.reply()

    if (secenekler === "aç" || secenekler === "on") {
        
    var i = db.set(`ksistem_${message.guild.id}`, "acik")
    
        message.channel.send(("!", "") + `${i.replace("acik", "Kayıt Sistemi Komutları Artık Kullanılabilir.")}`)
    
 
    };

    if (secenekler === "kapat") {
    
    db.delete(`ksistem_${message.guild.id}`)
    
        message.channel.send("Kayıt Sistemi Kapatıldı Artık Komutlarıda Kullanılamaz.")
    
    }
  }
    };

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['kayıt-sistemi'],
        permLevel: `Yeterli yetki yok`
      };
      
    exports.help = {
        name: 'kayıtsistemi',
        description: 'kayıt sistemini açar veya kapatırsınız.',
        usage: 'kayıtsistemi <aç/kapat>',
    };