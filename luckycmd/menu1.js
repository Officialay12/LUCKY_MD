const util = require('util');
const fs = require('fs-extra');
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

ezra({ nomCom: "menu1", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../fredi/ezra");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

let infoMsg = `
╭━═「 *${s.BOT}* 」═━❂
┃⊛╭────••••────➻
┃⊛│◆ 𝙾𝚠𝚗𝚎𝚛 : *${s.OWNER_NAME}* (Shadow Monarch)
┃⊛│◆ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ *${s.PREFIXE}* ] (Gate Key)
┃⊛│◆ 𝙼𝚘𝚍𝚎 : *${mode}* (${mode === 'public' ? 'S-Rank' : 'Dungeon Locked'})
┃⊛│◆ 𝚁𝚊𝚖  : *${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB* (Mana Core)
┃⊛│◆ 𝙳𝚊𝚝𝚎  : *${date}* (System Update)
┃⊛│◆ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : *${os.platform()}* (Hunter Association)
┃⊛│◆ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : *Ayo Codes* (Architect of Shadows)
┃⊛│◆ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : *${cm.length}* (Skills Unlocked)
┃⊛│◆ 𝚃𝚑𝚎𝚖𝚎 : *Sung-Ayo* (Awakened)
┃⊛└────••••────➻
╰─━━━━══──══━━━❂\n${readmore}
`;

    let menuMsg = `Sung 𝙼𝚍 𝙲𝚖𝚍`;
    
    for (const cat in coms) {
        menuMsg += `
❁━━〔 *${cat}* 〕━━❁
╭━━══••══━━••⊷
║◆┊ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║◆┊ ${s.PREFIXE}  *${cmd}*`;    
        }
        menuMsg += `
║◆┊
╰─━━═••═━━••⊷`;
    }
    
    menuMsg += `
> Made By AyO ᴛᴇᴄʜ\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "SUNG MD MENU LIST",
                    body: "Dont worry bro I have more tap to follow",
                    thumbnailUrl: "https://files.catbox.moe/amq9a2.png",
                    sourceUrl: "https://whatsapp.com/channel/0029VajdUjO7tkj0v3rZHw3q",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
