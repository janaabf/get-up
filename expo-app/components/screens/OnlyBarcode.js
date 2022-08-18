import { Audio } from 'expo-av';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Notifications from 'expo-notifications';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, container } from '../../styles/constants';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.white,
  },
  modalView: {
    flex: 1,
    width: 405,
    margin: 70,

    alignItems: 'center',
  },
  barcode: {
    flex: 1,
    width: 400,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

// handles the notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AlarmRings({ navigation }) {
  const animation = useRef(null);
  const [sound, setSound] = useState();
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  // const [show, setShow] = useState(false); // show barcode scanner

  // sound
  async function playSound() {
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });

    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/Alarm-ringtone.mp3'),
      { shouldPlay: true, staysActiveInBackground: true },
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    const vibrationPattern = [1000, 500, 1000];
    Vibration.vibrate(vibrationPattern, true);
  }

  async function stopSound() {
    await sound.stopAsync();
    Vibration.cancel();
  }
  useEffect(() => {
    playSound();
    // sends notification
    async function scheduleNotificationAsync() {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm ringing!',
          body: 'time to get up~',
        },
        trigger: null,
      });
    }
    scheduleNotificationAsync().catch(() => {});
  }, []);

  const handleBarCodeScanned = () => {
    setScanned(true);
    stopSound();
    alert(`You did it! Good morning <3`);
    setBarcodeModalVisible(false);
    navigation.push('Alarm');
  };

  return (
    <SafeAreaView style={container}>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={barcodeModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setBarcodeModalVisible(!barcodeModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barcode}
              />
            </View>
          </View>
        </Modal>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            height: 400,
            backgroundColor: colors.black,
          }}
          source={require('../../assets/alarm-animation.json')}
        />
        <TouchableOpacity
          onPress={() => {
            {
              setBarcodeModalVisible(true);
              setScanned(false);
            }
          }}
          style={buttons}
        >
          <>
            <Text style={styles.text}>Stop Alarm</Text>
          </>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
