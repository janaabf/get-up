import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, text } from '../../styles/constants';
import Header from '../Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.text,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Register({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title="register" />
        <Text style={styles.input}>oh my it is finally working</Text>
        <Pressable onPress={() => navigation.navigate('Main')} style={buttons}>
          <Text style={text}>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
