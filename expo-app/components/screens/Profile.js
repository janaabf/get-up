import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useContext, useState } from 'react';
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
import { UserContext } from '../util/Context';

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
    alignSelf: 'flex-start',
    color: colors.white,
    fontSize: 18,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: colors.highlight,
  },
});

const { manifest } = Constants;

// access api url
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/logout`
    : 'https://api.example.com';

export default function UserProfile({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [sleepTime, onChangeSleepTime] = useState('');
  const { setUser } = useContext(UserContext);

  // logout function
  async function logoutHandler() {
    // fetch userinfo from database
    await fetch(apiBaseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setUser(null);
  }

  return (
    <SafeAreaView style={container}>
      <View>
        <AntDesign
          name="arrowleft"
          size={24}
          style={back}
          onPress={() => navigation.push('Welcome')}
        />
        <Header title="profile" />
        {/* <Text style={styles.text}>Please enter your information:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>name:</Text>
          <TextInput
            style={styles.input}
            textContentType="username"
            placeholder="how should we call you?"
            onChangeText={onChangeUsername}
            value={username}
          />
          <Text style={styles.text}>desired hours of sleep:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 7.5"
            onChangeText={onChangeSleepTime}
            value={sleepTime}
          />
        </View> */}
        <View style={styles.inputContainer}>
          <Text style={styles.text}>username: {'  '}Jana</Text>
          <Text>
            {'\n'}
            {'\n'}
          </Text>
          <Text style={styles.text}>time format: {'  '}24 hours</Text>
          {/* <Text style={styles.text}>desired hours of sleep:</Text> */}
        </View>
        {/* <TouchableOpacity style={buttons}>
          <Text style={styles.text}>edit</Text>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Text style={link}>edit information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logoutHandler().catch((e) => {
              console.log(e);
            });
          }}
        >
          <Text style={link}>logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
