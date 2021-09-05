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
// https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=current,minutely,hourly,alerts&appid=73d58275edbd699efb062e9827aae136
