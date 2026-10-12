import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import axios from 'axios';

import { styles } from './WeatherPageStyles';
import { Header } from '../../components/Header/Header';
import { Weather } from '../../models/WeatherModel';
import { api } from '../../lib/axios';
import { FavoriteCity } from '../../models/favoriteCity';
import WeatherCard from '../../components/WheatherCard/WeatherCard';

export function WheatherPage() {
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<Weather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cityToSearch, setCityToSearch] = useState("");
  const [cityWeatherData, setCityWeatherData] = useState<Weather>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getFavoriteCities()
  }, [])


  async function getFavoriteCities() {
    setFavoriteCitiesData([]);
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await api.get<FavoriteCity[]>("/favoritecity");

      // Busca o clima de todas as favoritas e só termina o carregamento quando todas chegarem
      const results = await Promise.allSettled(
        response.data.map((item) => getWeatherByCity(item.name))
      );

      const weathers = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<Weather>).value)
        .sort((a, b) => a.location.name.localeCompare(b.location.name));

      setFavoriteCitiesData(weathers);
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível conectar à API. Tente novamente em alguns segundos.");
    } finally {
      setIsLoading(false);
    }
  }

  async function getWeatherByCity(cityName: string) {
        const response = await api.get<Weather>("/weather/" + encodeURIComponent(cityName))

        return response.data;
    }

    async function onSubmitSearch() {
        if (!cityToSearch.trim()) return;

        setErrorMessage("");

        try {
          const responseWeather = await getWeatherByCity(cityToSearch.trim());
          setCityWeatherData(responseWeather);
        } catch (error) {
          console.error(error);
          setCityWeatherData(undefined);
          setErrorMessage(
            axios.isAxiosError(error) && error.response?.status === 404
              ? "Cidade não encontrada."
              : "Não foi possível buscar o clima. Tente novamente."
          );
        }

        setCityToSearch("")
    }

    async function refreshCardSearch() {
      getFavoriteCities();
      setCityWeatherData(undefined);
    }


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Header />
        <View style={styles.formSearch}>
          <TextInput style={styles.inputSearch} placeholder='Digite o nome da cidade' value={cityToSearch}
          onChangeText={setCityToSearch} returnKeyLabel='search' onSubmitEditing={onSubmitSearch} />
          <TouchableOpacity style={styles.buttonSearch} onPress={onSubmitSearch}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        {cityWeatherData &&<WeatherCard weather={cityWeatherData} refreshCard={refreshCardSearch} />}

        <Text style={styles.favoriteCitiesTitle}>Cidades Favoritas:</Text>
        {isLoading ? <Text>Carregando cidades favoritas...</Text> : favoriteCitiesData.length === 0 ?
        <Text>Nenhuma cidade favorita encontrada.</Text> : favoriteCitiesData.map((city) => <WeatherCard 
        key={city.location.name} weather={city} refreshCard={getFavoriteCities}/>) 
      }
    </ScrollView>
  );
}