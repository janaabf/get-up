import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/constants';

type Props = {
  title: string;
};

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.text,
    fontSize: 36,
  },
});
