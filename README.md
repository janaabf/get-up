# get up!

Welcome to my final project for the upLeveled bootcamp!

This is a mobile alarm app made with expo/react native for the front end and next.js for the backend.

# Get Started

1. Start frontend in `expo-app`: `yarn start` or `expo start` (or when connecting to a device via USB: run locally with `expo start --localhost`)
2. Start backend in `next-backend`: `yarn dev`

# About the App

## What you can do:

1. Login or create an account (creates session token, so you stay logged in)
2. Set an alarm (it calculates the time left until it rings)
3. Edit alarm time once it is set
4. Stop alarm by scanning almost any QR or barcode

## Technologies Used

- React Native with Expo
- PostgreSQL

### Libraries/Tools:

- Prototype:

  - Figma
  - DrawSQL

- Main Expo features used:

  - Barcode Scanner
  - Notifications
  - Audio
  - Vector Icons

- Main external libraries for frontend:

  - use-react-countdown

- Main external libraries for backend:
  - postgres
  - dotenv-safe
  - cookie & js-cookie
  - node:crypto (to create random token)
  - bcrypt (to encrypt password)

# Dev Tools for React Native

There are two options: one is to use the debugging features already on your machine (differs a little bit with each emulator), or using the React Native Debugger (recommended!)

## React Native Debugger:

Docs: https://docs.expo.dev/workflow/debugging/

1. Download setup file for windows (used here: react_native_debugger-0.12.1-setup.exe) here:
   https://github.com/jhen0409/react-native-debugger/releases

2. Specify port (shortcuts: `Command+T` on macOS, `Ctrl+T` on Linux/Windows) --> 19000

3. start frontend server `yarn start` / `yarn start --localhost` (USB-connection) --> reload application if needed

4. Right Click > Enable Network Inspect

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
