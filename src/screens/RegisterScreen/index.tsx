  // import React, { useState, useContext } from 'react';
  // import { ScrollView, View } from 'react-native';
  // import { Button, Text, TextInput } from 'react-native-paper';
  // import DataContext from '../../contexts/DataContext';

  // export default function RegisterScreen({ navigation, route }) {
  //   const { registerParticipant, user } = useContext(DataContext); 
  
  //   const event = route.params.event;

  //   const [formData, setFormData] = useState({
  //     name: '',
  //     college: '',
  //     number: '',
  //     email: '',
      
  //   });
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleChange = (field, value) => {
  //     setFormData({ ...formData, [field]: value });
  //   };

  //   const handleSubmit = async () => {
  //     setIsSubmitting(true);

  //     const data = {
  //       ...formData,
  //       event: event.title,
  //       // slot: new Date(event.slots[0].toDate()).toLocaleString(),
  //       CreatedBy: user.email
  //     };

  //     const response = await registerParticipant(data, event.id);

      
  //     if (response) {
  //       if (response.status === false) {
  //         alert(response.msg);
  //       } else {
  //         await navigation.navigate('QRDisplay', {
  //           id: response,
  //           details: data,
  //           event,
  //         });
  //       }
  //     } else {
  //       alert('Participant could not be registered!');
  //     }

  //     setIsSubmitting(false);
  //   };

  //   return (
  //     <ScrollView>
  //       <View style={{ padding: 20 }}>
  //         <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
  //           Registration for {event.title}
  //         </Text>
  //         <TextInput
  //           label="Name"
  //           value={formData.name}
  //           onChangeText={(text) => handleChange('name', text)}
  //         />
  //         <TextInput
  //           label="College"
  //           value={formData.college}
  //           onChangeText={(text) => handleChange('college', text)}
  //         />
  //         <TextInput
  //           label="Number"
  //           value={formData.number}
  //           onChangeText={(text) => handleChange('number', text)}
  //           keyboardType="numeric"
  //         />
  //         <TextInput
  //           label="Email"
  //           value={formData.email}
  //           onChangeText={(text) => handleChange('email', text)}
  //           keyboardType="email-address"
  //         />
  //         <Button
  //           mode="contained"
  //           disabled={isSubmitting}
  //           onPress={handleSubmit}
  //           style={{ marginTop: 20 }}
  //         >
  //           Submit
  //         </Button>
  //       </View>
  //     </ScrollView>
  //   );
  // }



  //2nd screen UI

//   import React, { useState, useContext, useEffect, useRef } from 'react';
// import { ScrollView, View, StyleSheet, Animated } from 'react-native';
// import { Button, Text, TextInput, ActivityIndicator, Card } from 'react-native-paper';
// import DataContext from '../../contexts/DataContext';

// export default function RegisterScreen({ navigation, route }) {
//   const { registerParticipant, user } = useContext(DataContext); 
//   const event = route.params.event;
//   const [formData, setFormData] = useState({
//     name: '',
//     college: '',
//     number: '',
//     email: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

//   const handleChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     const data = {
//       ...formData,
//       event: event.title,
//       CreatedBy: user.email
//     };

//     const response = await registerParticipant(data, event.id);
//     if (response) {
//       if (response.status === false) {
//         alert(response.msg);
//       } else {
//         await navigation.navigate('QRDisplay', {
//           id: response,
//           details: data,
//           event,
//         });
//       }
//     } else {
//       alert('Participant could not be registered!');
//     }
//     setIsSubmitting(false);
//   };

//   useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true // Add this line
//       }
//     ).start();
//   }, [fadeAnim]);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>
//         <Card style={styles.card}>
//           <Card.Content>
//             <Text style={styles.header}>
//               Registration for {event.title}
//             </Text>
//             <TextInput
//               label="Name"
//               value={formData.name}
//               onChangeText={(text) => handleChange('name', text)}
//               style={styles.input}
//             />
//             <TextInput
//               label="College"
//               value={formData.college}
//               onChangeText={(text) => handleChange('college', text)}
//               style={styles.input}
//             />
//             <TextInput
//               label="Number"
//               value={formData.number}
//               onChangeText={(text) => handleChange('number', text)}
//               keyboardType="numeric"
//               style={styles.input}
//             />
//             <TextInput
//               label="Email"
//               value={formData.email}
//               onChangeText={(text) => handleChange('email', text)}
//               keyboardType="email-address"
//               style={styles.input}
//             />
//             <Button
//               mode="contained"
//               disabled={isSubmitting}
//               onPress={handleSubmit}
//               style={styles.button}
//             >
//               {isSubmitting ? <ActivityIndicator animating={true} color="#FFF" /> : 'Submit'}
//             </Button>
//           </Card.Content>
//         </Card>
//       </Animated.View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', // Aligns the card in the center of the ScrollView
//     alignItems: 'center', // Center horizontally
//     padding: 20,
//     backgroundColor: '#f4f4f4'
//   },
//   cardContainer: {
//     width: '100%', // Full width of the card container
//     maxWidth: 500, // Max width of the card
//   },
//   card: {
//     elevation: 4,
//     borderRadius: 8,
//     backgroundColor: 'white', // Clean white background for the card
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//     textAlign: 'center', // Center the header text for better focus
//   },
//   input: {
//     backgroundColor: 'white',
//     marginBottom: 16
//   },
//   button: {
//     marginTop: 20,
//     paddingVertical: 8,
//     backgroundColor: '#6200ee', // A vibrant color for the button
//     borderRadius: 5, // Rounded corners for the button
//   }
// });


//3rd UI


import React, { useState, useContext, useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, Animated } from 'react-native';
import { Button, Text, TextInput, ActivityIndicator, Card } from 'react-native-paper';
import DataContext from '../../contexts/DataContext';
import LottieView from 'lottie-react-native';
export default function RegisterScreen({ navigation, route }) {
  const { registerParticipant, user } = useContext(DataContext); 
  const event = route.params.event;
  const [formData, setFormData] = useState({
    name: '',
    college: '',
    number: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = {
      ...formData,
      event: event.title,
      CreatedBy: user.email
    };
    const response = await registerParticipant(data, event.id);
    if (response) {
      if (response.status === false) {
        alert(response.msg);
      } else {
        await navigation.navigate('QRDisplay', {
          id: response,
          details: data,
          event,
        });
      }
    } else {
      alert('Participant could not be registered!');
    }
    setIsSubmitting(false);
  };
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true // Add this line
      }
    ).start();
  }, [fadeAnim]);
  return (

    
    <ScrollView contentContainerStyle={styles.container}>
      
      <Animated.View style={[styles.cardContainer, { opacity: fadeAnim }]}>

      

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>
              Registration for {event.title}
            </Text>
            <TextInput
              label="Name"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
            />
            <TextInput
              label="College"
              value={formData.college}
              onChangeText={(text) => handleChange('college', text)}
              style={styles.input}
            />
            <TextInput
              label="Number"
              value={formData.number}
              onChangeText={(text) => handleChange('number', text)}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              style={styles.input}
            />
            <Button
              mode="contained"
              disabled={isSubmitting}
              onPress={handleSubmit}
              style={styles.button}
            >
              {isSubmitting ? <ActivityIndicator animating={true} color="#336699" /> : 'Submit'}
            </Button>
          </Card.Content>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Aligns the card in the center of the ScrollView
    alignItems: 'center', // Center horizontally
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  cardContainer: {
    width: '100%', // Full width of the card container
    maxWidth: 500, // Max width of the card
  },
  card: {
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white', // Clean white background for the card
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center', // Center the header text for better focus
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 16
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: '#336699', // Use a vibrant color
    overflow: 'hidden', // Ensures the ripple effect does not go outside the button boundaries
  },
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
