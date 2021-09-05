import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  currentForecast: {
    marginTop: 20,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 10,
  },
  currentForecastRightContainer: {
    flex: 2,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  searchBar: {
    justifyContent: 'center',
  },
  //WEATHER DATA
  weatherIcon: {
    marginLeft: 10,
    width: 100,
    height: 100,
  },
  dateCForecast: {
    paddingTop: 20,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  dateCForecastRain: {
    paddingTop: 20,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  timeCForecast: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  timeCForecastRain: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  descriptionRain: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  cityName: {
    paddingTop: 23,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  cityNameRain: {
    paddingTop: 23,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  temperatureText: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  temperatureTextRain: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  activityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  weather16Container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 10,
  },
  Forecast7DaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayForecast7Days: {
    marginLeft: 10,
    width: 100,
    marginRight: 20,
    paddingTop: 20,
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  weatherIcon7days: {
    marginTop: 5,
    paddingRight: 15,
    width: 50,
    height: 50,
  },
  temperatureText7Days: {
    width: 200,
    paddingTop: 20,
    paddingLeft: 50,
    fontSize: 18,
    color: 'black',
    textShadowColor: 'white',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  dayForecast7DaysRain: {
    width: 100,
    marginRight: 20,
    paddingTop: 20,
    fontSize: 18,
    textAlign: 'left',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  temperatureText7DaysRain: {
    width: 200,
    paddingTop: 20,
    paddingLeft: 50,
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  plusInfoWeather: {
    margin: 10,
    padding: 10,
    height: '10%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  plusInfoWeatherSuntime: {
    alignItems: 'center',
    width: '30%',
  },
  plusInfoWeatherWind: {
    alignItems: 'center',
    width: '30%',
    fontFamily: 'sans-serif-condensed',
  },
  plusInfoWeatherPressure: {
    alignItems: 'center',
    width: '30%',
  },
  plusInfoWeatherSuntimeTextHeader: {
    fontSize: 16,
    color: 'black',
    textShadowColor: 'white',
    fontWeight: 'bold',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  plusInfoWeatherSuntimeTextHeaderRain: {
    fontSize: 15,
    color: 'white',
    textShadowColor: 'black',
    fontWeight: 'bold',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  plusInfoWeatherSuntimeContent: {
    fontSize: 16,
    color: 'black',
    textShadowColor: 'white',
    fontWeight: 'bold',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
  plusInfoWeatherSuntimeContentRain: {
    fontSize: 15,
    color: 'white',
    textShadowColor: 'black',
    fontWeight: 'bold',
    textShadowOffset: {width: 3, height: 0},
    textShadowRadius: 10,
    fontFamily: 'sans-serif-condensed',
  },
});

export default styles;
