import React, { useState } from 'react';
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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: colors.highlight,
  },
});

export default function UserProfile({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [sleepTime, onChangeSleepTime] = useState('');

  return (
    <SafeAreaView style={container}>
      <View>
        <View>
          <Text style={back}>{'<'} back</Text>
        </View>
        <Header title="profile" />

        {/* <View style={styles.headerContainer}>
          <Text style={titles}>profile</Text>
        </View> */}
        <Text style={styles.text}>Please enter your information:</Text>
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
        </View>
        <TouchableOpacity style={buttons}>
          <Text style={styles.text}>save changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Welcome')}
          style={link}
        >
          <Text style={link}>{'<'} go back without saving changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
