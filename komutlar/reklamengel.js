const Discord = require('discord.js');
const fs = require('fs');
let reklam = JSON.parse(fs.readFileSync("./Jsonlar/reklam.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
            if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;

	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	var errembed = new Discord.RichEmbed()
	.setColor("RANDOM")
	.setDescription(`Yanlış Kullanım!`)
	.addField(`Doğru Kullanım:`, `${ayarlar.prefix}reklam-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply("reklam Engelleme Açmak İçin `!reklam-engelle aç` kapatmak için `!reklam-engelle kapat`").then(m => m.delete(10000));

    message.delete();

			if (secenekler === "aç") {
		     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('reklam Engel Başarıyla Açıldı! `Üyeleri Yasakla` Yetkisine Sahip Olanların reklamı Engellenmicektir.').setColor("RANDOM"));
		reklam[message.guild.id] = {
			reklam: "acik"
		  };

		  fs.writeFile("./jsonlar/reklam.json", JSON.stringify(reklam), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
	     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Reklam Filtresi Başarıyla Kapatıldı.').setColor("RANDOM"));
		reklam[message.guild.id] = {
			reklam: "kapali"
		  };

		fs.writeFile("./jsonlar/reklam.json", JSON.stringify(reklam), (err) => {
			if (err) console.log(err)
		  });
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['reklamengel','reklam-engel'],
		permLevel: 3
	  };

	  exports.help = {
		name: 'reklamengel',
		description: 'Reklam engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'reklamengell <aç> veya <kapat>'
	  };