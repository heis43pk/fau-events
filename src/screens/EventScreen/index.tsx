
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Button, Card, Title, Paragraph, Icon } from 'react-native-paper';
import DataContext from '../../contexts/DataContext';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore';
import FirestoreConfig from '../../constants/Firestore';
import LinearGradient from 'react-native-linear-gradient';


const EventScreen = ({ navigation, route }) => {
  const { isAdmin, user } = useContext(DataContext);
  const { event } = route.params;

  const { title, id, venue, date, description, image, additionalInfo, location } = event;
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationsData, setRegistrationsData] = useState(null);
  const [isSetQRcode, setSetQRcode] = useState();
  const logo=require('../../../assets/faulogo.png');

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const existingRegistration = await firestore()
          .collection(FirestoreConfig.collection)
          .doc(FirestoreConfig.documentRegistrations)
          .get();
      
        const registrationsData = existingRegistration.data();
        setRegistrationsData(registrationsData);
      
        if (registrationsData && registrationsData[event.id]) {
          const registrationsObj = registrationsData[event.id];
      
          // Extract keys of registrations
          const registrationKeys = Object.keys(registrationsObj);
      
          // Check if any registration matches the user's email and CreatedBy field
          const userRegistrations = registrationKeys
            .map(key => ({ key, ...registrationsObj[key] })) // Combine key with registration object
            .filter(registration => registration.CreatedBy === user.email);
      
          // Log the key and value (registration object) for each user registration
          userRegistrations.forEach(registration => {
            setSetQRcode(event.id + "/" + registration.key);
            console.log(event.id + "/" + registration.key); 
            console.log("Key:", registration.key); 
            console.log("event:", event.id); 
   
          });
      
          // Update isRegistered state based on whether the user is registered for the event
          setIsRegistered(userRegistrations.length > 0);
        }
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchData();
  }, [user, event]);

  const renderRegistrationDetails = () => {
    if (isAdmin && registrationsData) {
      const registrations = event.id && registrationsData[event.id] ? registrationsData[event.id] : {};
      return (
        <View style={styles.section}>
          <Text style={styles.label}>Registrations:</Text>
          {Object.values(registrations).map((registration, index) => (
            <Card key={index} style={{...styles.registrationCard, padding:4}}>
            <LinearGradient colors={['#D7E4C0', '#C6DCBA']} style={styles.gradient} start={{x: 1, y: 0}} end={{x: 1, y: 1}}>

              <Card.Content>
                <Title>Name : {registration.name}</Title>
                <Paragraph>Mobile no.: {registration.number}</Paragraph>
                <Paragraph>E-mail : {registration.email}</Paragraph>
              </Card.Content>
              </LinearGradient>
            </Card>
          ))}
        </View>
      );
    }
    return null;
  };
  return (

    <ScrollView style={styles.container}>
      <Card style={{...styles.card, height:'200', width:'200',borderColor:'black'}}>
      <LinearGradient colors={['#FFEBB2', '#E9A89B']} style={styles.gradient} start={{x: 1, y: 0}} end={{x: 1, y: 1}}>

        <Card.Cover source={{ uri: image }} style={{...styles.cardImage}} />
        <Card.Content style={styles.cardContent}>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{title}</Title>
          </View>
          <Paragraph style={{...styles.label}}>Event Details:</Paragraph>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="map-marker" color="#3F51B5" size={20} />
              <Paragraph style={styles.venue}>{venue}</Paragraph>
            </View>
            <View style={styles.detailItem}>
              <Icon name="calendar" color="#3F51B5" size={20} />
              <Paragraph style={styles.date}>
                {date}
                </Paragraph>
            </View>
          </View>
          <Paragraph style={styles.description}>{description}</Paragraph>
          <View style={styles.section}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Additional Info:</Text>
            <Text style={styles.additionalInfo}>{additionalInfo}</Text>
          </View>
          {isRegistered && isSetQRcode ? (
            <View style={styles.qrCodeContainer}>

        <QRCode value={isSetQRcode} size={200}  logoBackgroundColor='transparent'/>

              
              <Text>
                {isSetQRcode}
                </Text>
            </View>
          ) : isAdmin ? null : (
            <View style={styles.btnContainer}>
              <Button mode="contained" onPress={() => { navigation.navigate('Register', { event }); }} style={styles.registerBtn}> Register </Button>
            </View>
          )}
        </Card.Content>
        </LinearGradient>

      </Card>
            {renderRegistrationDetails()}
    </ScrollView>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight:20,

    paddingBottom: 120,

    backgroundColor: '#FFFFFF',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    borderBlockColor:'black',
  },
  cardImage: {
    padding:10,
    width: '100%',
  },
  cardContent: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
  },
  additionalInfo: {
    fontSize: 14,
    marginBottom: 10,
  },
  venue: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  registrationCard: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'white'
  },
  date: {
    fontSize: 16,
    marginTop: 10,
    color: '#3F51B5',
    textDecorationLine: 'underline',
  },
  btnContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  qrCodeContainer: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 100,
  },
  registerBtn: {
    width: '50%',
    borderRadius: 10,
    backgroundColor:'#003366',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EventScreen;