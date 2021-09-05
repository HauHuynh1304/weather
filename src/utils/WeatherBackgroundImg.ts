import Clear from '../assets/Weather/Clear/clear.png';
import Clouds from '../assets/Weather/Clouds/clouds.png';
import Rain from '../assets/Weather/Rain/rain.png';
import Snow from '../assets/Weather/Snow/snow.png';
import Thunderstorm from '../assets/Weather/Thunderstorm/thunderstorm.png';
import Wind from '../assets/Weather/Wind/wind.jpg';

export default function weatherBackgroundImg(main: string) {
  switch (main) {
    case 'Clear':
      return Clear;
    case 'Clouds':
      return Clouds;
    case 'Rain':
      return Rain;
    case 'Snow':
      return Snow;
    case 'Thunderstorm':
      return Thunderstorm;
    case 'Wind':
      return Wind;
    case 'Drizzle':
      return Rain;
    default:
      break;
  }
}
