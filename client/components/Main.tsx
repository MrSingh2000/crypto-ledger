import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { NativeBaseProvider } from "native-base";
import { useContext, useEffect, useState } from 'react';
import Contact from './Contact';
import Home from './Home';
import defaultContext from './context/context';
import ContextStore from './context/contextStore';
import Singin from './auth/Signin';
import Signup from './auth/Signup';
import Preloader from './Preloader';


const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();


export default function Main() {
    const { token, loading } = useContext(defaultContext);
    return(
        <>
            <NativeBaseProvider>
                <NavigationContainer >
                    {
                        (!token || token === "") ? (
                            <Stack.Navigator>
                                <Stack.Screen options={{
                                    headerShown: false,
                                }} name="Signin"
                                    component={Singin} />
                                <Stack.Screen name="Signup" component={Signup} />
                            </Stack.Navigator>
                        ) : (
                            <Tab.Navigator labeled={false} style={{ marginTop: Constants.statusBarHeight }}>
                                <Tab.Screen options={{
                                    tabBarIcon: () => (
                                        <AntDesign name="home" size={26} color="black" />
                                    )
                                }} name="Home" component={Home} />
                                <Tab.Screen options={{
                                    tabBarIcon: () => (
                                        <AntDesign name="contacts" size={26} color="black" />
                                    )
                                }} name="Contact" component={Contact} />
                            </Tab.Navigator>
                        )
                    }
                </NavigationContainer >
            </NativeBaseProvider>
        </>
    )
}