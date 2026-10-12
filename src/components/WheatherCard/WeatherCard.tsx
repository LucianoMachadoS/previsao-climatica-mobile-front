import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { Weather } from "../../models/WeatherModel";
import { api } from "../../lib/axios";
import { getLargeIcon, getWeatherTheme } from "../../lib/weatherTheme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./WeatherCardStyles";

interface WeatherCardProps {
    weather: Weather;
    refreshCard: (cityName: string) => void;
}

export default function WeatherCard({ weather, refreshCard }: WeatherCardProps) {
    const [isFavorited, setIsFavorited] = useState(weather.isFavorite);

    async function toggleFavorite() {
        //TODO: VERIFICAR SE A CIDADE É FAVORITA, SE FOR,
        //CHAMAR A API PARA REMOVER CIDADE DOS FAVORITOS
        //SENÃO, ADICIONAR CIDADE AOS FAVORITOS
        if(isFavorited){
            await api.delete(`/favoritecity/${weather.favoriteCityId}`)
        }else {
            await api.post("/favoritecity", {
                "name" : weather.location.name
            })
        }
        //TODO: TROCAR O VALOR DE ISFAVORITED
        setIsFavorited(!isFavorited)
        //TODO: CHAMAR REFRESHCARD COM O NOME DA CIDADE
        refreshCard(weather.location.name);
    }

    const theme = getWeatherTheme(weather.current.condition.code, weather.current.is_day);
    const textStyle = { color: theme.textColor };

    return (
        <LinearGradient
            colors={theme.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
                <FontAwesome6 name="star" size={24} color={isFavorited ? "gold" : theme.textColor} solid={isFavorited} />
            </TouchableOpacity>

            <View style={styles.cardContent}>
                <Text style={[styles.title, textStyle]}>Clima em {weather.location.name}</Text>
                <Text style={textStyle}>País: {weather.location.country}</Text>
                <Text style={textStyle}>Temperatura: {Math.round(weather.current.temp_c)}°C</Text>
                <Text style={textStyle}>Condição: {weather.current.condition.text}</Text>
                <Text style={textStyle}>Última Atualização: {format(new Date(weather.current.last_updated), "dd-MM-yyyy HH:mm")}</Text>
            </View>

            <Image source={{ uri: getLargeIcon(weather.current.condition.icon) }} style={styles.icon} />
        </LinearGradient>
    );
}
