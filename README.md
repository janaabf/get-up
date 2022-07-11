# sleep companion

Welcome to my final project for the upLeveled bootcamp!

This is a mobile alarm app made with expo/react native for the front end and next.js for the backend.

# Get Started

1. Start frontend in `expo-app`: `yarn start` or `expo start` (or to run on localhost when connecting to a usb device: `yarn start --localhost`)
2. Start backend in `next-backend`: `yarn dev`

# Dev Tools for React Native

There are two options: one is to use the debugging features already on your machine (differs a little bit with each emulator), or using the React Native Debugger (recommended!)

## React Native Debugger:

Docs: https://docs.expo.dev/workflow/debugging/

1. Download setup file for windows (used here: react_native_debugger-0.12.1-setup.exe) here:
   https://github.com/jhen0409/react-native-debugger/releases

2. Specify port (shortcuts: `Command+T` on macOS, `Ctrl+T` on Linux/Windows) --> 19000

3. start frontend server `yarn start` / `yarn start --localhost` (USB-connection) --> reload application if needed

4. Enable Network Inspect

5. (IF THE DEVTOOLS SHOW AN ERROR MESSAGE)

- Add a resolution into `expo-app` package.json, matching the version number of the Debugger (Written next to DevTools):

```
  "resolutions": {
  "react-devtools-core": "4.14.0"
}
```

- run `yarn`

6. Type `$r` in the console to see the breakdown of your selected element.

## Other Debugging Options

Gives less options, e.g. misses the Network Inspection and does not show the tree

### Expo Go (via QR-Code/Lan)

1. Shake phone
2. Select `Debug Remote JS`
3. Open: http://localhost:19002/
4. To access the react native debugger:
   Open http://localhost:19000/debugger-ui/
5. Inspect

### Android Studio/ Expo Go (via USB/Locahlhost)

1. press `a` in your running frontend server
2. press `ctrl` + `m` or run `adb shell input keyevent 82` in your terminal window.
3. Select `Debug Remote JS`
4. Open: http://localhost:19002/
5. for more information options access:
   - Open http://localhost:19000/debugger-ui/
   - Right click > inspect

---

        <TouchableOpacity
          onPress={async () => {
            await fetch(apiBaseUrl, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            navigation.navigate('Login');
          }}
          style={link}
        >
          <Text style={link}>Logout</Text>
        </TouchableOpacity>

import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../util/database';

type LogoutRequestBody = {
username: string;
password: string;
};

type LogoutNextApiRequest = Omit<NextApiRequest, 'body'> & {
body: LogoutRequestBody;
};

export default async function LogoutHandler(
request: LogoutNextApiRequest,
response: NextApiResponse<void>,
) {
if (request.method === 'DELETE') {
// 1. get the cookie from <TouchableOpacity
onPress={async () => {
await fetch(apiBaseUrl, {
method: 'DELETE',
headers: {
'Content-Type': 'application/json',
},
});
navigation.navigate('Login');
}}
style={link} >
<Text style={link}>Logout</Text>
</TouchableOpacity>
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSessionByToken } from '../../util/database';

type LogoutRequestBody = {
username: string;
password: string;
};

type LogoutNextApiRequest = Omit<NextApiRequest, 'body'> & {
body: LogoutRequestBody;
};

export default async function LogoutHandler(
request: LogoutNextApiRequest,
response: NextApiResponse<void>,
) {
if (request.method === 'DELETE') {
// 1. get the cookie from
