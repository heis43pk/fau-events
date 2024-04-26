import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';
import DataContext from '../../contexts/DataContext';

const DeleteEventScreen = () => {
  const [eventId, setEventId] = useState('');
  const { setChanged } = useContext(DataContext);

  const handleDeleteEvent = async () => {
    if (eventId.trim() === '') {
      Toast.show('Please enter a valid event ID.');
      return;
    }
    
    try {
      const eventRef = firestore().collection('events').doc(eventId);
      const doc = await eventRef.get();

      if (!doc.exists) {
        Toast.show('Event not found.');
        return;
      }

      await eventRef.delete();
      setChanged(eventId); // Update the context if needed to reflect changes
      Toast.show('Event deleted successfully.');
      setEventId('');
    } catch (error) {
      console.error('Error deleting event:', error);
      Toast.show('Failed to delete the event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delete Event</Text>
      <TextInput
        label="Event ID"
        value={eventId}
        onChangeText={setEventId}
        style={styles.input}
        mode="outlined"
      />
      <TouchableOpacity onPress={handleDeleteEvent} style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DeleteEventScreen;
