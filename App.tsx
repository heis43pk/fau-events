import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import DataContext from './src/contexts/DataContext';
import HomeScreen from './src/screens/HomeScreen';
import Event from './src/screens/EventScreen';
import LoginScreen from './src/auth/LoginScreen';
import SignupScreen from './src/auth/SignupScreen';
import NoInternet from './src/components/NoInternet';
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import FirestoreConfig from './src/constants/Firestore';
import QRScanScreen from './src/screens/QRScanScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import QRDisplayScreen from './src/screens/QRDisplayScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ContactUsScreen from './src/screens/contact';
import LogoutScreen from './src/screens/Logout';
import ForgotPasswordScreen from './src/auth/ForgotPasswordScreen';
import CreateEventScreen from './src/screens/CrudEvents/CreateEventScreen';
import { OnboardFlow } from 'react-native-onboard'; // Import OnboardFlow from react-native-onboard
import ProfileScreen from './src/screens/Profile/App';
import AdminMessagesScreen from './src/screens/adminContact';

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [firebaseDetails, setFirebaseDetails] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Default is false
  const [isConnected, setIsConnected] = useState(true);
  const [registrations, setRegistrations] = useState(null);
  const [isChange, setChanged] = useState(null);


  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setIsConnected(state.isInternetReachable);
    });
    const unsubscribeAuth = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => {
      unsubscribeNetInfo();
      unsubscribeAuth();
    };
  }, []);


  // / Handle Email/Password SignIn here
  async function emailPasswordLogin(email, password) {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  }

  async function emailPasswordSignUp(email, password) {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      setUser(user);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);



  useEffect(() => {
    console.log("isChange" + isChange);
    if (user) {
      const fetchFirebaseDetails = async () => {
        const collection = await firestore()
          .collection(FirestoreConfig.collection)
          .doc(FirestoreConfig.documentDetails)
          .get();
        setFirebaseDetails(collection.data());
      };
      fetchFirebaseDetails();

      if (isChange) {
        fetchFirebaseDetails();
      }
    }
  }, [user, isChange]);

  useEffect(() => {


    if (firebaseDetails && user) {
      setIsAdmin("eventadmin@fau.edu" === user.email.toLowerCase());
    }
    console.log(isAdmin);
  }, [firebaseDetails, user]);

  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = firestore()
        .collection(FirestoreConfig.collection)
        .doc(FirestoreConfig.documentRegistrations)
        .onSnapshot((doc) => {
          setRegistrations(doc.data());
        });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const registerParticipant = async (data, eventId) => {
    if (isConnected) {
      const existingRegistration = await firestore()
        .collection(FirestoreConfig.collection)
        .doc(FirestoreConfig.documentRegistrations)
        .get();

      const registrationsData = existingRegistration.data();

      if (registrationsData && registrationsData.hasOwnProperty(eventId)) {
        const registrations = registrationsData[eventId];
        const existingParticipant = Object.values(registrations).find(
          participant => participant.email === data.email
        );

        if (existingParticipant) {
          return {
            status: false,
            msg: "Participant with this email already registered for the event."
          };
        }
      }

      const id = Math.random().toString(36).substring(8);
      await firestore()
        .collection(FirestoreConfig.collection)
        .doc(FirestoreConfig.documentRegistrations)
        .set(
          {
            [eventId]: {
              [id]: {
                ...data,
                attended: false,
                timestamp: new Date().toLocaleString(),
              },
            },
          },
          { merge: true }
        );
      return `${eventId}/${id}`;
    }
    return false;
  };





  const setAttended = async (eventId, id) => {
    console.log("Demo");

    const docRef = firestore()
      .collection(FirestoreConfig.collection)
      .doc(FirestoreConfig.documentRegistrations);

    const doc = await docRef.get();
    const data = doc.data();

    if (data && data[eventId] && data[eventId][id] && data[eventId][id].attended) {
      console.error("Attendance already marked for eventId:", eventId, "and id:", id);
      return { status: false, msg: "ALREADY EXIST" }; // Return status false with message
    }

    await docRef.set({ [eventId]: { [id]: { attended: true } } }, { merge: true });

    return { status: true, msg: "Attendance marked successfully" };
  };




  const Tab = createMaterialBottomTabNavigator();
  return (
    
    <GestureHandlerRootView>
      <PaperProvider>
        <DataContext.Provider
          value={{
            user,
            firebaseDetails,
            isAdmin,
            registerParticipant,
            registrations,
            setAttended,
            emailPasswordLogin,
            emailPasswordSignUp,
            setUser,

            setChanged,
            
          }}>
          <NavigationContainer>
            {!user ? (
              
              <Stack.Navigator >
                
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="forget" component={ForgotPasswordScreen} />
              </Stack.Navigator>
            ) : (

              <Tab.Navigator 
              inactiveColor='#f0edf6'
              activeColor="#f0edf6"
           
              barStyle={{ backgroundColor: '#003366' }}
              shifting={true} >
                <Tab.Screen
                  name=" Home "
                  component={HomeStack}
                  options={{
                    tabBarLabel: 'Home',
                          tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="home" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                          ),
                  }}
                />

                {!isAdmin && ( // Only show the Contact Us tab if the user is not an admin
                   <Tab.Screen
                   name="Contact Us"
                   component={ContactUsScreen}
                   options={{
                     tabBarLabel: 'Contact Us',
                     tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons name="calendar" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                    ),
                   }}
                 />
  )}



                {!user && ( // Only show the Contact Us tab if the user is not an admin
                   <Tab.Screen
                   name="Feedback Show"
                   component={AdminMessagesScreen}
                   options={{
                     tabBarLabel: 'Contact Us',
                     tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons name="calendar" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                    ),
                   }}
                 />
  )}

                

                {isAdmin && ( // Conditionally render QRScanScreen option only when isAdmin is true
                  <Tab.Screen
                    name="QR SCAN"
                    component={QRScanScreen}
                    options={{
                      tabBarLabel: 'Scan',
                      tabBarIcon: ({ color, focused }) => (
                       <MaterialCommunityIcons name="qrcode-scan" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                     ),
                    }}
                  />

                  
                )}

            {isAdmin && ( 
                <Tab.Screen
                name="Create Event"
                component={CreateEventScreen} // Set the component to the LogoutScreen
                options={{
                       tabBarLabel: 'Create',
                       tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="plus-circle" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                      ),
                     }}
              />
                  
                )}

                



               
 <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color, focused }) => (
                    <MaterialCommunityIcons name="account-circle" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                  ),
                }}
              />

{isAdmin && ( // Only show the Contact Us tab if the user is not an admin
                   <Tab.Screen
                   name="Feedback Show"
                   component={AdminMessagesScreen}
                   options={{
                     tabBarLabel: 'Feedbacks',
                     tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons name="calendar" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                    ),
                   }}
                 />
  )}



                <Tab.Screen
                  name="Logout"
                  component={LogoutScreen} // Set the component to the LogoutScreen
                  options={{
                    tabBarLabel: 'Logout',
                    tabBarIcon: ({ color, focused }) => (
                      <MaterialCommunityIcons name="exit-to-app" color={focused ? '#003366' : '#E5E6E4'} size={26} />
                    ),
                  }}
                />

         


              </Tab.Navigator>
            )}

          </NavigationContainer>
          <NoInternet isConnected={isConnected} />
        </DataContext.Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />


      <Stack.Screen name="Event" component={Event} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="QRDisplay" component={QRDisplayScreen} />
    </Stack.Navigator>
  );
};

export default App;