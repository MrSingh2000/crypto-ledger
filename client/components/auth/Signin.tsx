import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Image } from 'expo-image';
import { Images } from "../assets";
import defaultContext from "../context/context";


export default function Singin({ navigation, route }: {
  navigation: any
  route: any
}) {
  const { token, setToken } = useContext(defaultContext);

  const { handleLogin } = useContext(defaultContext);

  const [data, setData] = useState<{
    username: string,
    password: string
  }>({ username: "", password: "" });

  const handleChange = (key: string, e: string) => {
    console.log(data);
    setData(oldState => ({ ...oldState, [key]: e }));
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={Images.logo}
        contentFit="contain"
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(e) => handleChange("username", e)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(e) => handleChange("password", e)}
        />
      </View>
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginBtn} onPress={() => { handleLogin(data); setData({ username: "", password: "" }); }}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 150,
    width: 150,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  loginText: {
    height: 30,
  }
});