

import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import DataContext from '../../contexts/DataContext';

import auth from '@react-native-firebase/auth';
import { Image } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const { user, setUser } = useContext(DataContext);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleUpdateProfile = async () => {
    try {
      if (newName) {
        await user.updateProfile({
          displayName: newName,
        });
      }
      if (newEmail) {
        await user.updateEmail(newEmail);
      }
      setUser(auth().currentUser);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* <ImageBackground source={{ uri: headerImageUrl }} style={styles.header}> */}
        <View style={styles.overlay}>
          <Text style={styles.name}>Welcome</Text>
          <Text style={styles.userInfo}>{user.displayName}</Text>
          <Image source={require("../../../assets/owllogo.png")} style={styles.avatar} />
        </View>
      {/* </ImageBackground> */}

      <View style={styles.body}>

        <Card style={styles.card}>
        <LinearGradient colors={['#84B7EA', '#e8eaf6']} style={styles.gradient} start={{x: 1, y: 0}} end={{x: 1, y: 1}}>

          <Card.Content>
            <Text style={styles.cardText}>Change Name: {user.displayName}</Text>
            <TextInput
              value={newName || user.displayName}
              onChangeText={setNewName}
              label="Enter new name"
              style={styles.input}
            />
            <Text style={styles.cardText}>Change Email:</Text>
            <TextInput
              value={newEmail || user.email}
              onChangeText={setNewEmail}
              label="Enter new email"
              style={styles.input}
            />
            <Button mode="contained" onPress={handleUpdateProfile} style={styles.button}>Update Profile</Button>
          </Card.Content>        
          </LinearGradient>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 40,
    marginTop: 20,
    backgroundColor:'white'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 18,
    color: 'black',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardText: {
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#336699',
  },
});

export default ProfileScreen;