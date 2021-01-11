import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCaTgK8hAdunQVKo_gwmwAbh8lSZtV3i1M",
  authDomain: "bot-browar.firebaseapp.com",
  databaseURL: "https://bot-browar-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bot-browar",
  storageBucket: "bot-browar.appspot.com",
  messagingSenderId: "499705840060",
  appId: "1:499705840060:web:d453ee3467e0e4b9232bb9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();