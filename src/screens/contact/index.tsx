import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Snackbar } from 'react-native-paper';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ContactUsScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSendMessage = () => {
    if (email && message) {
      firestore()
        .collection('contactUsMessages')
        .add({
          email,
          message,
          timestamp: firestore.Timestamp.fromDate(new Date())
        })
        .then(() => {
          setSnackbarVisible(true);
          setEmail('');
          setMessage('');
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    } else {
      console.error('Email and message are required!');
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAwareScrollView
    enableOnAndroid={true}
    extraHeight={140}
    >
      <View style={styles.container}>
        <LottieView
          source={require("../../../assets/contact.json")}
          style={{ width: 350, height: 400, alignSelf: 'center' }}
          autoPlay
          loop
        />
        <View style={styles.inputContainer}>
          <Kohana
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'envelope-o'}
            iconColor={'#6b4fa9'}
            iconSize={20}
            inputPadding={16}
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Kohana
            label={'Message'}
            iconClass={FontAwesomeIcon}
            iconName={'comment-o'}
            iconColor={'#6b4fa9'}
            iconSize={20}
            inputPadding={16}
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={text => setMessage(text)}
            multiline
            numberOfLines={4}
          />
        </View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSendMessage}>
          Send Message
        </Button>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          style={{ backgroundColor: '#6b4fa9' }}
        >
          Message sent successfully!
        </Snackbar>
      </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  inputField: {
    color: '#333',
  },
  messageInput: {
    height: 100,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#336699', // Use a vibrant color
    overflow: 'hidden', // Ensures the ripple effect does not go outside the button boundaries
  },
});

export default ContactUsScreen;
