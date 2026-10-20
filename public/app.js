const chatPanel = document.querySelector("#chat-panel");
const chatBackdrop = document.querySelector(".chat-backdrop");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatName = document.querySelector("#chat-name");
const chatInput = document.querySelector("#chat-input");
const chatError = document.querySelector("#chat-error");
const chatStatus = document.querySelector("#chat-status");
const chatStatusDot = document.querySelector("#chat-status-dot");

let socket;
let hasRenderedMessages = false;
const renderedMessageIds = new Set();

function openChat() {
  chatPanel.classList.add("is-open");
  chatPanel.setAttribute("aria-hidden", "false");
  chatBackdrop.classList.add("is-visible");
  document.body.classList.add("chat-open");
  chatInput.focus();

  if (!socket) {
    socket = io();
    socket.on("connect", () => {
      chatStatus.textContent = "Discord-a qoşuldu";
      chatStatusDot.classList.add("is-online");
    });
    socket.on("disconnect", () => {
      chatStatus.textContent = "Bağlantı kəsildi";
      chatStatusDot.classList.remove("is-online");
    });
    socket.on("chat:status", ({ online }) => {
      if (online) {
        chatStatus.textContent = "Discord-a qoşuldu";
        chatStatusDot.classList.add("is-online");
        socket.emit("chat:history");
      } else {
        chatStatus.textContent = "Discord kanalı gözlənilir";
        chatStatusDot.classList.remove("is-online");
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
    socket.on("chat:error", (message) => {
      chatError.textContent = message;
    });
  }
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
  title.textContent = "Averis community-yə xoş gəlmisən!";
  const hint = document.createElement("p");
  hint.textContent = "Söhbətə qoşul və mehriban ol.";
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
  origin.textContent = message.source === "web" ? "WEB" : "DISCORD";
  const time = document.createElement("time");
  const date = new Date(message.createdAt);
  time.dateTime = date.toISOString();
  time.textContent = date.toLocaleTimeString("az-AZ", { hour: "2-digit", minute: "2-digit" });
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
  const username = chatName.value.trim().slice(0, 24);
  const content = chatInput.value.trim();
  if (!username || !content) return;
  if (!socket?.connected) {
    chatError.textContent = "Chat serverinə qoşulmaq mümkün olmadı.";
    return;
  }

  localStorage.setItem("averis-chat-name", username);
  socket.emit("chat:send", { username, content });
  chatInput.value = "";
  chatInput.focus();
});
