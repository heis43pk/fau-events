



//2nd


import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, ToastAndroid, Dimensions } from 'react-native';
import { Button, Modal, TouchableRipple, Card, Title, Paragraph } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import DataContext from '../../contexts/DataContext';
import Colors from '../../constants/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('screen');

export default function QRScanScreen({ navigation }) {
  const { registrations, setAttended } = useContext(DataContext);
  const QRRef = useRef();
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);
  const [eventId, setEventId] = useState(null);
  const [id, setId] = useState(null);

  const afterScan = () => {
    setShowModal(false);
    setCanSubmit(true);
    QRRef.current.reactivate();
  };

  const onSubmit = (code) => {
    setCanSubmit(false);

    const parts = code.split('/');
    const eventId = parts[0];
    const id = parts[1];
    setEventId(eventId);
    setId(id);

    if (!registrations) {
      ToastAndroid.show('Please try again later...', ToastAndroid.SHORT);
      return;
    }

    const eventRegistrations = registrations[eventId];
    if (eventRegistrations && eventRegistrations[id]) {
      setShowModal(true);
      setRegistrationData(eventRegistrations[id]);
    } else {
      ToastAndroid.show('Invalid QR code. Please try again.', ToastAndroid.SHORT);
      QRRef.current.reactivate();
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <QRCodeScanner
        ref={QRRef}
        reactivate={false}
        onRead={(data) => onSubmit(data.data)}
        topContent={<Text style={styles.centerText}>Scan the QR Code</Text>}
        bottomContent={
          <View style={styles.bottomContent}>
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              placeholder="Enter code manually"
              placeholderTextColor={Colors.lightGray}
            />
            <Button
              disabled={!canSubmit}
              mode="contained"
              onPress={() => onSubmit(input)}
              style={{...styles.submitButton, backgroundColor:'#336699'}}
              >
              Submit
            </Button>
          </View>
        }
        cameraStyle={styles.cameraStyle}
      />

      <Modal visible={showModal} onDismiss={afterScan} contentContainerStyle={styles.modalContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.modalTitle}>{registrationData.event}</Title>
            <Paragraph style={styles.modalKeys}>Name: <Text style={styles.modalValues}>{registrationData.name}</Text></Paragraph>
            {/* <Paragraph style={styles.modalKeys}>Slot: <Text style={styles.modalValues}>{registrationData.slot}</Text></Paragraph> */}
            <Paragraph style={styles.modalKeys}>College: <Text style={styles.modalValues}>{registrationData.college}</Text></Paragraph>
            <Paragraph style={styles.modalKeys}>Number: <Text style={styles.modalValues}>{registrationData.number}</Text></Paragraph>
          </Card.Content>
          <Card.Actions style={styles.modalButtonContainer}>
            <Button
              mode="contained"
              onPress={afterScan}
              style={{...styles.modalButton, backgroundColor:'#FF0000'}}
              >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                if (eventId && id) {
                  setAttended(eventId, id).then((result) => {
                    if (result.status) {
                      afterScan();
                      ToastAndroid.show('Attendance marked', ToastAndroid.SHORT);
                    } else {
                      ToastAndroid.show(result.msg, ToastAndroid.SHORT);
                    }
                  }).catch((error) => {
                    console.error("Error marking attendance:", error);
                  });
                } else {
                  console.error("eventId or id doesn't exist");
                }
              }}
              style={{... styles.modalButton, backgroundColor:'#00FF00'}} 
              >
              Confirm
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraStyle: {
    width: width * 0.8,           // Set camera width to 80% of screen width
    height: width * 0.8,          // Set camera height to maintain aspect ratio
    alignSelf: 'center',
    borderRadius: 10,             // Add border radius for rounded corners
    borderWidth: 2,               // Add border width
    borderColor: '#fff',          // Set border color to white
    overflow: 'hidden',           // Hide any content that overflows the camera boundaries
    marginTop: 20,                // Add top margin
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    marginRight: 10,
    color: Colors.darkText,
    fontSize: 16,
  },
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  card: {
    elevation: 2,
  },
  modalTitle: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalKeys: {
    fontSize: 16,
    color: Colors.text,
  },
  modalValues: {
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  modalButton: {
    width: '45%',
    borderRadius: 5,
  },
  centerText: {
    fontSize: 18,
    color: Colors.textLight,
    textAlign: 'center',
    paddingTop: 32,
  },
  submitButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  }
});
