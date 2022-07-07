import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  buttons,
  colors,
  container,
  link,
  titles,
} from '../../styles/constants';
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function Login({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <SafeAreaView style={container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={titles}>Settings</Text>
        </View>
        <Text style={styles.text}>e-mail</Text>
        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="e-mail"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.text}>password</Text>

        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('Main')} style={buttons}>
          <Text style={styles.text}>save changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
