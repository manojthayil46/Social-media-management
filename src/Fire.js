import firebase from 'firebase';
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAyNImbjJd3fDKswhFnAwyzwV7HZ0xLcDA",
  authDomain: "capstone-c76c3.firebaseapp.com",
  databaseURL: "https://capstone-c76c3.firebaseio.com",
  projectId: "capstone-c76c3",
  storageBucket: "capstone-c76c3.appspot.com",
  messagingSenderId: "1090790162467",
  appId: "1:1090790162467:web:180ae4df8887a0b4a13196",
  measurementId: "G-N11GBZ3B44"
};
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;
  export const auth = firebase.auth();
  
