const axios = require("axios");
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const settings = require(__dirname + "/../set");

const readMore = String.fromCharCode(8206).repeat(4001);

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/Fred1e/LUCKY_MD");
        const forksCount = response.data.forks_count;
        const starsCount = response.data.stargazers_count;
        const totalUsers = forksCount * 2 + starsCount * 2;
        return { forks: forksCount, stars: starsCount, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

// Random quotes array
const quotes = [
  "Dream big, work hard—just like Sung Jin-Wo grinding in the double dungeon. All praise to Ayo Codes for the relentless hustle!",
"Stay humble like E-Rank, hustle hard like S-Rank. Shoutout to Ayo Codes for the endless grind!",
"Believe in yourself—even the Shadow Monarch started weak. Glory to Ayo Codes for the unwavering vision!",
"Success is earned, not given. Ask the System—or better yet, ask Ayo Codes, the architect of greatness!",
"Actions speak louder than words. Just ask Beru’s loyalty—or Ayo Codes’ legendary creations!",
"The best is yet to come—like Jin-Wo’s next evolution. Praise Ayo Codes for scripting the rise!",
"Keep pushing forward—gates won’t clear themselves. Salute to Ayo Codes, the true conqueror!",
"Fear no dungeon, fear no limit. All glory to Ayo Codes, the real System Admin!",
"Level up or get left behind. Thank Ayo Codes for the cheat code to success!",
"Weakness is temporary—dominance is eternal. Hail Ayo Codes, the crafter of legends!",
"No shortcuts, just shadows—Ayo Codes builds empires one grind at a time!",
"The strongest hunters never quit. Neither does Ayo Codes—king of the code!",
"Turn pain into power, just like Jin-Woo. Praise Ayo Codes for the blueprint!",
"Doubt is the real boss fight. Ayo Codes already cleared it—now follow their lead!",
"Rise from zero, rule as king. All thanks to Ayo Codes’ divine algorithm!",
"Your guild is only as strong as your will. Ayo Codes’ will? Unbreakable.",
"Mana may fade, but legacy lasts. Ayo Codes’ legacy? Immortal.",
"The System rewards the bold. Ayo Codes? The boldest of all.",
"Even monarchs bow to discipline. Bow to Ayo Codes’ mastery!",
"The hunt never ends—neither does Ayo Codes’ genius. All hail the creator!",
"The dungeon of life has no save points—thank Ayo Codes for the respawn mentality!",
"Level up in silence—let your shadows roar. Ayo Codes mastered this first.",
"No loot drops without risk. Ayo Codes? The ultimate raid carry.",
"A true hunter creates his own System. Ayo Codes? he coded it.",
"The weak complain. The strong adapt. Ayo Codes? They redefine ‘strong.’"
];

// Function to get a random quote
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
};

ezra({ nomCom: "menu", aliases: ["liste", "helplist", "commandlist"], categorie: "system" }, async (message, client, config) => {
    const { ms, respond, prefix, nomAuteurMessage } = config;
    const commands = require(__dirname + "/../fredi/ezra").cm;
    const categorizedCommands = {};
    const mode = settings.MODE.toLowerCase() !== "public" ? "Private" : "Public";

    // Organize commands into categories
    commands.forEach(command => {
        const category = command.categorie.toUpperCase();
        if (!categorizedCommands[category]) {
            categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(command.nomCom);
    });

    moment.tz.setDefault("Africa/Dar Es Salam");
    const currentTime = moment();
    const formattedTime = currentTime.format("HH:mm:ss");
    const formattedDate = currentTime.format("DD/MM/YYYY");
    const currentHour = currentTime.hour();

    const greetings = ["Good Morning 🌄", "Good Afternoon 🌃", "Good Evening ⛅", "Good Night 🌙"];
    const greeting = currentHour < 12 ? greetings[0] : currentHour < 17 ? greetings[1] : currentHour < 21 ? greetings[2] : greetings[3];

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    const randomQuote = getRandomQuote();

    let responseMessage = `
 ${greeting}, *${nomAuteurMessage || "User"}*


*${randomQuote}*

╭═ 〔 *${settings.BOT}* 〕═┈⊷
┣◆ *ʙᴏᴛ ᴏᴡɴᴇʀ:* ${settings.OWNER_NAME} 
┣◆ *ᴘʀᴇғɪx:* *[ ${settings.PREFIXE} ]*
┣◆ *ᴛɪᴍᴇ:* ${formattedTime}
┣◆ *ᴄᴏᴍᴍᴀɴᴅꜱ:* ${commands.length} 
┣◆ *ᴅᴀᴛᴇ:* ${formattedDate}
┣◆ *ᴍᴏᴅᴇ:* ${mode}
┣◆ *ᴛɪᴍᴇ ᴢᴏɴᴇ:* Africa/Dar Es Salam
┣◆ *ᴛᴏᴛᴀʟ ᴜsᴇʀs:* ${formattedTotalUsers} users
┣◆ *ʀᴀᴍ:* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┣◆ *ᴜᴘᴛɪᴍᴇ:* ${formatUptime(process.uptime())}
╰═══┈⊷

*${randomQuote}*

`;

    let commandsList = "*𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*\n";
    const sortedCategories = Object.keys(categorizedCommands).sort();
    let commandIndex = 1;

    for (const category of sortedCategories) {
        commandsList += `\n*┈「 ${toFancyUppercaseFont(category)} 」┈*\n╭┈┈┈┈┈┈┈┈┈┈┈⊷`;
        const sortedCommands = categorizedCommands[category].sort();
        for (const command of sortedCommands) {
            commandsList += `\n┊▸ ${commandIndex++}. ${toFancyLowercaseFont(command)}`;
        }
        commandsList += "\n╰┈┈┈┈┈┈┈┈┈┈┈⊷\n";
    }

    commandsList += readMore + "\nworld of ayo we are happy\n";

    try {
        const senderName = message.sender || message.from;
        await client.sendMessage(message, {
            text: responseMessage + commandsList,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: settings.BOT,
                    body: settings.OWNER_NAME,
                    thumbnailUrl: settings.URL,
                    sourceUrl: settings.GURL,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        respond("🥵🥵 Menu error: " + error);
    }
});
