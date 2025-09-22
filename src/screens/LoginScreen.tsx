// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useAuth } from '@context/AuthContext';
// import { useAppTheme } from '@hooks/useAppTheme';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('eve.holt@reqres.in');
//   const [password, setPassword] = useState('pistol');
//   const [error, setError] = useState('');
//   const { login, isLoading } = useAuth();
//   const { theme } = useAppTheme();

//   const handleLogin = async () => {
//     setError('');
    
//     if (!email.trim() || !password.trim()) {
//       setError('Please enter both email and password');
//       return;
//     }

//     const success = await login(email.trim(), password);
    
//     if (!success) {
//       setError('Login failed. Please check your credentials.');
//     }
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       padding: 20,
//       backgroundColor: theme.colors.background,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 30,
//       color: theme.colors.text,
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: theme.colors.border,
//       borderRadius: 8,
//       padding: 12,
//       marginBottom: 16,
//       fontSize: 16,
//       backgroundColor: theme.colors.background,
//       color: theme.colors.text,
//     },
//     button: {
//       backgroundColor: theme.colors.primary,
//       padding: 15,
//       borderRadius: 8,
//       alignItems: 'center',
//       marginTop: 10,
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     errorText: {
//       color: 'red',
//       textAlign: 'center',
//       marginTop: 10,
//       fontSize: 14,
//     },
//     disabledButton: {
//       backgroundColor: theme.colors.disabled,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor={theme.colors.placeholder}
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
      
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor={theme.colors.placeholder}
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         autoCapitalize="none"
//         autoCorrect={false}
//       />
      
//       <TouchableOpacity
//         style={[styles.button, isLoading && styles.disabledButton]}
//         onPress={handleLogin}
//         disabled={isLoading}
//       >
//         <Text style={styles.buttonText}>
//           {isLoading ? 'Logging in...' : 'Login'}
//         </Text>
//       </TouchableOpacity>
      
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//     </View>
//   );
// };

// export default LoginScreen;


import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { Button, Text, TextInput } from '../components';

const LoginScreen = () => {
  const [username, setUsername] = useState('emilys'); // ✅ default test user
  const [password, setPassword] = useState('emilyspass');   // ✅ default test password
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { theme } = useAppTheme();

  const handleLogin = async () => {
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    const success = await login(username.trim(), password);

    if (!success) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      color: theme.colors.text,
    },
    inputContainer: {
      marginBottom: 16,
    },
    button: {
      backgroundColor: theme.colors.primary,
      marginTop: 10,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
      fontSize: 14,
    },
    disabledButton: {
      backgroundColor: theme.colors.disabled,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    loadingContainer: {
      backgroundColor: theme.colors.background,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text.H1 style={styles.title}>Login</Text.H1>

      <TextInput
        containerStyle={styles.inputContainer}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <TextInput
        containerStyle={styles.inputContainer}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        editable={!isLoading}
      />

      <Button
        buttonText={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
        buttonStyle={[styles.button, isLoading && styles.disabledButton]}
      />

      {error ? <Text.Span style={styles.errorText}>{error}</Text.Span> : null}

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text.H4 style={styles.loadingText}>Logging in...</Text.H4>
          </View>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;
