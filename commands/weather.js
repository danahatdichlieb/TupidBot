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
    description: "Shows the weather for a city.",
    cooldown: 3,
    permission: 0,
    async execute(chat, msg, args) {
        const city = args[0];

        if (!city) {
            return { text: "+w <city>" };
        }

        const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
        const WEATHER_API_URL = process.env.WEATHER_API_URL;

        try {
            const response = await fetch(`${WEATHER_API_URL}${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=de`);
            const data = await response.json();

            if (data.cod !== 200) {
                return { text: `FeelsDankMan City "${city}" not found.` };
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
                `${description}, ${temp}°C (feels like: ${feels_like}°C)`,
                `🌅 Sunrise: ${sunrise}`,
                `🌇 Sunset: ${sunset}`
            ];

            return { text: messages.join(" | ") };

        } catch (error) {
            console.error(error);
            return { text: "Unable to fetch weather data." };
        }
    }
};
