import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { ChatInputCommandInteraction, Colors, EmbedBuilder } from 'discord.js';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import { WeatherAPIResult } from '../types/types';

export class WeatherCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'weather',
      description: 'Check weather status',
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ): void {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName('location')
            .setDescription('The location')
            .setRequired(true)
        );
    });
  }

  public override async chatInputRun(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    await interaction.deferReply();

    const location = interaction.options.getString('location', true);
    const data = await fetch<WeatherAPIResult>(
      `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${process.env.WEATHER_API_KEY}`,
      FetchResultTypes.JSON
    ).catch(() => undefined);

    if (!data)
      return void interaction.editReply(
        'Error when trying to get data ¿Did you provide a valid location?'
      );

    const embed = new EmbedBuilder()
      .setColor(Colors.DarkAqua)
      .setTimestamp()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setFields(
        {
          name: '📍 Location',
          value: `\`${data.location.name}\``,
        },
        {
          name: '☁️ Cloud base',
          value: `${data.data.values.cloudBase ?? 'N/A'} km`,
          inline: true,
        },
        {
          name: '☁️ Cloud ceiling',
          value: `${data.data.values.cloudCeiling ?? 'N/A'} km`,
          inline: true,
        },
        {
          name: '☁️ Cloud cover',
          value: `${data.data.values.cloudCover ?? 'N/A'}%`,
          inline: true,
        },
        {
          name: '💧 Humidity',
          value: `${data.data.values.humidity ?? 'N/A'}%`,
          inline: true,
        },
        {
          name: '🌧️ Precipitation probability',
          value: `${data.data.values.precipitationProbability ?? 'N/A'}%`,
          inline: true,
        },
        {
          name: '🌧️ Rain intensity',
          value: `${data.data.values.rainIntensity ?? 'N/A'} mm/h`,
          inline: true,
        },
        {
          name: '❄️ Snow intensity',
          value: `${data.data.values.snowIntensity ?? 'N/A'} mm/h`,
          inline: true,
        },
        {
          name: '🌡️ Temperature',
          value: `${data.data.values.temperature ?? 'N/A'}°C`,
          inline: true,
        },
        {
          name: '👁️ Visibility',
          value: `${data.data.values.visibility ?? 'N/A'} km`,
          inline: true,
        },
        {
          name: '💨 Wind direction',
          value: `${data.data.values.windDirection ?? 'N/A'}°`,
          inline: true,
        },
        {
          name: '💨 Wind gust',
          value: `${data.data.values.windGust ?? 'N/A'} m/s`,
          inline: true,
        },
        {
          name: '💨 Wind speed',
          value: `${data.data.values.windSpeed ?? 'N/A'} m/s`,
          inline: true,
        }
      );

    return void interaction.editReply({
      embeds: [embed],
    });
  }
}
