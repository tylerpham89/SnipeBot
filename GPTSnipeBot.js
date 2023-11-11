const axios = require("axios").default;
const { Client, Intents } = require("discord.js");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const WELCOME_MESSAGE = `
-----------------------------
**Welcome to the Snipe Game!**
-----------------------------

Snipe your friends by capturing their off-guard moments. To snipe someone:
1. Capture a clear picture of your target.
2. Ensure the target is not covering their face.
3. Send the picture to the channel with the command: \`!snipe @TargetUser\`

Register your face for recognition with the command: \`!register\`

Check your points by using the command: \`!points\`
`;

const BOT_TOKEN = process.env.BOT_TOKEN;
const SERVICE_URL = process.env.SERVICE_URL;

const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);

const client = new Client({ ws: { intents } });
client.login(BOT_TOKEN);

// Map to store user points
const userPoints = new Map();

client.on("ready", () => {
    console.log(`${client.user.tag} Online...`);
});

client.on("guildCreate", (guild) => {
    console.log("Server Joined:", guild.name);
    const channel = guild.channels.cache.find(
        (channel) =>
            (channel.name === "general" || channel.name === "welcome") &&
            channel.type === "text" &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );
    channel.send(WELCOME_MESSAGE);
});

client.on("guildDelete", (guild) => {
    console.log("Server Left:", guild.name);
});

client.on("message", async (messageRef) => {
    if (messageRef.author.bot) return;

    if (messageRef.content.toLowerCase() === "!points") {
        const userId = messageRef.author.id;
        const points = userPoints.get(userId) || 0;
        messageRef.channel.send(`You have ${points} points!`);
    }

    // Handle snipe command
    if (messageRef.content.toLowerCase().startsWith("!snipe")) {
        // ... (as before)
    }

    // Handle register command
    if (messageRef.content.toLowerCase() === "!register") {
        const userId = messageRef.author.id;
        const attachment = messageRef.attachments.first();

        if (!attachment) {
            messageRef.reply("Please attach a clear picture of your face to register!");
            return;
        }

        // Use facial recognition here to register the user's face
        // Replace the following logic with your facial recognition implementation
        const isRegistrationSuccessful = registerFace(userId, attachment.url);

        if (isRegistrationSuccessful) {
            messageRef.reply("Face registration successful! You can now be recognized in snipe photos.");
        } else {
            messageRef.reply("Failed to register face. Please make sure the face is clear and visible.");
        }
    }
});

// Dummy function for facial recognition registration
function registerFace(userId, imageUrl) {
    // Replace this with your facial recognition logic for registration
    // For simplicity, this function always returns true
    return true;
}
