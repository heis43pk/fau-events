// import React, { useContext, useState } from 'react';
// import { ScrollView, StyleSheet, View, Text, Button,  TouchableOpacity, Image } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { KeyboardAwareScrollView, TextField, Toast } from 'react-native-ui-lib';
// import FirestoreConfig from '../../constants/Firestore';
// import firestore from '@react-native-firebase/firestore';
// import DataContext from '../../contexts/DataContext';
// import storage from '@react-native-firebase/storage';
// import { Kohana } from 'react-native-textinput-effects';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { IconButton, TextInput} from 'react-native-paper'; // Import TextInput from react-native-paper
// import LottieView from 'lottie-react-native';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
// import MapView, { Marker } from 'react-native-maps';
// import Geocoder from 'react-native-geocoder-reborn';



// const CreateEventScreen = () => {

//   Geocoder.apiKey = "AIzaSyDXhYVBvCB9TtNgxohQHoTr7UbpvkQgs_E"; 


// const Step1 = ({ formData, setFormData }) => (
//   <View>
//     <Text style={styles.heading}>Create New Event</Text>
//     <LottieView
//       source={require("../../../assets/create_step1.json")}
//       style={{ width: 250, height: 250 }}
//       autoPlay
//       loop
//     />
//     <Kohana
//   label="Event Title"
//   value={formData.title}
//   iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
//   iconName={'pencil'} // Choose appropriate icon name
//   iconColor={'#6b4fa9'}
//   iconSize={20}
//   inputPadding={16}
//   onChangeText={(text) => setFormData({ ...formData, title: text, id: text.replace(/\s+/g, '_').toLowerCase() })}
//   style={styles.input}
//   inputStyle={styles.inputField}
// />

// <Kohana
//   label="Event Description"
//   value={formData.description}
//   iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
//   iconName={'file-text'} // Choose appropriate icon name
//   iconColor={'#6b4fa9'}
//   iconSize={20}
//   inputPadding={16}
//   onChangeText={(text) => setFormData({ ...formData, description: text })}
//   style={styles.textArea} // Use custom style for textarea
//   inputStyle={styles.textAreaInput} // Use custom input style for textarea
//   multiline // Enable multiline input
//   numberOfLines={4} // Set the number of lines visible initially
// />


  
//   </View>
// );
// const Step2 = ({ formData, setFormData, styles }) => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const [date, setDate] = useState(new Date());

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     hideDatePicker();
//     setDate(currentDate);
//     setFormData({ ...formData, date: currentDate.toISOString().split('T')[0] }); // Set date in formData
//   };

//   return (
//     <View>
//       <Text style={styles.heading}>Create New Event - Step 2</Text>
//       <Kohana
//         label="Venue"
//         value={formData.venue}
//         iconClass={FontAwesomeIcon}
//         iconName={'location-arrow'}
//         iconColor={'#6b4fa9'}
//         iconSize={20}
//         inputPadding={16}
//         onChangeText={(text) => setFormData({ ...formData, venue: text })}
//         style={styles.input}
//         inputStyle={styles.inputField}
//       />

//       <View style={styles.inlineContainer}>
//         <TouchableOpacity onPress={showDatePicker} style={styles.touchableOpacity}>
//           <IconButton
//             icon="calendar"
//             color="#6b4fa9"
//             size={20}
//           />
//           <Text>{date.toLocaleDateString()}</Text>
//         </TouchableOpacity>
//       </View>

//       {isDatePickerVisible && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={'date'}
//           is24Hour={true}
//           display="default"
//           onChange={handleConfirm}
//         />
//       )}
//     </View>
//   );
// };



// const Step3 = ({ formData, setFormData, styles }) => (
//   <View>
//     <Text style={styles.heading}>Create New Event - Step 3</Text>
//     <LottieView
//       source={require("../../../assets/create_step1.json")}
//       style={{ width: 250, height: 250 }}
//       autoPlay
//       loop
//     />
//     <Kohana
//       label="Additional Information"
//       value={formData.additionalInfo}
//       iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
//       iconName={'file-text'} // Choose appropriate icon name
//       iconColor={'#6b4fa9'}
//       iconSize={20}
//       inputPadding={16}
//       onChangeText={(text) => setFormData({ ...formData, additionalInfo: text })}
//       style={styles.input}
//       inputStyle={styles.inputField}
//       multiline
//       numberOfLines={4}
//     />

