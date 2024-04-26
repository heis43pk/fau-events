import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import Typography from '../../constants/Typography';

export default function QRDisplayScreen({ navigation, route }) {
  const { details, id } = route.params;
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Unique QR for</Text>
        <Text style={styles.name}>{details.name}</Text>
        <Text style={styles.slot}>{details.slot}</Text>
      </View>

      <View style={styles.qrContainer}>
        <QRCode value={id} size={200}  logoBackgroundColor='transparent'/>
        <Text style={styles.idText}>{id}</Text>
        
      </View>

      <Button
        style={styles.button}
        mode="contained"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }>
        Go Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { alignItems: 'center', marginTop: 30 },
  title: { ...Typography.title },
  name: { ...Typography.heading, textTransform: 'capitalize' },
  slot: { ...Typography.label },
  qrContainer: { alignItems: 'center', marginVertical: 50 },
  idText: { ...Typography.label, marginTop: 20 },
  button: { margin: 10 },
});
