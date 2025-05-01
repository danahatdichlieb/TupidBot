import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const countryCodeToEmoji = {
    "DE": "🇩🇪",
    "US": "🇺🇸",
    "FR": "🇫🇷",
    "GB": "🇬🇧",
    "IT": "🇮🇹",
    "ES": "🇪🇸",
    "JP": "🇯🇵",
};

export default {
    name: "weather",
    aliases: ["w"],
    description: "Zeigt das Wetter einer Stadt an",
    cooldown: 5,
    permission: 0,
    async execute(chat, msg, args) {
        const city = args[0];

        if (!city) {
            return { text: "+w <stadtname>" };
        }

        const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
        const WEATHER_API_URL = process.env.WEATHER_API_URL;

        try {
            const response = await fetch(`${WEATHER_API_URL}${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=de`);
            const data = await response.json();

            if (data.cod !== 200) {
                return { text: `Die Stadt "${city}" wurde nicht gefunden.` };
            }

            const { name, main, weather, sys } = data;
            const description = weather[0].description;
            const country = sys.country.toUpperCase();
            const countryEmoji = countryCodeToEmoji[country] || '';
            const temp = main.temp;
            const feels_like = main.feels_like;
            const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin" });
            const sunset = new Date(sys.sunset * 1000).toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin" });

            const messages = [
                `${name} ${countryEmoji}`,
                `${description}, ${temp}°C (gefühlt: ${feels_like}°C)`,
                `🌅 Sonnenaufgang: ${sunrise}`,
                `🌇 Sonnenuntergang: ${sunset}`
            ];

            return { text: messages.join(" | ") };

        } catch (error) {
            console.error("Fehler beim Abrufen der Wetterdaten:", error);
            return { text: "Konnte Wetterdaten nicht abrufen." };
        }
    }
};