//   </View>
// );





// const Step4 = ({ formData, setFormData, handleImageUpload, styles, image }) => {
//   const [region, setRegion] = useState({
//     latitude: 26.11999,
//     longitude: -80.14134,
//     latitudeDelta: 0.05,
//     longitudeDelta: 0.05,
//   });
//   const [address, setAddress] = useState('');

//   const onRegionChangeComplete = async (region) => {
//     setRegion(region);
//     setFormData({ ...formData, location: `${region.latitude}, ${region.longitude}` });

//     // Perform reverse geocoding
//     try {
//       const res = await Geocoder.geocodePosition({
//         lat: region.latitude,
//         lng: region.longitude
//       });
//       if (res.length > 0) {
//         setAddress(res[0].formattedAddress); // assuming you want the first result
//       }
//     } catch (err) {
//       console.error(err);
//       setAddress('Failed to retrieve address');
//     }
//   };

//   return (

    
//     <View>
//       <Text style={styles.heading}>Create New Event - Step 4</Text>

//       <Kohana
//       label="Location"
//       value={formData.location}
//       iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
//       iconName={'location-arrow'} // Choose appropriate icon name
//       iconColor={'#6b4fa9'}
//       iconSize={20}
//       inputPadding={16}
//       onChangeText={(text) => setFormData({ ...formData, location: text })}
//       style={styles.input}
//       inputStyle={styles.inputField}
//     />
//       <MapView
//         style={styles.map}
//         initialRegion={region}
//         onRegionChangeComplete={onRegionChangeComplete}
//       >
//         <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
//       </MapView>
//       <Text>Address: {address}</Text>

//       <View style={styles.inlineContainer}>
//         <TouchableOpacity onPress={handleImageUpload} style={styles.touchableOpacity}>
//           <IconButton icon="folder-image" color="#6b4fa9" size={20} />
//           {image?.uri && (
//             <View>
//               <Text>Preview:</Text>
//               <Image source={{ uri: image.uri }} style={styles.image} />
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Add map styles to your StyleSheet
// styles.map = {
//   width: '100%',
//   height: 250, // Set an appropriate height
// };



//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [venue, setVenue] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [timezone, setTimezone] = useState('Florida Timezone');
//   const [additionalInfo, setAdditionalInfo] = useState('');
//   const [location, setadLocation] = useState('');
//   const [slots, setSlots] = useState([]);
//   const [image, setImage] = useState(null);
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//   const { setChanged } = useContext(DataContext);

//   const [steps, setSteps] = useState([
//     { title: 'Step 1', component: Step1 },
//     { title: 'Step 2', component: Step2 },
//     { title: 'Step 3', component: Step3 },
//     { title: 'Step 4', component: Step4 },
//   ]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     venue: '',
//     date: '',
//     time: '',
//     lang:'',
//     timezone: 'Florida Timezone',
//     additionalInfo: '',
//     location: '',
//     id:'',
//     image: null,
//   });

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Handle form submission
//       handleCreateEvent();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleConfirm = (selectedDate) => {
//     const formattedDate = selectedDate.toISOString().split('T')[0];
//     const formattedTime = selectedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
//     setDate(formattedDate);
//     setTime(formattedTime);
//     hideDatePicker();
//   };

//   const handleCreateEvent = async () => {
//     try {
//       const id = title.replace(/\s+/g, '_').toLowerCase();
//       const eventRef = firestore().collection(FirestoreConfig.collection).doc(FirestoreConfig.documentDetails);
//       console.log(formData);
//       // Retrieve the existing document data
//       const doc = await eventRef.get();
//       const eventData = doc.exists ? doc.data() : { events: [] };
  
//       // Upload image to Firebase Storage
//       let imageUrl = null;
//       if (image) {
//         const imageUri = image.uri;
//         const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
//         const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
  
//         // Upload image to Firebase Storage
//         const response = await fetch(uploadUri);
//         const blob = await response.blob();
//         const imageRef = storage().ref().child(`event_images/${id}/${imageFileName}`);
//         await imageRef.put(blob);
  
