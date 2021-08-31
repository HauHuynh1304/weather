import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  basic: {},
  page: {
    flex: 1,
    backgroundColor: '#34495E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splitPage: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  image: {
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  //WEATHER DATA
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  imageView: {
    width: '100%',
    alignItems: 'center',
  },
  temperature: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  temperatureText: {
    fontSize: 75,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styles;
