import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, container } from '../../styles/constants';

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
  timeleft: {
    fontFamily: 'Comfortaa_400Regular',
    color: 'grey',
  },
});

export default function AlarmRings({ navigation }) {
  const [sound, setSound] = useState();
  // const [show, setShow] = useState(false); // show barcode scanner

  // sound
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Alarm-ringtone.mp3'),
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    const vibrationPattern = [1000, 500, 1000];
    Vibration.vibrate(vibrationPattern, true);
  }

  async function stopSound() {
    await sound.stopAsync();
  }
  useEffect(() => {
    playSound();
  }, []);

  // to stop sound from looping
  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <SafeAreaView style={container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            playSound();
          }}
          style={buttons}
        >
          <Text style={styles.text}>play sound</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            stopSound();
            // setSound();
            Vibration.cancel();
            // navigation.push('Alarm');
          }}
          style={buttons}
        >
          <Text style={styles.text}>stop sound</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Scanner');
          }}
          style={buttons}
        >
          <Text style={styles.text}>Barcode Scanner</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
