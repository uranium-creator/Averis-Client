const chatPanel = document.querySelector("#chat-panel");
const chatBackdrop = document.querySelector(".chat-backdrop");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatName = document.querySelector("#chat-name");
const chatInput = document.querySelector("#chat-input");
const chatError = document.querySelector("#chat-error");
const chatStatus = document.querySelector("#chat-status");
const chatStatusDot = document.querySelector("#chat-status-dot");
const languageToggle = document.querySelector("#language-toggle");

const translations = {
  en: {
    pageTitle: "Averis Client — Leave your mark.",
    metaDescription: "Averis Client — a free client for Minecraft 1.16.5. Download it and join the community.",
    navigation: "Main navigation",
    navFeatures: "Features",
    navAbout: "About",
    switchLanguage: "Switch language to Turkish",
    heroTitle: "Leave your<br><span>mark.</span>",
    heroCopy: "Set your own pace with Averis Client. Comfortable PvP tools, a clean look, and an active community — all in one place.",
    downloadFree: "Download for free",
    communityChat: "Community chat",
    freeAndOpen: "Free and open",
    javaEdition: "Minecraft Java Edition",
    scrollDown: "SCROLL TO EXPLORE",
    featuresEyebrow: "YOUR GAME, YOUR RULES",
    featuresTitle: "Every detail <span>in its place.</span>",
    featuresCopy: "Averis is made to make your gameplay feel more comfortable and more like you.",
    featurePvpTitle: "Ready for PvP",
    featurePvpCopy: "Stay focused in the fight and find your own playstyle.",
    featureUiTitle: "A clean interface",
    featureUiCopy: "A considered look that keeps your attention on the game.",
    featureCommunityTitle: "Better together",
    featureCommunityCopy: "Meet the community, ask questions, and talk about the game.",
    previewTitle: "Looks simple.<br><span>Feels powerful.</span>",
    previewCopy: "Built to feel right in-game. Make it your style, then get back to playing.",
    downloadEyebrow: "START YOUR ADVENTURE",
    downloadTitle: "Discover Averis<br><span>for yourself.</span>",
    downloadCopy: "For Minecraft Java Edition 1.16.5. Download for free and join the community.",
    version: "Version 1.16.5",
    downloadClient: "Download the client",
    downloadNote: "Free • Minecraft Java Edition required",
    footerTagline: "Leave your mark.",
    openChat: "Open community chat",
    chat: "CHAT",
    chatTitle: "Averis Community",
    checkingConnection: "Checking connection",
    connected: "Connected to Discord",
    disconnected: "Connection lost",
    waitingForChannel: "Waiting for Discord channel",
    closeChat: "Close chat",
    chatNotice: "Messages here also appear in the Discord community channel.",
    chatMessages: "Chat messages",
    welcome: "Welcome to the Averis community!",
    beKind: "Join the conversation and be kind.",
    yourName: "Your name",
    yourMessage: "Your message",
    messagePlaceholder: "Write a message...",
    sendMessage: "Send message",
    originWeb: "WEB",
    originDiscord: "DISCORD",
    errorChannelNotReady: "The Discord channel is not ready yet. Please try again shortly.",
    errorHistoryFailed: "Unable to load message history.",
    errorMissingFields: "Enter your name and a message.",
    errorRateLimited: "Please wait a moment before sending another message.",
    errorSendFailed: "Message was not sent to Discord. Check the bot's permissions.",
    errorNotConnected: "Could not connect to the chat server."
  },
  tr: {
    pageTitle: "Averis Client — İzini bırak.",
    metaDescription: "Averis Client — Minecraft 1.16.5 için ücretsiz istemci. İndir ve topluluğa katıl.",
    navigation: "Ana menü",
    navFeatures: "Özellikler",
    navAbout: "Hakkında",
    switchLanguage: "Dili İngilizceye değiştir",
    heroTitle: "Oyunda<br><span>izini bırak.</span>",
    heroCopy: "Averis Client ile kendi oyun tarzını belirle. PvP araçları, sade bir görünüm ve aktif bir topluluk — hepsi bir arada.",
    downloadFree: "Ücretsiz indir",
    communityChat: "Topluluk sohbeti",
    freeAndOpen: "Ücretsiz ve herkese açık",
    javaEdition: "Minecraft Java Edition",
    scrollDown: "KEŞFETMEK İÇİN KAYDIR",
    featuresEyebrow: "SENİN OYUNUN, SENİN KURALLARIN",
    featuresTitle: "Her ayrıntı <span>yerli yerinde.</span>",
    featuresCopy: "Averis, oyun deneyimini daha rahat ve sana özel kılmak için tasarlandı.",
    featurePvpTitle: "PvP için hazır",
    featurePvpCopy: "Çatışmada odağını koru ve kendi oyun tarzını bul.",
    featureUiTitle: "Sade arayüz",
    featureUiCopy: "Dikkatini oyunda tutan, özenle tasarlanmış bir görünüm.",
    featureCommunityTitle: "Birlikte daha iyi",
    featureCommunityCopy: "Toplulukla tanış, sorularını sor ve oyun hakkında sohbet et.",
    previewTitle: "Sade görünür.<br><span>Güçlü hissettirir.</span>",
    previewCopy: "Oyunda rahatça kullanman için tasarlandı. Tarzını belirle ve oyuna dön.",
    downloadEyebrow: "MACERANA BAŞLA",
    downloadTitle: "Averis'i<br><span>kendin keşfet.</span>",
    downloadCopy: "Minecraft Java Edition 1.16.5 içindir. Ücretsiz indir ve topluluğa katıl.",
    version: "Sürüm 1.16.5",
    downloadClient: "İstemciyi indir",
    downloadNote: "Ücretsiz • Minecraft Java Edition gereklidir",
    footerTagline: "Oyunda izini bırak.",
    openChat: "Topluluk sohbetini aç",
    chat: "SOHBET",
    chatTitle: "Averis Topluluğu",
    checkingConnection: "Bağlantı kontrol ediliyor",
    connected: "Discord'a bağlandı",
    disconnected: "Bağlantı kesildi",
    waitingForChannel: "Discord kanalı bekleniyor",
    closeChat: "Sohbeti kapat",
    chatNotice: "Buradaki mesajlar Discord topluluk kanalında da görünür.",
    chatMessages: "Sohbet mesajları",
    welcome: "Averis topluluğuna hoş geldin!",
    beKind: "Sohbete katıl ve nazik ol.",
    yourName: "Adın",
    yourMessage: "Mesajın",
    messagePlaceholder: "Mesaj yaz...",
    sendMessage: "Mesajı gönder",
    originWeb: "WEB",
    originDiscord: "DISCORD",
    errorChannelNotReady: "Discord kanalı henüz hazır değil. Biraz sonra tekrar dene.",
    errorHistoryFailed: "Mesaj geçmişi yüklenemedi.",
    errorMissingFields: "Adını ve mesajını gir.",
    errorRateLimited: "Yeni mesaj göndermeden önce lütfen biraz bekle.",
    errorSendFailed: "Mesaj Discord'a gönderilemedi. Bot izinlerini kontrol et.",
    errorNotConnected: "Sohbet sunucusuna bağlanılamadı."
  }
};

