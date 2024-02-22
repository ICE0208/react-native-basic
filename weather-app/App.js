import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { API_KEY } from "@env";

export default function App() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    console.log("getWeather");
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?` +
        `lat=${latitude}&` +
        `lon=${longitude}&` +
        `appid=${API_KEY}&` +
        `units=metric&`
    );
    const json = await response.json();
    const noonData = json?.list.filter((object) =>
      object.dt_txt.includes("12:00:00")
    );
    const noonMinData = noonData?.map((object) => {
      return {
        weather: object.weather[0].main,
        temp: object.main.temp,
        description: object.weather[0].description,
        date: object.dt_txt,
        dt: object.dt, // map key로 사용하기 위해
      };
    });
    setDays(noonMinData);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <MaterialIcons
          name="place"
          size={70}
          color="black"
        />
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <View style={styles.weatherView}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {days.length === 0 ? (
            // ? 로딩 상태
            <View style={[styles.day, { width: SCREEN_WIDTH }]}>
              <ActivityIndicator
                color="white"
                size="large"
                style={{ marginTop: 150 }}
              />
            </View>
          ) : (
            // ? 로딩 완료되었을 때 데이터 뿌리기
            days.map((day) => {
              return (
                <View
                  key={day.dt}
                  style={[styles.day, { width: SCREEN_WIDTH }]}
                >
                  <Text style={styles.temp}>
                    {parseInt(day.temp * 10) / 10}°C
                  </Text>
                  <Text style={styles.date}>{day.date.slice(8, 10)}</Text>
                  <Text style={styles.weather}>{day.weather}</Text>
                  <Text style={styles.description}>{day.description}</Text>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "tomato" },
  city: {
    flex: 1.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 72,
    fontWeight: "700",
  },
  weatherView: {
    flex: 3,
  },
  day: {
    alignItems: "center",
  },
  temp: { marginTop: 50, marginBottom: 10, fontSize: 46, fontWeight: "700" },
  date: {
    marginTop: -30,
    marginBottom: 10,
    fontSize: 200,
    fontWeight: "700",
  },
  weather: { marginTop: -30, fontSize: 56, fontWeight: "700" },
  description: { marginTop: -6, fontSize: 22, fontWeight: "600" },
});
