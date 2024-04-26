// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { TextInput, Button, Text } from 'react-native-paper';
// import auth from '@react-native-firebase/auth';
// import LottieView from 'lottie-react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const ForgotPasswordScreen = () => {
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetError, setResetError] = useState('');
//   const [resetSuccess, setResetSuccess] = useState(false);

//   const handleForgotPassword = async () => {
//     try {
//       await auth().sendPasswordResetEmail(resetEmail);
//       setResetSuccess(true);
//       setResetError('');
//     } catch (error) {
//       setResetError(error.message);
//       setResetSuccess(false);
//     }
//   };

//   return (
//     <KeyboardAwareScrollView
//     enableOnAndroid={true}
//     extraHeight={100}
//     >

//     <View style={styles.container}>
//       {resetSuccess && <Text>Password reset email sent successfully!</Text>}
//       {!!resetError && <Text style={{ color: 'red' }}>{resetError}</Text>}

//       <LottieView
//       source={require("../../assets/forget.json")}
//       style={{width: 400, height: 400}}
//       autoPlay
//       loop
//     />

//       <TextInput
//         label="Email"
//         value={resetEmail}
//         onChangeText={setResetEmail}
//         mode="outlined"
//         style={{ marginBottom: 10 }}
//       />
//       <Button mode="contained" onPress={handleForgotPassword} style={{ marginBottom: 10 }}>
//         Send Reset Email
//       </Button>
//     </View>
//     </KeyboardAwareScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
// });

// export default ForgotPasswordScreen;




import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ForgotPasswordScreen = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { colors } = useTheme();

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(resetEmail);
      setResetSuccess(true);
      setResetError('');
    } catch (error) {
      setResetError(error.message);
      setResetSuccess(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={100}
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/forget.json")}
          style={styles.animation}
          autoPlay
          loop
        />

        {resetSuccess ? (
          <Text style={styles.successMessage}>Password reset email sent successfully!</Text>
        ) : (
          <Text style={[styles.errorMessage, { color: colors.error }]}>{resetError}</Text>
        )}

        <TextInput
          label="Email"
          value={resetEmail}
          onChangeText={setResetEmail}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon name="email" />}
        />
        <Button
          mode="contained"
          onPress={handleForgotPassword}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          uppercase={false}
        >
          Send Reset Email
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff', // A crisp white background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  animation: {
    width: Dimensions.get('window').width * 0.8, // Responsive width
    height: 300,
    alignSelf: 'center',
    // marginTop:80,
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 16,
    color: '#4CAF50', // Material Design green
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    width: '90%', // Responsive width
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    width: '90%', // Responsive width
    backgroundColor: '#336699', // Material Design indigo
    borderRadius: 5, // Rounded button edges
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
