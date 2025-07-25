// Import the functions needed from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Realtime Database

// Firebase configuration 
const firebaseConfig = {
  apiKey: 'AIzaSyC...rJcPpRinUmc',
  authDomain: 'angularapp2-759d7.firebaseapp.com',
  databaseURL: 'https://angularapp2-759d7-default-rtdb.firebaseio.com', // Realtime DB endpoint
  projectId: 'angularapp2-759d7',
  storageBucket: 'angularapp2-759d7.appspot.com',
  messagingSenderId: '51961369285',
  appId: '1:51961369285:web:0824d45206895feee56ac',
  measurementId: 'G-TZITM71X0L',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export the database reference for app-wide use
export const db = getDatabase(app);