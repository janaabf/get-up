import './components/util/Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Alarm from './components/screens/Alarm';
import AlarmRings from './components/screens/AlarmRings';
import Login from './components/screens/Login';
import UserProfile from './components/screens/Profile';
import Register from './components/screens/Register';
import Welcome from './components/screens/Welcome';
import { UserContext } from './components/util/Context';

const { manifest } = Constants;

// access api url
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/profile`
    : 'https://api.example.com';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  // check for session token
  useEffect(() => {
    async function getUserProfile() {
      const profileResponse = await fetch(apiBaseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const profileResponseBody = await profileResponse.json();
      console.log('welcome user', profileResponseBody.user);

      if ('error' in profileResponseBody) {
        console.log('error', profileResponseBody);
        return;
      }
      // if user is not undefined (token in session) retrieve User, Rating and Timeslots from database and set to state
      setUser(profileResponseBody.user);
      return;
    }

    getUserProfile().catch((error) => console.log(error));
  }, []);

  return (
    // useContext is used to share user Information across all pages
    <UserContext.Provider value={{ setUser, user }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Alarm" component={Alarm} />
              <Stack.Screen name="AlarmRings" component={AlarmRings} />
              <Stack.Screen name="Profile" component={UserProfile} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
    // <NavigationContainer>
    //   <StatusBar style="light" />
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Alarm" component={Alarm} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