let language = localStorage.getItem("averis-language") === "tr" ? "tr" : "en";
let socket;
let hasRenderedMessages = false;
const renderedMessageIds = new Set();

function translate(key) {
  return translations[language][key] || translations.en[key] || key;
}

function applyLanguage() {
  const strings = translations[language];
  document.documentElement.lang = language;
  document.title = strings.pageTitle;
  document.querySelector('meta[name="description"]').content = strings.metaDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = translate(element.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });

  document.querySelector("#language-current").textContent = language.toUpperCase();
  document.querySelector("#language-next").textContent = language === "en" ? "TR" : "EN";
  languageToggle.setAttribute("aria-label", translate("switchLanguage"));
  if (chatStatus.dataset.statusKey) {
    chatStatus.textContent = translate(chatStatus.dataset.statusKey);
  }
  if (chatError.dataset.errorKey) {
    chatError.textContent = translate(`error${chatError.dataset.errorKey}`);
  }
  if (hasRenderedMessages && chatMessages.querySelector(".chat-welcome")) {
    renderWelcome();
  }
  chatMessages.querySelectorAll(".message-meta span").forEach((origin) => {
    origin.textContent = translate(origin.dataset.source === "web" ? "originWeb" : "originDiscord");
  });
  chatMessages.querySelectorAll(".message-meta time[data-created-at]").forEach((time) => {
    time.textContent = new Date(time.dataset.createdAt).toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  });
}

