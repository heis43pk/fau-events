// import React from 'react';
// import { StyleSheet, Image, View } from 'react-native';
// import { Card, Title, Paragraph, Avatar, IconButton, Text } from 'react-native-paper';

// export default function HomeListItem({ title, date, logo, location }) {

//   return (
//     <Card style={styles.card}>
//       <Card.Title
//         title={title}

//         subtitle={date}
//         left={() => (
//           <View style={styles.imageContainer}>
//             <Image source={{ uri: logo }} style={styles.image} />
//             <Text>{location}</Text>
//           </View>
//         )}
//         right={() => (
//           <IconButton icon="arrow-right-drop-circle" onPress={() => {}} />
          

//         )}
//         titleStyle={styles.title}
//         subtitleStyle={styles.subtitle}
//       />
//     </Card>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginVertical: 10,
//     marginHorizontal: 26,
//     borderRadius: 25,
//     height:200,
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   image: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     marginTop: 8,
//     marginBottom: 2,
//   },
//   subtitle: {
//     marginLeft: 16,
//     marginBottom: 8,
//   },
//   moreText: {
//     marginRight: 16,
//     color: 'blue',
//   },
// });


// another UI code

// import React from 'react';
// import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
// import { Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';

// export default function HomeListItem({ title, date, logo, location }) {
//   return (
//     <Card style={styles.card}>
//       <View style={styles.contentContainer}>
//         <Image source={{ uri: logo }} style={styles.image} />
//         <View style={styles.textContainer}>
//           <Title style={styles.title}>{title}</Title>
//           <Paragraph style={styles.subtitle}>{date}</Paragraph>
//           <Text style={styles.location}>{location}</Text>
//         </View>
//         <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
//           <IconButton
//             icon="chevron-right"
//             size={24}
//             color="#5D3FD3"  // Adjusted to a modern, vibrant color
//           />
//         </TouchableOpacity>
//       </View>
//     </Card>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   contentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//     color: '#333',  // Darker text for better readability
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   location: {
//     fontSize: 14,
//     color: '#888',  // Softened color for less emphasis
//     marginTop: 4,
//   },
//   iconButton: {
//     // Style for touchable opacity if needed
//   },
// });





// 2nd UI

// import React from 'react';
// import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
// import { Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';

// export default function HomeListItem({ title, date, logo, location }) {
//   return (
//     <Card style={styles.card}>
//       <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradient}>
//         <View style={styles.contentContainer}>
//           <Image source={{ uri: logo }} style={styles.image} />
//           <View style={styles.textContainer}>
//             <Title style={styles.title}>{title}</Title>
//             <Paragraph style={styles.subtitle}>{date}</Paragraph>
//             <Text style={styles.location}>{location}</Text>
//           </View>
//           <TouchableOpacity onPress={() => {}} style={styles.iconButton}>
//             <IconButton
//               icon="chevron-right"
//               size={24}
//               color="#FFFFFF"  // White color for visibility against the gradient
//             />
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </Card>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 12,
//     overflow: 'hidden',  // Ensures the gradient is contained within the borders
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   gradient: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#FFFFFF',
//   },
//   location: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     marginTop: 4,
//   },
//   iconButton: {
//     // This container can be styled further if needed
//   },
// });




///3rd UI


import React, { useEffect, useRef } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Animated } from 'react-native';
import { Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeListItem({ title, date, logo, location }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  // Animations for interactions
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true
    }).start();
  };

  // Fade-in animation on component mount
  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: opacityValue, transform: [{ scale: scaleValue }] }}>
      <Card style={styles.card}>
        <LinearGradient colors={['#84B7EA', '#e8eaf6']} style={styles.gradient} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
          <Image source={{ uri: logo }} style={styles.image} />
          <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => {}}
            style={styles.contentContainer}
          >
            <View style={styles.textContainer}>
              <Title style={styles.title}>{title}</Title>
              <Paragraph style={styles.subtitle}>{date}</Paragraph>
              <Text style={styles.location}>{location}</Text>
            </View>
            <IconButton
              icon="chevron-right"
              size={24}
              color="#FFFFFF"  // White icon for contrast
              style={styles.iconButton}
            />
          </TouchableOpacity>
        </LinearGradient>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly opaque white for a soft appearance
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border to enhance styling
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Dark text for better readability against a lighter background
  },
  subtitle: {
    fontSize: 16,
    color: '#333333',
  },
  location: {
    fontSize: 14,
    color: '#333333',
  },
  iconButton: {
    alignSelf: 'flex-end',
  },
});
