// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyDPM1m7rTUcuzrTSZkCgyfZZ03CShzptVU',
  authDomain: 'mobileappdevelopment-final.firebaseapp.com',
  databaseURL: 'https://mobileappdevelopment-final-default-rtdb.firebaseio.com',
  projectId: 'mobileappdevelopment-final',
  storageBucket: 'mobileappdevelopment-final.firebasestorage.app',
  messagingSenderId: '1030378318420',
  appId: '1:1030378318420:web:23c175a862eb9c44325bc1',
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
