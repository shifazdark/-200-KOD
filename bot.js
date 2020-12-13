//consts (for glitch)
// GEREKLİ YERLER

const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
// GEREKLİ YERLER
// -------------------------------------------------------------





const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');

const db = require('quick.db');
client.queue = new Map()
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

  client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};







client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


///bankoruma
client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let yashinubanlimit = await db.fetch(`banlimit_${guild.id}`)
  let yashinukullanıcıban = await db.fetch(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
  
    if(yashinubanlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        if(entry.executor.bot) return
        await db.add(`banlimitkullanici_${guild.id}_${entry.executor.id}`, 1)
        //client.channels.get("LOG KANAL ID").send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${yashinukullanıcıban}`)
        //LOG Kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
        if(yashinukullanıcıban >= yashinubanlimit) {
          client.channels.get("LOG KANAL ID").send(`${entry.executor} kişisi ban limiti doldurdu ve rolü alındı!`)
          // LOG kanal varsa yukarıdaki satıra gerekli yere ID girip // kaldırabilirsiniz.
          try {
            guild.member(entry.executor).roles.filter(a => a.hasPermission('BAN_MEMBERS')).forEach(x => guild.member(entry.executor).removeRole(x.id))
            guild.owner.user.send(`Sunucundan bir yetkili ban limitine ulaştı ve ban yetkisi olan rolleri alındı! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
          } catch(err) { }
          db.delete(`banlimitkullanici_${guild.id}_${entry.executor.id}`)
        }
      }
    }
})

////güvenlik
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let kanal = client.channels.get(db.fetch(`güvenlik_${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/612020865684602904/631235167268241449/gvnlk-spheli.png')
    const resim2 = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627427731407241226/gvnlk-gvnli.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1

       const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/597433546868654106/627425996454232064/gvnlk-arka.png');
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

///////////////////////anti raid

client.on("guildMemberAdd", async member => {
if (db.has(`botkoruma_${member.guild.id}`) === false) return;
if (member.user.bot === false) return;
if (db.has(`botİzinli_${member.id}`) === true) return;

member.kick(member, `Bot koruması aktif!`)

member.guild.owner.send(`Sunucunuza bir bot eklendi ve sunucudan otomatik olarak atıldı, sunucuya eklenmesini onaylıyor iseniz \`!giriş-izni ${member.id}\``)
})

client.on("message", msg => {
  let küfürEngel = db.fetch(`ke_${msg.guild.id}`)
  if (!msg.guild) return
  if (küfürEngel === 'kapali') return
    if (küfürEngel === 'acik') {
   
    var request = require('request');
request(`https://endlesslove-apii.glitch.me/kufur`, function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var veri = JSON.parse(body);
      if (veri.kelimeler.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed().setColor('#000000').setDescription('Bu Sunucudu Küfür-engelleme filitresi açık. küfür edemezsin!!')).then(message => message.delete(3000));
    
    }}
    }
})}});
client.on("message", msg => {
  let reklam = db.fetch(`ke_${msg.guild.id}`)
  if (!msg.guild) return
  if (reklam === 'kapali') return
    if (reklam === 'acik') {
   
    var request = require('request');
request(`https://endlesslove-apii.glitch.me/reklam`, function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) {
        var veri = JSON.parse(body);
      if (veri.kelimeler.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed().setColor('#000000').setDescription('bu sunucuda reklam engelleme filitresi açık. reklam yapamazsın')).then(message => message.delete(3000));
    
    }}
    }
})}});
////sayaç
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`sskanal_${member.guild.id}`)
   if(!kanal) return
  let sayaç = await db.fetch(`ssayı_${member.guild.id}`)
  let hgmsj = await db.fetch(`sayachgmsj_${member.guild.id}`)
  let bbmsj = await db.fetch(`sayacbbmsj_${member.guild.id}`)
  let sonuç = sayaç - member.guild.memberCount
  ///....
  
 
  ///....
   if(!hgmsj) {
client.channels.get(kanal).send(':loudspeaker: :inbox_tray: Kullanıcı Katıldı! `'+sayaç+'` Kişi Olmamıza `'+sonuç+'` Kişi Kaldı `'+member.guild.memberCount+'` Kişiyiz! `'+member.user.username+'`')
   }


  if(hgmsj) {
 var mesajs = await db.fetch(`sayachgmsj_${member.guild.id}`).replace("-uye-", `${member.user.tag}`).replace("-server-",  `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-",  `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-",  `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)         
  
 client.channels.get(kanal.id).send(mesajs) 
 return
 }
  
  })
