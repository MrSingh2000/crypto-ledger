import React, { Component, useContext } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Images } from './assets';
import defaultContext from './context/context';

export default function Preloader() {
    const { loading } = useContext(defaultContext);

    return (
        <View style={styles.background}>
            <Image source={Images.loadergif} />
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});