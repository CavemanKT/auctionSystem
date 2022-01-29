import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
export {  ref, deleteObject } from 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})
// remember to create next.config.js, when I deploy to vercel,

// then use the structure below to specify the environment variable

// module.exports = {
//   env: {
//     customKey: 'my-value',
//   },
// }

export const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID
export const timestamp = firebase.firestore.FieldValue.serverTimestamp
export const firestoreApp = app.firestore()
export const storageApp = app.storage()
export const authApp = app.auth()
export const storage = getStorage(app);
