import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground,
  Platform,
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import Input from '../../components/Input';
import {FormHandles, SubmitHandler} from '@unform/core';
import {Form} from '@unform/mobile';
import cityInfo from '../../assets/public-info/cityInfo';
import WeatherData from '../../response-data/WeatherData';
import weatherImage from '../../utils/weatherImage';
import {WEATHER_API_KEY} from '@env';
import {capitalize} from '../../utils/capitalize';
import api from '../../api';
import * as dateTime from '../../utils/date-time/UTC-time';
import weatherBackgroundImg from '../../utils/WeatherBackgroundImg';

const HomePage: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);
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

  //GET RESPONSE DATA AND DISABLE LIST CITY
  const getWeatherDataByLocationId = useCallback(async item => {
    setEnableListCity(false);
    try {
      setLoadingData(true);
      const response = await api.get(
        `/weather?id=${item}&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      // get location name to display
      let country = getCountryNameByID(response.data.id);
      response.data.timezone =
        dateTime.getLocalDate(response.data.timezone) +
        ', ' +
        dateTime.getLocalTime(response.data.timezone);
      response.data.name = country[0].name;
      setWeatherData(response.data);
      setLoadingData(false);
    } catch (err) {
      Alert.alert('bad signal or city not found, please try again');
      setLoadingData(false);
    }
  }, []);

  const handleSubmit: SubmitHandler = useCallback(async data => {
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
      response.data.timezone =
        dateTime.getLocalDate(response.data.timezone) +
        ', ' +
        dateTime.getLocalTime(response.data.timezone);
      response.data.name = country[0].name;
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
    try {
      const response = await api.get(
        `/weather?id=${locationId}&appid=${WEATHER_API_KEY}&units=metric&lang=vn`,
      );
      // get location name to display
      let country = getCountryNameByID(response.data.id);
      response.data.timezone =
        dateTime.getLocalDate(response.data.timezone) +
        ', ' +
        dateTime.getLocalTime(response.data.timezone);
      response.data.name = country[0].name;
      setWeatherData(response.data);
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
    <KeyboardAvoidingView style={styles.page}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={weatherBackgroundImg(weatherData?.weather[0].main)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        {/* RENDER WEATHER DATA */}
        {!loadingData ? (
          <SafeAreaView style={styles.splitPage}>
            {weatherData?.main.temp && weatherData?.weather[0].description && (
              <View style={styles.content}>
                <View style={styles.imageView}>
                  {weatherData?.weather[0].icon && (
                    <Image
                      style={{width: 250, height: 250}}
                      source={weatherImage(weatherData?.weather[0].icon)}
                    />
                  )}
                </View>
                <View style={styles.temperature}>
                  <Text style={styles.text}>
                    {weatherData.name}, {weatherData.sys.country}
                  </Text>
                  <Text>{capitalize(weatherData?.weather[0].description)}</Text>
                  <Text>{weatherData?.timezone}</Text>
                  <Text style={styles.temperatureText}>
                    {weatherData?.main.temp.toFixed(1)}
                    <Text style={styles.temperatureText}>ºC</Text>
                  </Text>
                </View>
              </View>
            )}
          </SafeAreaView>
        ) : (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        <View style={styles.splitPage}>
          <View style={styles.detailsContainer}>
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
                // onEndEditing={() => setEnableListCity(false)}
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
                        onPress={() =>
                          getWeatherDataByLocationId(`${item.id}`)
                        }>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    </ScrollView>
                  )}
                />
              )}
            </Form>
          </View>
        </View>
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
