import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import LottieView from "lottie-react-native";
import { Snackbar } from 'react-native-paper'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from 'react-native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      setVisible(true);
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
      setVisible(true);
    }
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <KeyboardAwareScrollView
    enableOnAndroid={true}
    extraHeight={140}
    >

      <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
        <LottieView
          source={require("../../assets/222.json")}
          style={{ width: 350, height: 400, alignSelf: 'center' }}
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
        <Button mode="contained" onPress={handleSignUp} style={{ marginBottom: 10 ,backgroundColor:'#336699'}}>
          Sign Up
        </Button>
        <Button onPress={() => navigation.goBack()} mode="outlined">
          <Text style={{color: '#336699'}}>Back to Login</Text>
        </Button>
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
    </KeyboardAwareScrollView>
  );
};


const styles = StyleSheet.create({
  
  snackbar: {
    backgroundColor: '#333', // Custom background color for Snackbar
    borderRadius: 8, // Adjust border radius for a more modern look
  },
 
});
export default SignupScreen;