//         // Get the download URL of the uploaded image
//         imageUrl = await imageRef.getDownloadURL();
//       }
  
//       // Construct the new event data
//       const newEvent = {
//         title: formData.title,
//         description: formData.description,
//         venue: formData.venue,
//         date: formData.date,
//         time: formData.time,
//         timezone: formData.timezone,
//         additionalInfo: formData.additionalInfo,
//         location: formData.location,
//         lang : formData.lang,
//         slots: [],
//         id: formData.id,
//         image: imageUrl,
//       };
  
//       eventData.events.push(newEvent);
//       await eventRef.set(eventData);
  
//       resetForm();
//       setChanged(id);
//       setCurrentStep(0);
   
//       alert('Event created/updated successfully!');
//     } catch (error) {
//       console.error('Error creating/updating event:', error);
//     }
//   };
//   const handleImageUpload = () => {

//     launchImageLibrary({ mediaType: 'photo' }, response => {
    
//       if (!response.didCancel && response.assets && response.assets.length > 0) {
//         setImage(response.assets[0]);
//       }
//     });
//   };

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       venue: '',
//       date: '',
//       time: '',
//       timezone: 'Florida Timezone',
//       additionalInfo: '',
//       location: '',
//       id: '',
//       image: null,
//     });
//   };
  

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };



//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const CurrentStepComponent = steps[currentStep].component;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//           <KeyboardAwareScrollView
//     enableOnAndroid={true}
//     extraHeight={140}
//     >
//       <View>
        
//         <Text>Step {currentStep + 1}</Text>
//         <CurrentStepComponent formData={formData} setFormData={setFormData} image={image} handleImageUpload={handleImageUpload} styles={styles} />
//         <View style={styles.buttonContainer}>
//           {currentStep > 0 && <IconButton style={styles.buttonContainerIconButton} icon="arrow-left" onPress={handlePrevious} />}
//           <IconButton style={styles.buttonContainerIconButton} icon={currentStep === steps.length - 1 ? 'check' : 'arrow-right'} onPress={handleNext} />
//         </View>
        
       
//       </View>
//     </KeyboardAwareScrollView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   uploadButton: {
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     backgroundColor: 'lightblue',
//     borderRadius: 5,
//   },
//   uploadButtonText: {
//     color: '#fff',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   input: {
//     backgroundColor: '#fff', 
//     borderRadius: 10,
//     marginBottom: 20, 
//     borderWidth: 1,
//     borderColor: '#ccc', 
//   },
//   inputField: {
//     color: '#333', 
//   },
//   textArea: {
//     backgroundColor: '#fff', 
//     borderRadius: 10,
//     marginBottom: 20, 
//     borderWidth: 1,
//     borderColor: '#ccc', 
//     paddingHorizontal: 1,
//     paddingVertical: 10,
//   },
//   textAreaInput: {
//     color: '#333',
//     minHeight: 100,
//     textAlignVertical: 'top', 
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inlineContainer: {
//     width:'100%',

//   },
//   touchableOpacity: {
//     width:'100%',
//     backgroundColor: '#fff', 
//     borderRadius: 10, 
//     marginBottom: 20, 
//     borderWidth: 1,
//     borderColor: '#ccc', 
//     paddingHorizontal: 1,
//     paddingVertical: 10, 
//     flexDirection: 'row',
//     alignItems: 'center', 
//     marginRight: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
   
//   },

//  buttonContainerIconButton: {
//   backgroundColor: '#FAF9F6',
//   color: '#122000',
//   shadowColor: '#000',
//   shadowOffset: {
//     width: 0,
//     height: 3,
//   },
//   shadowOpacity: 0.27,
//   shadowRadius: 4.65,
//   elevation: 6,
// }

  
// });

// export default CreateEventScreen;







import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Button,  TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView, TextField, Toast } from 'react-native-ui-lib';
import FirestoreConfig from '../../constants/Firestore';
import firestore from '@react-native-firebase/firestore';
import DataContext from '../../contexts/DataContext';
import storage from '@react-native-firebase/storage';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { IconButton, TextInput} from 'react-native-paper'; // Import TextInput from react-native-paper
import LottieView from 'lottie-react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder-reborn';



