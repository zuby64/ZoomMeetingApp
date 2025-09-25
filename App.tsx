import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { QueryProvider } from './src/providers/QueryProvider';
import { ZoomSDKProvider } from '@zoom/meetingsdk-react-native';
import { generateSDKJWT } from './src/services/zoom/jwtGenerator';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [sdkInitialized, setSdkInitialized] = useState(true); // Assume SDK is ready when JWT is available

  useEffect(() => {
    const initializeZoomSDK = () => {
      try {
        console.log('Initializing Zoom SDK with JWT token...');
        
        // Generate proper JWT token using the official Zoom SDK pattern
        const token = generateSDKJWT();
        console.log('JWT token generated for Zoom Meeting SDK:', token.substring(0, 50) + '...');
        setJwtToken(token);
        console.log('✅ Zoom SDK Provider will initialize with JWT token');
      } catch (error) {
        console.error('Failed to generate JWT token:', error);
        setJwtToken(null);
      }
    };

    initializeZoomSDK();
  }, []);

  if (!jwtToken) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <QueryProvider>
              <AuthProvider>
                <AppNavigator />
              </AuthProvider>
            </QueryProvider>
            <FlashMessage 
              position="top" 
              floating={true}
              style={styles.flashMessageStyle}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <QueryProvider>
              <ZoomSDKProvider
                config={{
                  jwtToken: jwtToken,
                  domain: 'zoom.us',
                  enableLog: true,
                  logSize: 50,
                }}
              >
                <AuthProvider>
                  <AppNavigator sdkInitialized={sdkInitialized} />
                </AuthProvider>
              </ZoomSDKProvider>
            </QueryProvider>
            <FlashMessage 
              position="top" 
              floating={true}
              style={styles.flashMessageStyle}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMessageStyle: { 
    paddingTop: 50,
    zIndex: 9999,
  }
});