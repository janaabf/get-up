import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import UserProfile from './components/screens/users/Profile';
import Welcome from './components/screens/Welcome';
import { UserContext } from './components/util/Context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  return (
    // useContext is used to share user Information across all pages
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
