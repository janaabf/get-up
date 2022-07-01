import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, container, link } from '../../styles/constants';
import Header from '../Header';

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.black,
    height: 40,
    width: 300,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.white,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default function Main({ navigation }) {
  return (
    <SafeAreaView style={container}>
      <View>
        <Header title="welcome!" />
        <Text style={styles.text}>helloo</Text>
        <Pressable onPress={() => navigation.navigate('Login')} style={buttons}>
          <Text style={styles.text}>Login page</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')} style={link}>
          <Text style={link}>Registration page</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
