export default interface WeatherData7Day {
  lat: number;
  lon: number;
  timezone_offset: number;
  daily: [
    {
      dt: number; //time forecast
      temp: {
        min: number;
        max: number;
      };
      weather: [
        {
          main: string;
          description: string;
          icon: string;
        },
      ];
    },
  ];
}