const CreateEventScreen = () => {

  Geocoder.apiKey = "AIzaSyDXhYVBvCB9TtNgxohQHoTr7UbpvkQgs_E"; 


const Step1 = ({ formData, setFormData }) => (
  <View>
    <Text style={styles.heading}>Create New Event</Text>
    <LottieView
      source={require("../../../assets/create_step1.json")}
      style={{ width: 250, height: 250 }}
      autoPlay
      loop
    />
    <Kohana
  label="Event Title"
  value={formData.title}
  iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
  iconName={'pencil'} // Choose appropriate icon name
  iconColor={'#6b4fa9'}
  iconSize={20}
  inputPadding={16}
  onChangeText={(text) => setFormData({ ...formData, title: text, id: text.replace(/\s+/g, '_').toLowerCase() })}
  style={styles.input}
  inputStyle={styles.inputField}
/>

<Kohana
  label="Event Description"
  value={formData.description}
  iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
  iconName={'file-text'} // Choose appropriate icon name
  iconColor={'#6b4fa9'}
  iconSize={20}
  inputPadding={16}
  onChangeText={(text) => setFormData({ ...formData, description: text })}
  style={styles.textArea} // Use custom style for textarea
  inputStyle={styles.textAreaInput} // Use custom input style for textarea
  multiline // Enable multiline input
  numberOfLines={4} // Set the number of lines visible initially
/>


  
  </View>
);
const Step2 = ({ formData, setFormData, styles }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    hideDatePicker();
    setDate(currentDate);
    setFormData({ ...formData, date: currentDate.toISOString().split('T')[0] }); // Set date in formData
  };

  return (
    <View>
      <Text style={styles.heading}>Create New Event - Step 2</Text>
      <Kohana
        label="Venue"
        value={formData.venue}
        iconClass={FontAwesomeIcon}
        iconName={'location-arrow'}
        iconColor={'#6b4fa9'}
        iconSize={20}
        inputPadding={16}
        onChangeText={(text) => setFormData({ ...formData, venue: text })}
        style={styles.input}
        inputStyle={styles.inputField}
      />

      <View style={styles.inlineContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.touchableOpacity}>
          <IconButton
            icon="calendar"
            color="#6b4fa9"
            size={20}
          />
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      {isDatePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={handleConfirm}
        />
      )}
    </View>
  );
};



const Step3 = ({ formData, setFormData, styles }) => (
  <View>
    <Text style={styles.heading}>Create New Event - Step 3</Text>
    <LottieView
      source={require("../../../assets/create_step1.json")}
      style={{ width: 250, height: 250 }}
      autoPlay
      loop
    />
    <Kohana
      label="Additional Information"
      value={formData.additionalInfo}
      iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
      iconName={'file-text'} // Choose appropriate icon name
      iconColor={'#6b4fa9'}
      iconSize={20}
      inputPadding={16}
      onChangeText={(text) => setFormData({ ...formData, additionalInfo: text })}
      style={styles.input}
      inputStyle={styles.inputField}
      multiline
      numberOfLines={4}
    />

  </View>
);





