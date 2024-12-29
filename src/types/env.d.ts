declare namespace NodeJS {
  interface ProcessEnv {
    readonly DISCORD_TOKEN: string;
    readonly WEATHER_API_KEY: string;
  }
}
