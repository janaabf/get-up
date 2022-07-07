import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: 350,
  },

  title: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.white,
    fontSize: 36,
  },
});

export default function Header(props, { navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
}
