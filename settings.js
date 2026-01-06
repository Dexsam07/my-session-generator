// 🚀 SHYAM-MD V2 - OFFICIAL BOT
// 👨‍💻 Created By: DEX-SHYAM
// 🔗 GitHub: https://github.com/Dexsam07
// 📱 WhatsApp: https://wa.me/917384287404

const fs = require('fs');
const chalk = require('chalk');
require('dotenv').config();

// --- OWNER & BOT DETAILS ---
global.SESSION_ID = process.env.SESSION_ID || ""; 
global.ownernomer = process.env.OWNER_NUMBER || "917384287404";
global.ownernumber = process.env.OWNER_NUMBER || '917384287404';
global.ownername = process.env.OWNER_NAME || 'Dex Shyam Chaudhari';
global.botname = process.env.BOT_NAME || 'SHYAM-MD V2';

// --- SOCIALS ---
global.ytname = "YouTube: DEX-SHYAM"; // Updated from Hanstz to Shyam
global.socibase = "GitHub: Dexsam07";
global.location = "India, West Bengal, Murshidabad";
global.link = 'https://chat.whatsapp.com/IOEbmfzOD6d9TCjdX5Fi3B';
global.wagc = "https://chat.whatsapp.com/IOEbmfzOD6d9TCjdX5Fi3B";

// --- STICKER DETAILS ---
global.packname = 'Sticker By';
global.author = 'SHYAM-MD V2';

// --- THEME & UI ---
global.themeemoji = '⚡';
global.wm = "SHYAM-MD";
global.prefa = ['.', '!', '#', '/']; // Professional Prefix

// --- AUTOMATION SETTINGS ---
global.autolikestatus = true;   // Auto React to Status
global.autoswview = true;       // Auto View Status
global.autobio = true;          // Auto Update Bio
global.autoTyping = false;      // Auto Typing
global.autoRecording = false;   // Auto Recording
global.autoread = false;        // Auto Read Message
global.autoreact = false;       // Auto React to Messages
global.welcome = false;         // Group Welcome

// --- REPLY MESSAGES ---
global.mess = {
    done: '✅ Done!',
    prem: '⭐ This feature is for Premium Users only.',
    admin: '🛡️ This feature is for Group Admins only.',
    botAdmin: '🤖 Bot must be Admin to use this command.',
    owner: '👑 This feature is only for my Owner (Dex Shyam).',
    group: '👨‍👩‍👧‍👦 This feature is for Groups only.',
    private: '👤 This feature is for Private Chats only.',
    wait: '⏳ Processing... Please wait.',    
    error: '❌ Internal Error! Please try again later.',
}

// --- MEDIA ---
// Make sure path correct ho, warna bot crash ho jayega
if (fs.existsSync('./ShyamTzMedia/thumb.jpg')) {
    global.thumb = fs.readFileSync('./ShyamTzMedia/thumb.jpg');
} else {
    global.thumb = fs.readFileSync('./media/logo.jpg'); // Fallback path
}

// --- AUTO UPDATE LOGIC ---
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.cyanBright(`[UPDATE] Settings file '${__filename}' has been updated!`))
    delete require.cache[file]
    require(file)
})
SCRIPT
