import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { Text, View } from 'react-native';
import Login from './components/screens/Login';
import UserProfile from './components/screens/Profile';
import Register from './components/screens/Register';
import Welcome from './components/screens/Welcome';

// to store and use the user information across the app
export const UserContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ setUser, user }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Profile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
