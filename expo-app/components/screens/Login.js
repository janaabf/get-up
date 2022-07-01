import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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

export default function Login({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Comfortaa_400Regular });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare().catch((e) => console.log(e));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately!
      // If we call this after `setAppIsReady`, then we may see a blank screen while the app is loading its initial state and rendering its first pixels.
      // So instead, we hide the splash screen once we know the root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={container} />;
  }
  return (
    <SafeAreaView onLayout={onLayoutRootView} style={container}>
      <View style={styles.inputContainer}>
        <Header title="login" />
        <Text style={styles.text}>e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.text}>password</Text>

        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigation.navigate('Main')} style={buttons}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Register')} style={link}>
          <Text style={link}>new here? register {'>'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
