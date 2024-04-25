import { YStack, H2, Separator, Theme, Image } from 'tamagui';

import EditScreenInfo from '../../components/edit-screen-info';

export default function TabOneScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        {/*<H2>HOME</H2>*/}
        <Separator />
        <Image source={require('./dressedLogo.png')} style={{ width: '100%', height: '100%' }} />
        {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      </YStack>
    </Theme>
  );
}




// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import axios from 'axios';

// const Weather = () => {
//  const [weatherData, setWeatherData] = useState<{ main: { temp: number }, weather: { description: string }[] } | null>(null);

//  useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat={LATITUDE}&lon={LONGITUDE}&appid={722da509e8a277210c2b815f3a887c90}&units=metric`);
//         setWeatherData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchWeather();
//  }, []);

//  if (!weatherData) {
//     return <Text>Loading...</Text>;
//  }

//  return (
//     <View>
//       <Text>Temperature: {weatherData.main.temp}°C</Text>
//       <Text>Weather: {weatherData.weather[0].description}</Text>
//     </View>
//  );
// };

// export default Weather;
