import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { NavigationHelpersContext } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import react, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReactCountdown } from 'use-react-countdown';
import { back, buttons, colors, container, link } from '../../styles/constants';
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
  timeleft: {
    fontFamily: 'Comfortaa_400Regular',
    color: 'grey',
    alignSelf: 'center',
  },
  alarm: {
    flex: 1,
    textAlign: 'center',
  },
  alarmTime: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.white,
    fontSize: 40,
    alignSelf: 'center',
  },
});

export default function Alarm({ navigation }) {
  const [date, setDate] = useState(new Date()); // time for alarm
  const [show, setShow] = useState(false); // show time/date picker
  const [text, setText] = useState(); // display text

  // handles setting the alarm time (Date format)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log(currentDate);
    setDate(currentDate);
    setText(`${currentDate.getHours()}:${currentDate.getMinutes()}`);
  };

  // calculate time left until alarm rings
  let dateToEndCountdownAt = new Date(date);
  const { days, hours, minutes, seconds } =
    useReactCountdown(dateToEndCountdownAt);

  // handles and sets the notification once the date is set
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // calls the notification when time is picked
  useEffect(() => {
    const alarmTime = new Date(date);
    alarmTime.setSeconds(0);
    const dateNow = new Date();
    const ringsInMilliseconds = alarmTime.getTime() - dateNow.getTime();

    if (text) {
      // so it skips notif on first render
      setTimeout(function activateAlarm() {
        console.log('it worked!');
        navigation.navigate('AlarmRings');
      }, ringsInMilliseconds);
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Alarm is set!',
          body: `You gotta get up at ${alarmTime.getHours()}:${alarmTime.getMinutes()} o'Clock`,
        },
        trigger: null,
      });
    }
  }, [text]);

  return (
    <SafeAreaView style={container}>
      <View>
        <TouchableOpacity onPress={() => navigation.push('Welcome')}>
          <Text style={back}>{'<'} back</Text>
        </TouchableOpacity>
        <Header title="alarm" />

        <View style={styles.alarm}>
          <TouchableOpacity
            onPress={() => {
              setShow(!show);
            }}
          >
            {text ? (
              <>
                <Text style={styles.alarmTime}>{text}</Text>
                <Text style={link}>edit time</Text>
              </>
            ) : (
              <Text style={link}>please set an alarm</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.timeleft}>
            Alarm ringing in {hours} hours and {minutes} minutes {'\n'}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.push('AlarmRings');
            }}
            style={link}
          >
            <Text style={link}>start alarm</Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePickerAndroid
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
