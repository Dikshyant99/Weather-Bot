# Weather Bot

A small bot that sends me a **daily weather update for Kathmandu on Telegram** every morning at 7:00 AM Nepal time.

It runs for free on **GitHub Actions**, so I don't need a server, a cloud account or a computer that's always on.

```
Good morning! Today's weather: 9°C to 21°C, 10% chance of rain.
```

## How it works

1. A scheduled GitHub Actions workflow (`.github/workflows/daily.yml`) runs every day at 01:15 UTC (7:00 AM in Nepal).
2. `index.js` gets today's forecast (min/max temperature and chance of rain) from the free [Open-Meteo](https://open-meteo.com/) API. It doesn't need an API key.
3. It sends the message to my Telegram chat through the Telegram Bot API.

```
GitHub Actions (cron) → index.js → Open-Meteo API → Telegram Bot API → my phone
```

## Setup

### 1. Create a Telegram bot
- Message [@BotFather](https://t.me/BotFather) on Telegram, send `/newbot`, and copy the **bot token**.
- Send your new bot any message, then open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` and copy the `chat.id` value. That's your **chat ID**.

### 2. Add the secrets to GitHub
In the repo, go to **Settings → Secrets and variables → Actions → New repository secret** and add:

| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | your bot token |
| `TELEGRAM_CHAT_ID` | your chat ID |

### 3. Test it
Go to **Actions → Daily Weather Notification → Run workflow** to send a message right away.

## Running locally

You need Node.js 18 or newer (for the built-in `fetch`). It doesn't use any npm packages.

```
# Windows PowerShell
$env:TELEGRAM_BOT_TOKEN="your-token"
$env:TELEGRAM_CHAT_ID="your-chat-id"
node index.js
```

## Customising

- **Another city:** change `LAT`, `LON` and `TIMEZONE` at the top of `index.js`.
- **Another time:** change the `cron` line in `daily.yml`. The time is in UTC, and Nepal is UTC+5:45.

## Tech

Node.js · GitHub Actions · Open-Meteo API · Telegram Bot API
