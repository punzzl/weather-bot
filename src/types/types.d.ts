export interface WeatherAPIResult {
  data: {
    values: {
      cloudBase: number;
      cloudCeiling: number;
      cloudCover: number;
      humidity: number;
      precipitationProbability: number;
      rainIntensity: number;
      snowIntensity: number;
      temperature: number;
      temperatureApparent: number;
      visibility: number;
      windDirection: number;
      windGust: number;
      windSpeed: number;
    };
  };
  location: {
    name: string;
  };
}
