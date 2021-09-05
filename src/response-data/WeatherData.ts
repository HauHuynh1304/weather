export default interface WeatherData {
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: {
    speed: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
}
