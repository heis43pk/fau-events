


import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import ListItem from '../../components/HomeListItem';
import DataContext from '../../contexts/DataContext';

export default function HomeScreen({ navigation }) {
  const { firebaseDetails } = useContext(DataContext);

  let events = null;

  if (firebaseDetails) {
    events = firebaseDetails.events;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Appbar with navy-blue color */}
      <View style={{ backgroundColor: '#003366', paddingVertical: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 24, color: '#FFF', textAlign: 'left' }}>FAU Events</Text>
      </View>

      {/* Content */}
      <View style={{ flex: 1, padding: 20 }}>
        {firebaseDetails ? (
          <View>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Events organized this year:</Text>
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
              {events.map((val, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => navigation.navigate('Event', { event: val })}
                  activeOpacity={0.6}
                  style={{ marginBottom: 10 }}
                >
                  <ListItem
                    logo={val.image}
                    title={val.title}
                    date={val.date}
                    location={val.location}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    </View>
  );
}


