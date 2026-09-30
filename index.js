const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Kathmandu. Change these for another city.
const LAT = 27.7172;
const LON = 85.324;
const TIMEZONE = 'Asia/Kathmandu';

async function main() {
  if (!TOKEN || !CHAT_ID) {
    throw new Error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
  }

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
    '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
    `&timezone=${encodeURIComponent(TIMEZONE)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API failed: ${res.status}`);
  const data = await res.json();

  const max = data.daily.temperature_2m_max[0];
  const min = data.daily.temperature_2m_min[0];
  const rain = data.daily.precipitation_probability_max[0];

  const text = `Good morning! Today's weather: ${min}°C to ${max}°C, ${rain}% chance of rain.`;

  const send = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });
  if (!send.ok) throw new Error(`Telegram failed: ${send.status} ${await send.text()}`);

  console.log('Sent:', text);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});