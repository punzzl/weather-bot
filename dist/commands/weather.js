"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const fetch_1 = require("@sapphire/fetch");
class WeatherCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'weather',
            description: 'Check weather status',
        });
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) => option
                .setName('location')
                .setDescription('The location')
                .setRequired(true));
        });
    }
    async chatInputRun(interaction) {
        await interaction.deferReply();
        const location = interaction.options.getString('location', true);
        const data = await (0, fetch_1.fetch)(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.WEATHER_API_KEY}`, fetch_1.FetchResultTypes.JSON).catch(() => undefined);
        if (!data)
            return void interaction.editReply('Error when trying to get data ¿Did you provide a valid location?');
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(discord_js_1.Colors.DarkAqua)
            .setTimestamp()
            .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL(),
        })
            .setFields({
            name: '📍 Location',
            value: `\`${data.location.name}\``,
        }, {
            name: '☁️ Cloud base',
            value: `${data.data.values.cloudBase ?? 'N/A'} km`,
            inline: true,
        }, {
            name: '☁️ Cloud ceiling',
            value: `${data.data.values.cloudCeiling ?? 'N/A'} km`,
            inline: true,
        }, {
            name: '☁️ Cloud cover',
            value: `${data.data.values.cloudCover ?? 'N/A'}%`,
            inline: true,
        }, {
            name: '💧 Humidity',
            value: `${data.data.values.humidity ?? 'N/A'}%`,
            inline: true,
        }, {
            name: '🌧️ Precipitation probability',
            value: `${data.data.values.precipitationProbability ?? 'N/A'}%`,
            inline: true,
        }, {
            name: '🌧️ Rain intensity',
            value: `${data.data.values.rainIntensity ?? 'N/A'} mm/h`,
            inline: true,
        }, {
            name: '❄️ Snow intensity',
            value: `${data.data.values.snowIntensity ?? 'N/A'} mm/h`,
            inline: true,
        }, {
            name: '🌡️ Temperature',
            value: `${data.data.values.temperature ?? 'N/A'}°C`,
            inline: true,
        }, {
            name: '👁️ Visibility',
            value: `${data.data.values.visibility ?? 'N/A'} km`,
            inline: true,
        }, {
            name: '💨 Wind direction',
            value: `${data.data.values.windDirection ?? 'N/A'}°`,
            inline: true,
        }, {
            name: '💨 Wind gust',
            value: `${data.data.values.windGust ?? 'N/A'} m/s`,
            inline: true,
        }, {
            name: '💨 Wind speed',
            value: `${data.data.values.windSpeed ?? 'N/A'} m/s`,
            inline: true,
        });
        return void interaction.editReply({
            embeds: [embed],
        });
    }
}
exports.WeatherCommand = WeatherCommand;
//# sourceMappingURL=weather.js.map