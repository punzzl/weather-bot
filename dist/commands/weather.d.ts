import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { ChatInputCommandInteraction } from 'discord.js';
export declare class WeatherCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options);
    registerApplicationCommands(registry: ApplicationCommandRegistry): void;
    chatInputRun(interaction: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=weather.d.ts.map