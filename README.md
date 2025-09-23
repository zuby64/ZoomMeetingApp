A React Native Expo application with authentication, meeting functionality(Pending), and comprehensive testing setup.


## 🚀 Features

- **Authentication System** - Login/logout with token management
- **Clean API Layer** - Axios-based services with React Query
- **Custom UI Components** - Reusable Button, Text, TextInput, Loading components
- **Theme Support** - Light/dark theme with system preference
- **Internationalization** - Multi-language support (English/Arabic)
- **Comprehensive Testing** - Jest + React Native Testing Library
- **TypeScript** - Full type safety throughout the application

## 📱 Screens

- **Login Screen** - User authentication with validation
- **Home Screen** - Welcome screen with navigation options
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
- **TypeScript** - Type safety
- **React Navigation** - Navigation
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
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

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on specific platforms**
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

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

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run on web browser |
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

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Happy Coding! 🚀**
