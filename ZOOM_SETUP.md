# Zoom Meeting SDK Setup Instructions

## ⚠️ Important: Not Compatible with Expo Go

The Zoom Meeting SDK for React Native **does NOT work in Expo Go** because it requires native code compilation.

## 🚀 Build Instructions

### 1. Prebuild the Project
```bash
npx expo prebuild
```

### 2. Install iOS Dependencies
```bash
cd ios && pod install && cd ..
```

### 3. Run on iOS
```bash
npx expo run:ios
```

### 4. Run on Android
```bash
npx expo run:android
```

## 🔧 Development Setup

### For iOS Development:
1. Make sure you have Xcode installed
2. Run `npx expo run:ios` to build and run on iOS Simulator
3. Or open `ios/ZoomMeetingApp.xcworkspace` in Xcode

### For Android Development:
1. Make sure you have Android Studio and Android SDK installed
2. Run `npx expo run:android` to build and run on Android Emulator
3. Or open the project in Android Studio

## 🎯 Testing the Zoom Integration

1. **Build the app** using the commands above (NOT Expo Go)
2. **Enter a real Zoom meeting ID** and password
3. **Enter your name**
4. **Click "Join Meeting"**
5. You should see the real Zoom video interface

## 🔑 JWT Token Security Note

Currently, JWT tokens are generated locally in the app for testing purposes. In production, you should:

1. Move JWT generation to your backend server
2. Create an API endpoint to generate meeting JWT tokens
3. Fetch the JWT token from your backend when joining meetings

## 📱 Expected Behavior

- ✅ SDK initializes with JWT token
- ✅ Meeting join form accepts meeting ID, password, and username
- ✅ Real Zoom video interface appears after joining
- ✅ Custom controls for mute, video, and leave meeting
- ✅ Proper error handling and user feedback

## 🐛 Troubleshooting

### "SDK not available" error:
- Make sure you're not testing in Expo Go
- Use `npx expo run:ios` or `npx expo run:android`

### "joinMeeting method not available" error:
- This usually means you're in Expo Go
- Build the app using the instructions above

### Meeting join fails:
- Check that the meeting ID and password are correct
- Verify the meeting is active and allows participants
- Check console logs for detailed error information