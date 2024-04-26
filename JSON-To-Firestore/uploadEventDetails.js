const firebase = require('firebase');
const data = require('./firestore.json');

// find these entries while registering you web app in firebase
firebase.initializeApp({
  apiKey: "AIzaSyAota7vSabFfSpFT4BkYhmAeqF_xijossQ",
  authDomain: "fevents-9c52d.firebaseapp.com",
  projectId: "fevents-9c52d",
  storageBucket: "fevents-9c52d.appspot.com",
  messagingSenderId: "702102525349",
  appId: "1:702102525349:web:b1f248aae962f342bd044c"
});

const db = firebase.firestore();

// make sure the list of dates is in milliseconds
data.data.events.forEach((val) => {
  val.slots.forEach(
    (milliSeconds, idx) =>
      (val.slots[idx] = firebase.firestore.Timestamp.fromDate(
        new Date(milliSeconds),
      )),
  );
});

db.collection(data.collectionName).doc(data.documentName).set(data.data);