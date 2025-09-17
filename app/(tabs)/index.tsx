import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [city, setCity] = React.useState("stockholm");
  const [temp, setTemp] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [weather, setWeather] = React.useState("");
  const [error, setError] = React.useState<Error>()
  console.log(process.env.EXPO_PUBLIC_API_KEY)
  const API = process.env.EXPO_PUBLIC_API_KEY 
  console.log(API)

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
      );
      const data = await res.json();
      setTemp(data.main.temp);
      setImage(data.weather[0].icon);
      setWeather(data.weather[0].description);
    } catch (err) {
      if(err instanceof Error) {

        setError(err)
      }
      console.log(error)
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.div}>
          <Text style={styles.titleContainer}>What is the weather atm?</Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            onChangeText={setCity}
          ></TextInput>
          <View style={styles.button}>
            <Button
              color="#e36ce7ff"
              title="Go"
              onPress={fetchWeather}
            ></Button>
          </View>
          {error && <Text>Error: {error.message}</Text>}
          {weather && <View style={styles.div}>
              <Text style={{textAlign: 'center'}}>Chosen city: {city}</Text>
              <Text style={{textAlign: 'center'}}>Temperature: {temp.toFixed(2)}</Text>
              <Text style={{textAlign: 'center'}}>Weather: {weather} </Text>
              <Image
                style={styles.img}
                source={{
                  uri: `https://openweathermap.org/img/wn/${image}@2x.png`,
                }}
              />
          </View>}
          
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: " #272020ff",
    color: "#000000",
    margin: 100,
    fontSize: 20
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: 280,
    borderRadius: 10,
    marginBottom: 50,
  },
  div: {
    alignItems: "center",
    margin: 10,
  },
  img: {
    height: 100,
    width: 100,
    backgroundColor: "#e36ce7ff",
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10
  },
  button: {
    width: 100,
    marginBottom: 20,
  },
});
