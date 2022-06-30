import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './components/screens/Login';
import Register from './components/screens/Register';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Register" component={Register} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
