import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
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