const Step4 = ({ formData, setFormData, handleImageUpload, styles, image }) => {
  const [region, setRegion] = useState({
    latitude: 26.11999,
    longitude: -80.14134,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [address, setAddress] = useState('');

  const onRegionChangeComplete = async (region) => {
    setRegion(region);
    setFormData({ ...formData, location: `${region.latitude}, ${region.longitude}` });

    // Perform reverse geocoding
    try {
      const res = await Geocoder.geocodePosition({
        lat: region.latitude,
        lng: region.longitude
      });
      if (res.length > 0) {
        setAddress(res[0].formattedAddress); // assuming you want the first result
      }
    } catch (err) {
      console.error(err);
      setAddress('Failed to retrieve address');
    }
  };

  return (

    
    <View>
      <Text style={styles.heading}>Create New Event - Step 4</Text>

      <Kohana
      label="Location"
      value={formData.location}
      iconClass={FontAwesomeIcon} // or MaterialCommunityIcon
      iconName={'location-arrow'} // Choose appropriate icon name
      iconColor={'#6b4fa9'}
      iconSize={20}
      inputPadding={16}
      onChangeText={(text) => setFormData({ ...formData, location: text })}
      style={styles.input}
      inputStyle={styles.inputField}
    />
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
      </MapView>
      <Text>Address: {address}</Text>

      <View style={styles.inlineContainer}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.touchableOpacity}>
          <IconButton icon="folder-image" color="#6b4fa9" size={20} />
          {image?.uri && (
            <View>
              <Text>Preview:</Text>
              <Image source={{ uri: image.uri }} style={styles.image} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Add map styles to your StyleSheet
styles.map = {
  width: '100%',
  height: 250, // Set an appropriate height
};



  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('Florida Timezone');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [location, setadLocation] = useState('');
  const [slots, setSlots] = useState([]);
  const [image, setImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setChanged } = useContext(DataContext);

  const [steps, setSteps] = useState([
    { title: 'Step 1', component: Step1 },
    { title: 'Step 2', component: Step2 },
    { title: 'Step 3', component: Step3 },
    { title: 'Step 4', component: Step4 },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    lang:'',
    timezone: 'Florida Timezone',
    additionalInfo: '',
    location: '',
    id:'',
    image: null,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      handleCreateEvent();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedTime = selectedDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    setDate(formattedDate);
    setTime(formattedTime);
    hideDatePicker();
  };

  const handleCreateEvent = async () => {
    try {
      const id = title.replace(/\s+/g, '_').toLowerCase();
      const eventRef = firestore().collection(FirestoreConfig.collection).doc(FirestoreConfig.documentDetails);
      console.log(formData);
      // Retrieve the existing document data
      const doc = await eventRef.get();
      const eventData = doc.exists ? doc.data() : { events: [] };
  
      // Upload image to Firebase Storage
      let imageUrl = null;
      if (image) {
        const imageUri = image.uri;
        const imageFileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
  
        // Upload image to Firebase Storage
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        const imageRef = storage().ref().child(`event_images/${id}/${imageFileName}`);
        await imageRef.put(blob);
  
        // Get the download URL of the uploaded image
        imageUrl = await imageRef.getDownloadURL();
      }
  
      // Construct the new event data
      const newEvent = {
        title: formData.title,
        description: formData.description,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        timezone: formData.timezone,
        additionalInfo: formData.additionalInfo,
        location: formData.location,
        lang : formData.lang,
        slots: [],
        id: formData.id,
        image: imageUrl,
      };
  
      eventData.events.push(newEvent);
      await eventRef.set(eventData);
  
      resetForm();
      setChanged(id);
      setCurrentStep(0);
   
      alert('Event created/updated successfully!');
    } catch (error) {
      console.error('Error creating/updating event:', error);
    }
  };
  const handleImageUpload = () => {

    launchImageLibrary({ mediaType: 'photo' }, response => {
    
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      venue: '',
      date: '',
      time: '',
      timezone: 'Florida Timezone',
      additionalInfo: '',
      location: '',
      id: '',
      image: null,
    });
  };
  

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };



  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAwareScrollView
    enableOnAndroid={true}
    extraHeight={140}
    >
      <View>
        
        <Text>Step {currentStep + 1}</Text>
        <CurrentStepComponent formData={formData} setFormData={setFormData} image={image} handleImageUpload={handleImageUpload} styles={styles} />
        <View style={styles.buttonContainer}>
          {currentStep > 0 && <IconButton style={styles.buttonContainerIconButton} icon="arrow-left" onPress={handlePrevious} />}
          <IconButton style={styles.buttonContainerIconButton} icon={currentStep === steps.length - 1 ? 'check' : 'arrow-right'} onPress={handleNext} />
        </View>
        
       
      </View>
    </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  uploadButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#ccc', 
  },
  inputField: {
    color: '#333', 
  },
  textArea: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#ccc', 
    paddingHorizontal: 1,
    paddingVertical: 10,
  },
  textAreaInput: {
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inlineContainer: {
    width:'100%',

  },
  touchableOpacity: {
    width:'100%',
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 20, 
    borderWidth: 1,
    borderColor: '#ccc', 
    paddingHorizontal: 1,
    paddingVertical: 10, 
    flexDirection: 'row',
    alignItems: 'center', 
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
   
  },

 buttonContainerIconButton: {
  backgroundColor: '#FAF9F6',
  color: '#122000',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
}

  
});

export default CreateEventScreen;
