


import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native'; // Import KeyboardAvoidingView
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../contexts/DataContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LottieView from "lottie-react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { emailPasswordLogin } = useContext(DataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = async () => {
    // Check if email and password are filled
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      setVisible(true);
      return;
    }

    try {
      await emailPasswordLogin(email, password);
    } catch (error) {
      setError(error.message);
      setVisible(true);
    }
  };

  const onDismissSnackBar = () => setVisible(false);
  const windowHeight = Dimensions.get('window').height; 
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={140} style={{backgroundColor:'white'}}
    >
      <View style={{...styles.container, backgroundColor:'white' }}>
        <View style={{ padding: 20}}>
          <LottieView
            source={require("../../assets/Login.json")}
            style={{ width: 350, height: 350 }}
            autoPlay
            loop
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
          <Button mode="contained" onPress={handleLogin} style={[styles.button, { marginBottom: 10 }]}>
            Login
          </Button>
          <Button onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: '#336699'}}>  Don't have an account? Sign Up here</Text>

          </Button>
          <TouchableOpacity onPress={() => navigation.navigate('forget')}>
            <Text style={{ color: '#336699', marginTop: 10 }}>Forgot Password</Text>
          </TouchableOpacity>
          
          <Snackbar
  visible={visible}
  onDismiss={onDismissSnackBar}
  duration={3000}
  style={[styles.snackbar, { bottom: 20 }]} // Apply custom style for Snackbar and position it at the bottom
  action={{
    label: 'OK',
    onPress: () => {
      // Do something when action button is pressed
      onDismissSnackBar();
    },
  }}
>
  
            {error}
          </Snackbar>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E4E2', // Platinum white color
    justifyContent: 'center',
    alignItems: 'center',
  },
  snackbar: {
    backgroundColor: '#333', // Custom background color for Snackbar
    borderRadius: 8, // Adjust border radius for a more modern look
  },
  button: {
    backgroundColor: '#336699', // Desired button color
  },
});

export default LoginScreen;



