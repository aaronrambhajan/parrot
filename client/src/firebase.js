// @flow
import firebase from 'firebase';
import setup from './env.production.js';

const config = {
  apiKey: setup.FIREBASE_API_KEY,
  authDomain: setup.FIREBASE_AUTH_DOMAIN,
  databaseURL: setup.FIREBASE_DATABASE_URL,
  projectId: setup.FIREBASE_PROJECT_ID,
  storageBucket: setup.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: setup.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export default firebase;
