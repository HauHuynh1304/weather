import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import {FormHandles, SubmitHandler} from '@unform/core';
import {Form} from '@unform/mobile';
import cityInfo from '../../assets/public-info/cityInfo';
import WeatherData from '../../response-data/WeatherData';
import WeatherData7Day from '../../response-data/WeatherData7Day';
import weatherImage from '../../utils/weatherImage';
import {WEATHER_API_KEY} from '@env';
import api from '../../api';
import * as dateTime from '../../utils/date-time/UTC-time';
import weatherBackgroundImg from '../../utils/WeatherBackgroundImg';
import checkWeatherStatus from '../../utils/weather-status';
import translateDescription from '../../utils/translation-description';

const HomePage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);
  const [weatherData7Day, setWeatherData7Day] = useState<WeatherData7Day>();
  const [search, setSearch] = useState('');
  const [masterDataSource, setMasterDataSource] = useState(cityInfo);
  const [enableListCity, setEnableListCity] = useState(false);

  //FILTER SEARCH FLAT LIST
  const searchFilterFunction = (text: string) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMasterDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setMasterDataSource(cityInfo);
      setSearch(text);
    }
  };

  //GET RESPONSE DATA WHEN CLICK ON CITY LIST
  const getWeatherDataByLocationId = useCallback(async item => {
    setEnableListCity(false);
    //Get param lat of city
    // let lon = getLonOfCityByCityID(item);
    try {
      setLoadingData(true);
      const response = await api.get(
        `/weather?id=${item}&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      // get location name to display
      let country = getCountryNameByID(response.data.id);
      response.data.name = country[0].name;

      // get data forecast 7 days
      let lat = country[0].coord.lat;
      let lon = country[0].coord.lon;
      const response7Days = await api.get(
        `/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      setWeatherData7Day(response7Days.data);
      setWeatherData(response.data);
      setLoadingData(false);
    } catch (err) {
      Alert.alert('bad signal or city not found, please try again');
      setLoadingData(false);
    }
  }, []);

  //GET RESPONSE DATA WHEN SUBMIT NAME OF CITY
  const handleSubmit: SubmitHandler = useCallback(async data => {
    if (!data.searchData) {
      return;
    }

    setEnableListCity(false);
    try {
      setLoadingData(true);
      // get location id
      let location = getCountryIdByName(data.searchData);
      const response = await api.get(
        `/weather?id=${location[0].id}&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      // get location name to display
      let country = getCountryNameByID(response.data.id);
      response.data.name = country[0].name;

      // get data forecast 7 days
      let lat = country[0].coord.lat;
      let lon = country[0].coord.lon;
      const response7Days = await api.get(
        `/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      setWeatherData7Day(response7Days.data);
      setWeatherData(response.data);
      setLoadingData(false);
    } catch (err) {
      Alert.alert('bad signal or city not found, please try again');
      setLoadingData(false);
    }
  }, []);

  //GET RESPONSE DATA ON OPEN APP
  async function LoadWeatherData() {
    let locationId = 1562822; //Vietnam id
    let lat = 16.16667;
    let lon = 107.833328;
    try {
      //get current weather data
      const responseCurrent = await api.get(
        `/weather?id=${locationId}&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      // get location name to display
      let country = getCountryNameByID(responseCurrent.data.id);

      responseCurrent.data.name = country[0].name;
      setWeatherData(responseCurrent.data);
      //get weather 7 days
      const response7Days = await api.get(
        `/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      setWeatherData7Day(response7Days.data);
    } catch (error) {
      Alert.alert('No internet');
    }
  }

  //GET COUNTRY NAME BY ID RESPONSE
  const getCountryNameByID = (responseLocationID: number) => {
    return cityInfo.filter(e => {
      return e.id === responseLocationID;
    });
  };

  //Get COUNTRY ID BY NAME
  const getCountryIdByName = (responseLocationName: string) => {
    return cityInfo.filter(e => {
      return e.name.toLowerCase() === responseLocationName.toLowerCase();
    });
  };

  return (
    <KeyboardAvoidingView>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={weatherBackgroundImg(weatherData?.weather[0].main)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.searchBar}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="searchData"
              placeholder="Search any city"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              onTouchStart={() => setEnableListCity(true)}
            />
            {enableListCity && (
              <FlatList
                style={{height: 200}}
                data={masterDataSource}
                initialNumToRender={10}
                renderItem={({item, index}) => (
                  <ScrollView
                    style={{
                      backgroundColor: '#ede7d8',
                      marginVertical: 5,
                      borderRadius: 10,
                      marginHorizontal: 20,
                      paddingHorizontal: 10,
                      padding: 5,
                    }}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => getWeatherDataByLocationId(`${item.id}`)}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}
              />
            )}
          </Form>
        </View>

        {/* RENDER WEATHER DATA */}
        {!loadingData ? (
          <>
            {weatherData?.main.temp && weatherData?.weather[0].description && (
              <View>
                {/* RENDER CURRENT WEATHER DATA */}
                <View style={styles.currentForecast}>
                  <View style={{width: '20%', marginRight: 15}}>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.dateCForecast
                          : styles.dateCForecastRain
                      }>
                      {dateTime.getLocalDate(weatherData?.timezone)}
                    </Text>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.timeCForecast
                          : styles.timeCForecastRain
                      }>
                      {dateTime.getLocalTime(weatherData?.timezone)}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.description
                          : styles.descriptionRain
                      }>
                      {translateDescription(
                        weatherData?.weather[0].description,
                      )}
                    </Text>
                  </View>
                  <View>
                    {weatherData?.weather[0].icon && (
                      <Image
                        style={styles.weatherIcon}
                        source={weatherImage(weatherData?.weather[0].icon)}
                      />
                    )}
                  </View>

                  <View style={styles.currentForecastRightContainer}>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.cityName
                          : styles.cityNameRain
                      }
                      numberOfLines={2}>
                      {weatherData.name}, {weatherData.sys.country}
                    </Text>

                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.temperatureText
                          : styles.temperatureTextRain
                      }>
                      {weatherData?.main.temp.toFixed(1)}ºC
                    </Text>
                  </View>
                </View>

                {/* RENDER WEATHER NEXT 7 DAYS */}
                {weatherData7Day && (
                  <View style={styles.weather16Container}>
                    <FlatList
                      style={{height: '55%'}}
                      data={weatherData7Day.daily}
                      renderItem={({item, index}) => (
                        <ScrollView>
                          <View style={styles.Forecast7DaysContainer}>
                            <View>
                              <Text
                                style={
                                  checkWeatherStatus(
                                    weatherData?.weather[0].main,
                                  )
                                    ? styles.dayForecast7Days
                                    : styles.dayForecast7DaysRain
                                }>
                                {dateTime.dateConverter(item.dt)}
                              </Text>
                            </View>
                            <View>
                              <Image
                                style={styles.weatherIcon7days}
                                source={weatherImage(item.weather[0].icon)}
                              />
                            </View>
                            <View>
                              <Text
                                style={
                                  checkWeatherStatus(
                                    weatherData?.weather[0].main,
                                  )
                                    ? styles.temperatureText7Days
                                    : styles.temperatureText7DaysRain
                                }>
                                {item.temp.min}ºC - {item.temp.max}ºC
                              </Text>
                            </View>
                          </View>
                        </ScrollView>
                      )}
                    />
                  </View>
                )}
                {/* More info */}
                <View style={styles.plusInfoWeather}>
                  <View style={styles.plusInfoWeatherSuntime}>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeTextHeader
                          : styles.plusInfoWeatherSuntimeTextHeaderRain
                      }>
                      Sunrise&nbsp;&ndash;&nbsp;Sunset
                    </Text>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeContent
                          : styles.plusInfoWeatherSuntimeContentRain
                      }>
                      {dateTime.timeConverter(weatherData.sys.sunrise)}
                      &nbsp;&ndash;&nbsp;
                      {dateTime.timeConverter(weatherData.sys.sunset)}
                    </Text>
                  </View>

                  <View style={styles.plusInfoWeatherWind}>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeTextHeader
                          : styles.plusInfoWeatherSuntimeTextHeaderRain
                      }>
                      Sức gió
                    </Text>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeContent
                          : styles.plusInfoWeatherSuntimeContentRain
                      }>
                      {weatherData.wind.speed}km/h
                    </Text>
                  </View>

                  <View style={styles.plusInfoWeatherPressure}>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeTextHeader
                          : styles.plusInfoWeatherSuntimeTextHeaderRain
                      }>
                      Độ Ẩm
                    </Text>
                    <Text
                      style={
                        checkWeatherStatus(weatherData?.weather[0].main)
                          ? styles.plusInfoWeatherSuntimeContent
                          : styles.plusInfoWeatherSuntimeContentRain
                      }>
                      {weatherData.main.humidity}%
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ImageBackground>
      {/* invisible element call api when open app */}
      <View>
        <Image
          style={{display: 'none'}}
          source={{uri: 'nothing'}}
          onLoadStart={LoadWeatherData}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomePage;
