require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const { randomUUID } = require("crypto");
const { Server } = require("socket.io");
const { Client, GatewayIntentBits } = require("discord.js");

const { DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID } = process.env;
const port = Number(process.env.PORT || 3000);

if (!DISCORD_BOT_TOKEN || !DISCORD_CHANNEL_ID) {
  throw new Error("DISCORD_BOT_TOKEN və DISCORD_CHANNEL_ID .env faylında təyin edilməlidir.");
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT 1-65535 aralığında olmalıdır.");
}

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const discord = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let discordChannel;

app.use(express.static(path.join(__dirname, "public")));
app.get("/downloads/AverisClient-1.16.5.jar", (request, response) => {
  const clientJar = path.join(__dirname, "..", "build", "AverisClient-1.16.5.jar");
  response.download(clientJar, "AverisClient-1.16.5.jar", (error) => {
    if (!error) return;
    console.error("Client faylı göndərilmədi:", error);
    if (!response.headersSent) {
      response.sendStatus(error.code === "ENOENT" ? 404 : 500);
    }
  });
});

function createChatMessage({ id, username, content, createdAt, source }) {
  return {
    id,
    username,
    content,
    createdAt: createdAt.toISOString(),
    source
  };
}

function mapDiscordMessage(message) {
  const webPrefix = "[Averis Web] ";
  const body = message.content || "";
  const isWebMessage = body.startsWith(webPrefix);

  if (isWebMessage) {
    const separator = body.indexOf(": ", webPrefix.length);
    if (separator !== -1) {
      return createChatMessage({
        id: message.id,
        username: body.slice(webPrefix.length, separator),
        content: body.slice(separator + 2),
        createdAt: message.createdAt,
        source: "web"
      });
    }
  }

  return createChatMessage({
    id: message.id,
    username: message.author.username,
    content: body,
    createdAt: message.createdAt,
    source: "discord"
  });
}

discord.once("ready", async () => {
  try {
    const channel = await discord.channels.fetch(DISCORD_CHANNEL_ID);
    if (!channel || !channel.isTextBased() || !("messages" in channel)) {
      throw new Error("DISCORD_CHANNEL_ID mətn kanalı deyil və ya bot kanala daxil ola bilmir.");
    }
    discordChannel = channel;
    console.log(`Discord bağlantısı hazırdır: #${channel.name}`);
    io.emit("chat:status", { online: true });
  } catch (error) {
    console.error("Discord kanalı açıla bilmədi:", error);
    process.exitCode = 1;
    if (server.listening) server.close();
    await discord.destroy();
  }
});

discord.on("error", (error) => {
  console.error("Discord bağlantı xətası:", error);
});

discord.on("messageCreate", (message) => {
  if (message.channelId !== DISCORD_CHANNEL_ID || message.author.bot) {
    return;
  }

  io.emit("chat:message", mapDiscordMessage(message));
});

io.on("connection", (socket) => {
  socket.emit("chat:status", { online: Boolean(discordChannel) });

  socket.on("chat:history", async () => {
    if (!discordChannel) {
      socket.emit("chat:error", "Discord kanalı hələ hazır deyil.");
      return;
    }

    try {
      const recentMessages = await discordChannel.messages.fetch({ limit: 40 });
      const history = [...recentMessages.values()]
        .filter((message) => !message.author.bot || message.author.id === discord.user.id)
        .reverse()
        .map(mapDiscordMessage);
      socket.emit("chat:history", history);
    } catch (error) {
      console.error("Discord chat tarixçəsi yüklənmədi:", error);
      socket.emit("chat:error", "Mesaj tarixçəsini yükləmək mümkün olmadı.");
    }
  });

  let lastMessageAt = 0;
  socket.on("chat:send", async (payload) => {
    if (!discordChannel) {
      socket.emit("chat:error", "Discord kanalı hazır deyil. Bir az sonra yenidən yoxla.");
      return;
    }

    const username = typeof payload?.username === "string"
      ? payload.username.replace(/[\r\n@]/g, "").trim().slice(0, 24)
      : "";
    const content = typeof payload?.content === "string"
      ? payload.content.trim().slice(0, 500)
      : "";

    if (!username || !content) {
      socket.emit("chat:error", "Adını və mesajını daxil et.");
      return;
    }

    const now = Date.now();
    if (now - lastMessageAt < 1500) {
      socket.emit("chat:error", "Mesaj göndərməzdən əvvəl bir az gözlə.");
      return;
    }
    lastMessageAt = now;

    try {
      const discordMessage = await discordChannel.send({
        content: `[Averis Web] ${username}: ${content}`,
        allowedMentions: { parse: [] }
      });
      io.emit("chat:message", createChatMessage({
        id: discordMessage.id || randomUUID(),
        username,
        content,
        createdAt: new Date(),
        source: "web"
      }));
    } catch (error) {
      console.error("Mesaj Discord kanalına göndərilmədi:", error);
      socket.emit("chat:error", "Mesaj Discord-a göndərilmədi. Bot icazələrini yoxla.");
    }
  });
});

async function start() {
  await discord.login(DISCORD_BOT_TOKEN);
  server.listen(port, () => {
    console.log(`Averis saytı http://localhost:${port} ünvanında işləyir.`);
  });
}

start().catch((error) => {
  console.error("Server başlada bilmədi:", error);
  process.exitCode = 1;
});
