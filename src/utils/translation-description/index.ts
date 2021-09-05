export default function translateDescription(description: string) {
  switch (description) {
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'Thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      return 'Giông bão';
    case 'light intensity drizzle':
    case 'drizzle':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'drizzle rain':
    case 'heavy intensity drizzle rain':
    case 'heavy shower rain and drizzle':
    case 'shower drizzle':
      return 'Mưa phùn';
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'drizzle rain':
    case 'extreme rain':
    case 'freezing rain':
    case 'ragged shower rain':
      return 'Mưa nặng hạt';
    case 'light rain':
    case 'light intensity shower rain':
    case 'shower rain':
    case 'ragged shower rain':
      return 'Mưa';
    case 'light snow':
    case 'Snow':
    case 'Heavy snow':
    case 'Sleet':
    case 'Light shower sleet':
    case 'Shower sleet':
    case 'Light rain and snow':
    case 'Rain and snow':
    case 'Light shower snow':
    case 'Shower snow':
    case 'Heavy shower snow':
      return 'Có tuyết';
    case 'clear sky':
      return 'Trời đẹp';
    case 'few clouds':
    case 'scattered clouds':
    case 'overcast clouds':
    case 'broken clouds':
      return 'Nhiều mây';
    default:
      break;
  }
}
