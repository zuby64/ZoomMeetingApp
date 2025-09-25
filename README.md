# Zoom Meeting App

## 🚀 Features

- **Real Zoom Video Calling** - Join Zoom meetings with actual video/audio
- **Authentication System** - Login/logout with token management
- **Meeting Controls** - Mute, video toggle, and leave meeting functionality
- **JWT Token Management** - Secure meeting authentication
- **Clean API Layer** - Axios-based services with React Query
- **Custom UI Components** - Reusable Button, Text, TextInput, Loading components
- **Theme Support** - Light/dark theme with system preference
- **Internationalization** - Multi-language support (English/Arabic)
- **Comprehensive Testing** - Jest + React Native Testing Library
- **TypeScript** - Full type safety throughout the application

## ⚠️ Important Requirements

### Video Calling Limitations
- **❌ NOT Compatible with Expo Go** - Video calling will not work in Expo Go
- **✅ Real Device Required** - Must test on actual iOS/Android device
- **✅ Custom Build Required** - Use `expo prebuild` and build the app
- **✅ Native Dependencies** - Zoom SDK requires native code compilation

### Why Expo Go Doesn't Work
The Zoom Meeting SDK includes native iOS and Android code that cannot run in Expo Go. You must create a custom development build or use bare React Native.

## 📱 Screens

- **Login Screen** - User authentication with validation
- **Home Screen** - Welcome screen with navigation options
- **Meeting Screen** - Join Zoom meetings with video calling
- **Profile Screen** - User profile management
- **Not Found Screen** - 404 error handling

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── __tests__/      # Component tests
│   ├── Button.tsx      # Custom button component
│   ├── Text.tsx        # Typography components
│   ├── TextInput.tsx   # Form input component
│   └── Loading.tsx     # Loading indicator
├── services/           # API layer
│   ├── auth/          # Authentication services
│   │   ├── __tests__/ # Service tests
│   │   ├── auth.interface.ts
│   │   ├── auth.methods.ts
│   │   └── useAuth.ts
│   ├── zoom/          # Zoom SDK services
│   │   ├── zoom.interface.ts
│   │   ├── zoom.methods.ts
│   │   ├── jwtGenerator.ts
│   │   └── useZoom.ts
│   ├── meeting/       # Meeting services
│   ├── axiosClient.ts # Axios configuration
│   └── index.ts       # Service exports
├── context/           # React Context providers
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # App screens
├── constant/         # Constants and enums
├── core/            # Theme and core utilities
└── utils/           # Utility functions
```

## 🛠️ Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **Zoom Meeting SDK** - Real video calling functionality
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **JWT (jsrsasign)** - Token generation for Zoom SDK
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZoomMeetingApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build for Zoom SDK (REQUIRED for video calling)**
   ```bash
   # Prebuild the project for native dependencies
   npm run prebuild
   
   # Install iOS dependencies
   cd ios && pod install && cd ..
   ```

4. **Run on specific platforms**
   ```bash
   # For video calling (REAL DEVICE REQUIRED)
   npm run zoom:ios      # iOS device/simulator
   npm run zoom:android  # Android device/emulator
   
   # Regular development (NO video calling)
   npm run ios           # iOS simulator
   npm run android       # Android emulator
   npm run web           # Web browser
   ```

## 🎥 Video Calling Setup

### Prerequisites
- **Real iOS/Android device** (simulators may work but real device recommended)
- **Expo CLI** installed globally
- **Xcode** (for iOS) or **Android Studio** (for Android)

### Build Commands
```bash
# Setup Zoom SDK
npm run zoom:setup

# Run on iOS
npm run zoom:ios

# Run on Android  
npm run zoom:android
```

### Testing Video Calling
1. Build the app using the commands above
2. Install on a real device
3. Navigate to "Join Meeting" screen
4. Enter a real Zoom meeting ID and password
5. Experience actual video calling!

## 🧪 Testing

This project includes comprehensive testing setup with Jest and React Native Testing Library.

### Test Commands
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
```

### Test Structure
```
src/
├── components/__tests__/
│   └── Button.test.tsx        # Button component tests (11 tests)
├── services/auth/__tests__/
│   └── auth.methods.test.ts   # Auth service tests (6 tests)
└── setupTests.ts              # Global test setup
```

