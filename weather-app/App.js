import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as Location from "expo-location";

export default function App() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");

  const ask = async () => {
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
  };

  useEffect(() => {
    ask();
  });

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <View style={styles.weather}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.day, { width: SCREEN_WIDTH }]}>
            <Text style={styles.temperature}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={[styles.day, { width: SCREEN_WIDTH }]}>
            <Text style={styles.temperature}>28</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={[styles.day, { width: SCREEN_WIDTH }]}>
            <Text style={styles.temperature}>29</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={[styles.day, { width: SCREEN_WIDTH }]}>
            <Text style={styles.temperature}>30</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
          <View style={[styles.day, { width: SCREEN_WIDTH }]}>
            <Text style={styles.temperature}>31</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "tomato" },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
  },
  day: {
    alignItems: "center",
  },
  temperature: {
    marginTop: 50,
    fontSize: 178,
    fontWeight: "700",
  },
  description: { marginTop: -30, fontSize: 60, fontWeight: "600" },
});