client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`skanal_${member.guild.id}`)
  let sayaç = await db.fetch(`ssayı_${member.guild.id}`)
  let hgmsj = await db.fetch(`sayachgmsj_${member.guild.id}`)
  let bbmsj = await db.fetch(`sayacbbmsj_${member.guild.id}`)
  let sonuç = sayaç - member.guild.memberCount
  ///....
  
  if(!kanal) return
  if(!sayaç) return
  if(member.bot) return
  ///....
  
  if(!bbmsj) {
    client.channels.get(kanal).send(':loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. `'+sayaç+'` Kişi Olmamıza `'+sonuç+'` Kişi Kaldı `'+member.guild.memberCount+'` Kişiyiz!  `'+member.user.username+'`')
  return
  }
  
  if(bbmsj) {
 var mesajs = await db.fetch(`sayacbbmsj_${member.guild.id}`).replace("-uye-", `${member.user.tag}`).replace("-server-",  `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-",  `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-",  `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)         
  
 client.channels.get(kanal).send(mesajs) 
 }
  
  
  
  })









/// LEVEL BOT.JS ///

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
  
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );

  
      }
 
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Seviyesi **" +
                rollvl +
                "** e ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }


});
////afk
client.on('message', async message => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
    if (afkkullanıcı) return message.channel.send(`${message.author}\`${kullanıcı.tag}\` şu anda AFK. Sebep : \`${sebep}\``)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});

client.on("message", async msg => {
const db = require('quick.db');   
    let i = db.fetch(`otobsilicia_${msg.channel.id+msg.guild.id}`)
      if (i == undefined) {           
          }
        if (i == 'acik') {   
              let kanal = db.fetch(`otobsilici_${msg.channel.id+msg.guild.id}`)

          if (msg.channel.id != kanal.id) {
  if (msg.content.length > 0) {

    if(msg.author.bot === true){
      msg.delete(3000)
    }
  }
          }
        }
       
  
  })




/////özel komut
client.on('message', async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = 'Burayı silme yoksa hatalı olur'
  else ozelkomutYazi = ''+ ozelkomut +''
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Burayı silme yoksa hatalı olur'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

/////////////////////////////////////////////////////////////davet

const invites = {};


const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

  wait(1000);


  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});


client.on('guildMemberAdd', member => {
  
  
 
  member.guild.fetchInvites().then(guildInvites => {
    
    if (db.has(`dKanal_${member.guild.id}`) === false) return
    const channel = db.fetch(`dKanal_${member.guild.id}`).replace("<#", "").replace(">", "")
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

    const davetçi = client.users.get(invite.inviter.id);
     db.add(`davet_${invite.inviter.id + member.guild.id}`,1)
let bal  = db.fetch(`davet_${invite.inviter.id + member.guild.id}`)
   member.guild.channels.get(channel).send(`:inbox_tray: ** <@${member.id}> Joined**; İnvited by **${davetçi.tag}** (`+'**'+bal+'** invites)')
  })


});
client.on("guildMemberRemove", async member => {

    member.guild.fetchInvites().then(guildInvites => {

      const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);

       db.subtract(`davet_${invite.inviter.id + member.guild.id}`,1)
    })
})

