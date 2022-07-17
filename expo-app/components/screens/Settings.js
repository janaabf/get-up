import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  back,
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

export default function Settings({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <SafeAreaView style={container}>
      <View>
        <Text style={back}>back</Text>
      </View>
      <Header title="settings" />
      <View style={styles.container}>
        <Text style={styles.text}>e-mail</Text>
        <TextInput
          style={styles.input}
          textContentType="name"
          placeholder="e-mail"
          onChangeText={onChangeUsername}
          value={username}
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
        <TouchableOpacity
          onPress={() => navigation.push('Main')}
          style={buttons}
        >
          <Text style={styles.text}>save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
