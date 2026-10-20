# Averis Client website

Static website and a small Node.js service that relays messages between the website chat and one Discord text channel.

## Run locally

1. Install Node.js 20 or later.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `DISCORD_BOT_TOKEN` in `.env` to a newly generated bot token. Never place this token in `public/` or in browser code.
5. Set `DISCORD_CHANNEL_ID` to the dedicated community chat channel ID.
6. In the Discord Developer Portal, enable the **Message Content Intent** for the bot. Invite it to the server with **View Channel**, **Send Messages**, and **Read Message History** permissions.
7. Run `npm start` and open `http://localhost:3000`.

The download route serves the existing `build/AverisClient-1.16.5.jar` from the project root.

Messages posted in the website chat are relayed to Discord. Human messages posted in the configured Discord channel appear on the website. The latest 40 channel messages are loaded when someone opens the chat.

The website chat is public and currently uses display names without account authentication. Deploy the Node.js service over HTTPS and keep `.env` private before making the site public.
