import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, link } from '../../styles/constants';
import Header from '../Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.text,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.text,
  },
  textAccent: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.accentText,
  },
});

export default function Main({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="welcome!" />
        <Text style={styles.input}>helloo</Text>
        <Pressable onPress={() => navigation.navigate('Login')} style={buttons}>
          <Text style={styles.text}>Login page</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')} style={link}>
          <Text style={styles.text}>Registration page</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