### Test Coverage
- ✅ **17 tests passing**
- ✅ **0 tests failing**
- ✅ **Unit tests** for services and components
- ✅ **Mocking** of external dependencies
- ✅ **TypeScript support** in tests

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Button.test.tsx
```

## 🔧 Development

### Code Quality
```bash
npm run lint      # Run ESLint
npm run format    # Format code with Prettier
```

### API Layer Usage
```typescript
// Using auth services
import { AuthHooks } from '@/services';

const { mutateAsync: login, isPending } = AuthHooks.useLogin();

const handleLogin = async () => {
  try {
    await login({ username, password });
  } catch (error) {
    // Handle error
  }
};
```

### Custom Components
```typescript
import { Button, Text, TextInput } from '@/components';

<Button 
  buttonText="Login" 
  onPress={handleLogin}
  buttonStyle={customStyles}
/>
```

## 🌐 Internationalization

The app supports multiple languages:
- **English** (default)
- **Arabic** (RTL support)

Language files are located in `src/118n/locale/`.

## 🎨 Theming

The app supports light/dark themes with system preference detection:
- **Light Theme** - Default light colors
- **Dark Theme** - Dark mode colors
- **System Theme** - Follows device preference

## 📱 API Integration

### Authentication
- **Login**: `POST /auth/login`
- **User Profile**: `GET /auth/me`
- **Logout**: Local token removal

### Meeting Services (Placeholder)
- **Join Meeting**: `POST /meetings/join`
- **Create Meeting**: `POST /meetings/create`
- **Meeting Details**: `GET /meetings/:id`

## 🔐 Environment Variables

Create a `.env` file in the root directory:
```env
API_BASE_URL=https://your-api-url.com
```

## 🔑 Zoom SDK Configuration

The app uses Zoom Meeting SDK with JWT token authentication. The SDK credentials are currently hardcoded for testing purposes:

```typescript
// In src/services/zoom/jwtGenerator.ts
const ZOOM_MEETING_SDK_KEY = 'PTEXFnRWRMinKQm6M1lLvg';
const ZOOM_MEETING_SDK_SECRET = 'gfAJLs6vWV49k1JWNIrnsF52GuiHXbFD';
```

### Production Setup
For production, you should:
1. Move JWT generation to your backend server
2. Create an API endpoint to generate meeting JWT tokens
3. Store SDK credentials securely on the server
4. Fetch JWT tokens from your backend when joining meetings

### Security Note
⚠️ **Never expose SDK secrets in client apps in production!** The current implementation is for testing only.

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator (no video calling) |
| `npm run android` | Run on Android emulator (no video calling) |
| `npm run web` | Run on web browser |
| `npm run prebuild` | Prebuild for native dependencies |
| `npm run zoom:setup` | Setup Zoom SDK (prebuild + pod install) |
| `npm run zoom:ios` | Run on iOS with video calling support |
| `npm run zoom:android` | Run on Android with video calling support |
| `npm run build:ios` | Full iOS build with video calling |
| `npm run build:android` | Full Android build with video calling |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests to ensure they pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install
   ```

3. **Test failures**
   ```bash
   npm test -- --verbose
   ```

4. **TypeScript errors**
   ```bash
   npx tsc --noEmit
   ```

### Zoom SDK Issues

1. **"SDK not available" error**
   - Make sure you're not testing in Expo Go
   - Use `npm run zoom:ios` or `npm run zoom:android`
   - Check that the app is built with native dependencies

2. **"joinMeeting method not available" error**
   - This usually means you're in Expo Go
   - Build the app using the proper commands
   - Check console logs for available methods

3. **Video calling not working**
   - Ensure you're on a real device (not simulator)
   - Check that Zoom SDK is properly initialized
   - Verify JWT token generation is working

4. **Build errors with Zoom SDK**
   ```bash
   # Clean and rebuild
   npx expo prebuild --clean
   cd ios && pod install && cd ..
   npm run zoom:ios
   ```

5. **Permission issues on iOS**
   - Add camera and microphone permissions to Info.plist
   - Check that permissions are granted in device settings

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Coding! 🚀**
