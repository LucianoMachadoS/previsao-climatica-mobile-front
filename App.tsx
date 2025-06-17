import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WheatherPage } from './src/screens/WheatherPage/WeatherPage';

export default function App() {
  return (
    <>
      <WheatherPage/>
      <StatusBar style="auto" />
    </>
  );
}