function openChat() {
  chatPanel.classList.add("is-open");
  chatPanel.setAttribute("aria-hidden", "false");
  chatBackdrop.classList.add("is-visible");
  document.body.classList.add("chat-open");
  chatInput.focus();

  if (!socket) {
    socket = io();
    socket.on("connect", () => {
      setChatStatus("connected");
    });
    socket.on("disconnect", () => {
      setChatStatus("disconnected");
    });
    socket.on("chat:status", ({ online }) => {
      if (online) {
        setChatStatus("connected");
        socket.emit("chat:history");
      } else {
        setChatStatus("waitingForChannel");
      }
    });
    socket.on("chat:history", (messages) => {
      if (hasRenderedMessages) return;
      hasRenderedMessages = true;
      chatMessages.replaceChildren();
      messages.forEach(renderMessage);
      if (!messages.length) renderWelcome();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    socket.on("chat:message", (message) => {
      renderMessage(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
    socket.on("chat:error", (key) => {
      setChatError(key);
    });
  }
}

function setChatStatus(key) {
  chatStatus.dataset.statusKey = key;
  chatStatus.textContent = translate(key);
  chatStatusDot.classList.toggle("is-online", key === "connected");
}

function setChatError(key) {
  chatError.dataset.errorKey = key;
  chatError.textContent = translate(`error${key}`);
}

function closeChat() {
  chatPanel.classList.remove("is-open");
  chatPanel.setAttribute("aria-hidden", "true");
  chatBackdrop.classList.remove("is-visible");
  document.body.classList.remove("chat-open");
}

function renderWelcome() {
  const welcome = document.createElement("div");
  welcome.className = "chat-welcome";
  const star = document.createElement("span");
  star.textContent = "✦";
  const title = document.createElement("strong");
  title.textContent = translate("welcome");
  const hint = document.createElement("p");
  hint.textContent = translate("beKind");
  welcome.append(star, title, hint);
  chatMessages.replaceChildren(welcome);
}

function renderMessage(message) {
  if (!message || renderedMessageIds.has(message.id)) return;
  renderedMessageIds.add(message.id);

  const row = document.createElement("article");
  row.className = `message-row${message.source === "web" ? " is-web" : ""}`;
  const avatar = document.createElement("span");
  avatar.className = "message-avatar";
  avatar.textContent = (message.username || "?").charAt(0).toUpperCase();
  const body = document.createElement("div");
  body.className = "message-body";
  const header = document.createElement("div");
  header.className = "message-meta";
  const author = document.createElement("strong");
  author.textContent = message.username || "Community";
  const origin = document.createElement("span");
  origin.dataset.source = message.source === "web" ? "web" : "discord";
  origin.textContent = translate(origin.dataset.source === "web" ? "originWeb" : "originDiscord");
  const time = document.createElement("time");
  const date = new Date(message.createdAt);
  time.dateTime = date.toISOString();
  time.dataset.createdAt = date.toISOString();
  time.textContent = date.toLocaleTimeString(language === "tr" ? "tr-TR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const content = document.createElement("p");
  content.textContent = message.content;
  header.append(author, origin, time);
  body.append(header, content);
  row.append(avatar, body);
  chatMessages.append(row);
}

document.querySelectorAll("[data-open-chat]").forEach((button) => {
  button.addEventListener("click", openChat);
});

document.querySelectorAll("[data-close-chat]").forEach((button) => {
  button.addEventListener("click", closeChat);
});

languageToggle.addEventListener("click", () => {
  language = language === "en" ? "tr" : "en";
  localStorage.setItem("averis-language", language);
  applyLanguage();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatPanel.classList.contains("is-open")) closeChat();
});

chatName.value = localStorage.getItem("averis-chat-name") || "";
chatName.addEventListener("change", () => {
  localStorage.setItem("averis-chat-name", chatName.value.trim().slice(0, 24));
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  chatError.textContent = "";
  delete chatError.dataset.errorKey;
  const username = chatName.value.trim().slice(0, 24);
  const content = chatInput.value.trim();
  if (!username || !content) {
    setChatError("MissingFields");
    return;
  }
  if (!socket?.connected) {
    setChatError("NotConnected");
    return;
  }

  localStorage.setItem("averis-chat-name", username);
  socket.emit("chat:send", { username, content });
  chatInput.value = "";
  chatInput.focus();
});

applyLanguage();
