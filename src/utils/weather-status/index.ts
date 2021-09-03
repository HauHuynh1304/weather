export default function checkWeatherStatus(main: string) {
  switch (main) {
    case 'Clear':
      return true;
    case 'Clouds':
      return true;
    case 'Rain':
      return false;
    case 'Snow':
      return true;
    case 'Thunderstorm':
      return false;
    case 'Wind':
      return false;
    case 'Drizzle':
      return false;
    default:
      break;
  }
}
