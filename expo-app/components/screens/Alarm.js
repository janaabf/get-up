import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, container, link } from '../../styles/constants';

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
});

export default function Alarm() {
  const [date, setDate] = useState(new Date()); // time for alarm
  const [show, setShow] = useState(false); // show time/date picker
  const [text, setText] = useState('please set an alarm!'); // display text

  // handles time change (Date format)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log(currentDate);
    setDate(currentDate);
    setText(
      `Alarm set for: ${currentDate.getHours()}:${currentDate.getMinutes()} o'Clock`,
    );
  };

  //

  return (
    <SafeAreaView style={container}>
      <View>
        <Text style={styles.text}>{text}</Text>
        {/* <Text style={styles.text}>alarm will ring in {timeLeftUntilRing}</Text> */}

        <Pressable
          onPress={() => {
            setShow(!show);
            setAlarmIsSet(!alarmIsSet);
          }}
          style={link}
        >
          <Text style={link}>pick time</Text>
        </Pressable>
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
    </SafeAreaView>
  );
}
