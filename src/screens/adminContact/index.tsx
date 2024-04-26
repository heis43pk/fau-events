

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, Image, TextInput, Text } from 'react-native';
import { List, Appbar, TouchableRipple, Dialog, Portal, Button, Card } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AdminScreen = () => {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('contactUsMessages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      }, error => {
        console.error('Error fetching messages:', error);
      });

    return () => unsubscribe();
  }, []);

  const handlePress = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleQuerySolved = (id) => {
    setSelectedMessageId(id);
    setIsDialogVisible(true);
  };

  const confirmQuerySolved = () => {
    const query = messages.find(m => m.id === selectedMessageId);
    if (query) {
      firestore()
        .collection('solvedQueries')
        .add({
          ...query,
          timestamp: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log('Query moved to solved queries.');
          // Optionally remove the query from the original collection
        })
        .catch(error => {
          console.error('Error solving the query:', error);
        });
    }
    setIsDialogVisible(false);
  };

  const filteredMessages = messages.filter(message =>
    message.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <TouchableRipple onPress={() => {}} style={styles.logoButton} >
          <Image source={require('../../../assets/owllogo.png')} style={styles.logo} />
        </TouchableRipple>
        {isSearchVisible ? (
          <TextInput
            placeholder="Search by email"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoFocus={true}
          />
        ) : (
          <Appbar.Content title="Admin's Query Handling" />
        )}
        <Appbar.Action icon={isSearchVisible ? "close" : "magnify"} onPress={() => setIsSearchVisible(!isSearchVisible)} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <List.Section title="User's Queries">
          {filteredMessages.map((message) => (
            <List.Accordion
              key={message.id}
              title={message.email}
              left={props => <List.Icon {...props} icon="email" />}
              expanded={message.id === expandedId}
              onPress={() => handlePress(message.id)}
              style={styles.accordion}>
              <Card style={styles.messageContainer}>
                <Card.Content>
                  <Text style={styles.messageText}>{message.message}</Text>
                  <Text style={styles.timestamp}>
                    Sent: {message.timestamp.toDate().toLocaleString()}
                  </Text> 
                  <Button mode="contained" onPress={() => handleQuerySolved(message.id) } style={styles.button}>Mark as Solved </Button>
                </Card.Content>
              </Card>
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to mark this query as solved?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={confirmQuerySolved}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordion: {
    backgroundColor: '#ffffff',
    marginBottom: 2,
  },
  button: {
    backgroundColor:'#336699',
    marginTop: 20, // Space from the top
    paddingVertical: 3, // Vertical padding
    paddingHorizontal: 12, // Horizontal padding
    borderRadius: 5, // Rounded corner radius
    elevation: 3, // Shadow for Android (optional)
    // For iOS shadow:
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  messageContainer: {
    
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  logoButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  }
});

export default AdminScreen;