////kanalkoruma
client.on("channelDelete", async function(channel) {
  
  let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
  let nmsz = await db.fetch(`kanalkoruma${channel.guild.id}`)
  let nmsk = await db.fetch(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
  let nmsrol = await db.fetch(`nmsrol${channel.guild.id}`)
  let nmsrol2 = await db.fetch(`nmsrol2${channel.guild.id}`)
  let nmsg = await db.fetch(`klog${channel.guild.id}`)
  let nmsh = channel.guild.channels.find('id', nmsg)
  let nmsl = channel.member;
  if (nmsz == 'Kapalı') return;
  if (nmsz == 'Açık') {
    

    
      db.add(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`, 1)
    
      if (nmsk === null) {
        let nmsu = new Discord.RichEmbed()
                  .setTitle(`**Nemesis Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`Nemesis`)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede **Sildiği Kanal:** \`${channel.name}\` **Uyarı (1/3)**`)
      nmsh.send(nmsu)
        
      }
    if (nmsk === 1) {
      let nmsu = new Discord.RichEmbed()
                .setTitle(`**Nemesis Kanal Koruma Sistemi**`)
        .setColor("#00ff88")
        .setFooter(`Nemesis`)
        .setDescription(`<@${channel.guild.member(logs.entries.first().executor).id}> Kanal Koruma Sistemi Devrede. **Sildiği Kanal:** \`${channel.name}\` **Uyarı (2/3)**`)
     nmsh.send(nmsu)
      
    }
    if (nmsk === 2) {

      
    let logs = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'});
     
    if(logs.entries.first().executor.bot) return;
    if (logs.entries.first().executor.id === "497674151251804160") return;
          if (logs.entries.first().executor.id === "522138336056573972") return;
      
      
    channel.guild.member(logs.entries.first().executor).roles.filter(role => role.name !== "@everyone").array().forEach(role => {
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(nmsrol))
    channel.guild.member(logs.entries.first().executor).removeRole(channel.guild.roles.get(nmsrol2))
      
    })
  
      db.delete(`kanaluyari${channel.guild.member(logs.entries.first().executor).id}`)
      
    const silen = channel.guild.member(logs.entries.first().executor).user  
    const nmsj = new Discord.RichEmbed()
          .setTitle(`**Nemesis Kanal Koruma Sistemi**`)
          .setColor("#00ff88")
          .setDescription(`\`${channel.name}\` Adlı Kanal Silindi. Silen: \`${silen.tag}\`, Yetkileri Alındı! **Uyarı(3/3)**`)
          .setFooter(`Nemesis`)

    nmsh.send(nmsj)
      
    }
       
    }   
  
});
//////////normal sunucu kur


client.on('message', async message => {
const ms = require('ms');
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
let u = message.mentions.users.first() || message.author;
if (command === "normal-sunucu") {
if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
message.channel.awaitMessages(response => response.content === 'evet', {
max: 1,
time: 10000,
errors: ['time'],
})


.then((collected) => {
message.guild.createChannel('📜│Bilgilendirme.', 'category', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])

client.on('guildMemberAdd', async member => {
let rol = await db.fetch(`otorol_${member.guild.id}`)
db.fetch(`otorolkanal_${member.guild.id}`).then(async i => {
const channel = member.guild.channels.get(i)
if (!i) return;
let guild = member.guild;
let otorol = guild.roles.find('name', `${rol}`);
member.addRole(otorol);
channel.send(`**${member.user.tag}** adlı kullanıcıya \`${rol}\` adlı rol verildi!`)
})
});


message.guild.createChannel('📌│кυяαllαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('🍺│gıяıѕ-çıкıѕ', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('💥│ѕαчαç', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📊│αикεт', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));
message.guild.createChannel('📣│dυчυяυlαя', 'text', [{
id: message.guild.id,
deny: ['SEND_MESSAGES']
}])
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "📜│Bilgilendirme.")));

})
.then((collected) => {
message.guild.createChannel('⚡│Ana. Kanallar.', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`🌺│тαvsıyε`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🌙│σzlu-ѕσzlεя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`📷│fσтσğяαflαя`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`🤖│вσт-кσмυтlαяı`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));
message.guild.createChannel(`💭│gεиεl-ѕσнвεт`, 'text')
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "⚡│Ana. Kanallar.")));

message.guild.createChannel(`✯ │ŁØRÐ. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");

c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,

});
})

message.guild.createChannel('🏆 │ Yetkili Katı', 'category', [{
id: message.guild.id,
}]);

message.guild.createChannel(`💮│Kâptân. &`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
let role2 = message.guild.roles.find("name", "⍫ Kurucu 🌹");
let role3 = message.guild.roles.find("name", "⍫ Yonetici 🌹");
c.overwritePermissions(role, {
CONNECT: true,
});
c.overwritePermissions(role2, {
CONNECT: true,
});
c.overwritePermissions(role3, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. †`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})

message.guild.createChannel(`⭐│Sohbet. ††`, "voice")
.then(channel =>
channel.setParent(message.guild.channels.find(channel => channel.name === "🏆 │ Yetkili Katı")))
.then(c => {
let role = message.guild.roles.find("name", "@everyone");
c.overwritePermissions(role, {
CONNECT: true,
});
})


