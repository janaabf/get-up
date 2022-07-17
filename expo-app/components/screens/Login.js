import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  buttons,
  colors,
  container,
  link,
  titles,
} from '../../styles/constants';
import { UserContext } from '../util/Context';

const { manifest } = Constants;

// access api url
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/login`
    : 'https://api.example.com';

// styles
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
  const [appIsReady, setAppIsReady] = useState(false);
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { setUser } = useContext(UserContext);

  // load font
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

  // login function
  async function loginHandler() {
    // fetch userinfo from database
    const loginResponse = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    console.log(loginResponse.headers);

    const loginResponseBody = await loginResponse.json();

    console.log('loginbody', loginResponseBody);

    // handling errors (user doesn't exist, pw wrong)
    if ('errors' in loginResponseBody) {
      console.log('error');
      setErrors(loginResponseBody.errors);
      return;
    } else {
      setUser({
        id: loginResponseBody.user.id,
      });
      // navigation.push('Welcome');
      return;
    }
  }

  if (!appIsReady) {
    return <View style={container} />;
  }
  return (
    <SafeAreaView onLayout={onLayoutRootView} style={container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={titles}>login</Text>
        </View>
        <Text style={styles.text}>username</Text>
        <TextInput
          style={styles.input}
          textContentType="name"
          placeholder="username"
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
      {errors.map((error) => (
        <Text style={styles.text} key={`error-${error.message}`}>
          {error.message}
        </Text>
      ))}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            loginHandler().catch((e) => {
              console.log(e);
            });
          }}
          style={buttons}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Register')}
          style={link}
        >
          <Text style={link}>new here? register {'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
