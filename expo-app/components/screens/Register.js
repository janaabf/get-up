import Constants from 'expo-constants';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
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
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/register`
    : 'https://api.example.com';

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
  error: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.pink,
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

export default function Register({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { setUser } = useContext(UserContext);

  async function registerHandler() {
    const registerResponse = await fetch(apiBaseUrl, {
      // use api from expo app on dev tools
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const registerResponseBody = await registerResponse.json();

    console.log('responsebody', registerResponseBody);

    // if user exists: error
    // if user doesn't exist set user & go to welcome
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      console.log('error');
      return;
    } else {
      setUser({
        id: registerResponseBody.user.id,
      });
      navigation.push('Welcome');
      return;
    }
  }

  return (
    <SafeAreaView style={container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={titles}>register</Text>
        </View>
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
      {errors.map((error) => (
        <Text style={styles.text} key={`error-${error.message}`}>
          {error.message}
        </Text>
      ))}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            registerHandler().catch((e) => {
              console.log(e);
            });
          }}
          style={buttons}
        >
          <Text style={styles.text}>register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Login')} style={link}>
          <Text style={link}>{'<'} login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
