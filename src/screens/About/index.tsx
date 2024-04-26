// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Text, Button, TextInput } from 'react-native-paper';
// import firebase from 'firebase/app';

// const ContactUsScreen = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendMessage = () => {
//     if (email && message) {
//       const newMessageRef = firebase.database().ref('contactUsMessages').push();
//       newMessageRef.set({
//         email,
//         message,
//         timestamp: firebase.database.ServerValue.TIMESTAMP 
//       })
//       .then(() => {
  
//         setEmail('');
//         setMessage('');
//       })
//       .catch(error => {
//         console.error('Error sending message:', error);
//       });
//     } else {

//       console.error('Email and message are required!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Contact Us</Text>
//       <TextInput
//         label="Email"
//         value={email}
//         onChangeText={text => setEmail(text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Message"
//         value={message}
//         onChangeText={text => setMessage(text)}
//         multiline
//         numberOfLines={4}
//         style={styles.input}
//       />
//       <Button
//         mode="contained"
//         style={styles.button}
//         onPress={handleSendMessage}>
//         Send Message
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   button: {
//     width: '100%',
//     marginTop: 20,
//   },
// });

// export default ContactUsScreen;





import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Dialog, Portal } from 'react-native-paper';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

const ContactUsScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('solvedQueries')
      .where('email', '==', email) // Assuming email is unique per query; adjust if needed
      .onSnapshot(snapshot => {
        if (!snapshot.empty) {
          setDialogVisible(true);
          setTimeout(() => {
            setDialogVisible(false);
          }, 3000); // Automatically close the dialog after 3 seconds
        }
      });

    return () => unsubscribe();
  }, [email]);

  const handleSendMessage = () => {
    if (email && message) {
      const newMessageRef = firebase.database().ref('contactUsMessages').push();
      newMessageRef.set({
        email,
        message,
        timestamp: firebase.database.ServerValue.TIMESTAMP 
      }).then(() => {
        setEmail('');
        setMessage('');
      }).catch(error => {
        console.error('Error sending message:', error);
      });
    } else {
      console.error('Email and message are required!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSendMessage}
        style={styles.button}>
        Send Message
      </Button>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Query Solved</Dialog.Title>
          <Dialog.Content>
            <Text>Your query has been resolved. Thank you for contacting us!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default ContactUsScreen;