message.guild.createRole({
name: '✯ │ŁØRÐ. &',
color: 'ff0000',
permissions: [
"ADMINISTRATOR",
]
})


message.guild.createRole({
name: '💮│Kâptân. &',
color: '49ff00',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES",
"KICK_MEMBERS"
]
})

message.guild.createRole({
name: '🍁│Yønetici. &',
color: 'ffb400',
permissions: [
"MANAGE_GUILD",
"MANAGE_ROLES",
"MUTE_MEMBERS",
"DEAFEN_MEMBERS",
"MANAGE_MESSAGES",
"MANAGE_NICKNAMES"
]
})

message.guild.createRole({
name: '💐│Łâdiεs. &',
color: 'd300ff',
})

message.guild.createRole({
name: '🏆│Bøys. &',
color: 'ffffff',
})

message.guild.createRole({
name: '🛡 │Authorizεd. Bot. &',
color: '0006ff',
})

message.channel.send("⍫ Gerekli Roller Ve Odalar Kuruldu 🌹")

})

}
});
///////////////satış sunucu
client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let rrrsembed = new Discord.RichEmbed()
  let u = message.mentions.users.first() || message.author;
  if (command === "satış-sunucusu") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  message.channel.send(`Hizmet Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('|▬▬|ÖNEMLİ KANALLAR|▬▬|', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])    
 message.guild.createChannel('「📃」Discord-kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
 message.guild.createChannel('「🚪」gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
       message.guild.createChannel('「✅」sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」Duyuru-Panosu', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」Güncellemeler', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
             message.guild.createChannel('「💾」Hizmet-Alanlar', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));
            message.guild.createChannel('「📢」son-davet-takip"', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|")));

       }) 
       .then((collected) => {
        message.guild.createChannel('|▬▬|GENEL KANALLAR|▬▬|', 'category', [{
       id: message.guild.id,
     }]);

     message.guild.createChannel(`「💬」genel-sohbet`, 'text')
       .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
       .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

      message.guild.createChannel(`「💡」şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|")));

  message.guild.createChannel(`💬》Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|SES KANALLARI|▬▬|")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('|▬▬|HİZMET ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🔖》Java Hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🔖》Plugin Hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》Discord Bot hizmetleri`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
 message.guild.createChannel(`🎮》banner hizmetleri`, 'text')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
  message.guild.createChannel(`🎮》skript hizmetleri`, 'text')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
   message.guild.createChannel(`🎮》website hizmetleri`, 'text')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
    message.guild.createChannel(`🎮》ek hizmetleri`, 'text')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
     message.guild.createChannel(`🎮》harita hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))
      message.guild.createChannel(`🎮》tasarım hizmetleri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|HİZMET ODALARI|▬▬|")))

message.guild.createChannel('|▬▬|YÖNETİCİ ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
 
message.guild.createChannel(`👑》Yönetim`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))
message.guild.createChannel(`👑》Yönetim`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|YÖNETİCİ ODALARI|▬▬|")))


message.guild.createChannel('|▬▬|OYUN ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}]);
message.guild.createChannel(`🎮》Sayı-saymaca`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.createChannel(`🎮》Kelime-Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
message.guild.createChannel(`🎮》Matematik Türet`, 'text')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|")))
.then(channel =>
      
message.guild.createChannel('|▬▬|AFK ODALARI|▬▬|', 'category', [{
  id: message.guild.id,
}])); 
      
message.guild.createChannel(`💤》AFK`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "|▬▬|AFK ODALARI|▬▬|")))

      message.guild.createRole({
        name: '🌙 Kurucu 🌙',
        color: 'BLACK',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: '🔰 Yönetici 🔰',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: '🔧 Moderator 🔧',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: '💎Vip💎Üye💎',
        color: '#fff700',
      })
        
      message.guild.createRole({
        name: '🎮 Youtuber 🎮',
        color: '#00f9ff',
      })

      message.guild.createRole({
        name: '✔ Özel Üye ✔',
        color: '#ff0000',
      })

      message.guild.createRole({
        name: '⛳ Üye ⛳',
        color: '#00f9ff',
      
      })
      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
        permissions: [
            "ADMINISTRATOR"
    ]
      })

       message.channel.send("**Bot** gerekli odaları kurdu! Bu kodu editliyen kişi: <@422505993998696459>")
     
            })   
   
}
});
client.login(ayarlar.token);