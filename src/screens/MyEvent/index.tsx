import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DataContext from '../../contexts/DataContext';
import firestore from '@react-native-firebase/firestore'; // Assuming you're using Firestore
import FirestoreConfig from '../../constants/Firestore';

const MyEventsScreen = () => {
  const { user } = useContext(DataContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user) {
          throw new Error('User not available');
        }

        const eventsRef = firestore()
         .collection(FirestoreConfig.collection)
         .doc(FirestoreConfig.documentRegistrations);

        const doc = await eventsRef.get();

        if (!doc.exists) {
          throw new Error('No events found');
        }

        const eventData = doc.data();

        if (!eventData) {
          throw new Error('Event data is empty');
        }

        const eventsArray = Object.values(eventData);
      
        setEvents(eventsArray);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Events</Text>
      {events.length === 0? (
        <Text>No events found</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) => index.toString()} // Use index as key
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text>{item.eventName}</Text>
              <Text>{item.eventDate}</Text>
              <Text>{item.eventLocation}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default MyEventsScreen;