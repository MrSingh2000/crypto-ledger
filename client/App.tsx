import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContextStore from './components/context/contextStore';
import { useContext, useEffect, useState } from 'react';
import defaultContext from './components/context/context';
import Main from './components/Main';


export default function App() {

  return (
    <>
      <ContextStore>
        <Main />
      </ContextStore>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
