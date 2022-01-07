import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const {
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN,
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

var firebaseConfig = {
  apiKey: `${REACT_APP_FB_API_KEY}`,
  authDomain: `${REACT_APP_FB_AUTH_DOMAIN}`,
  projectId: `${REACT_APP_FB_PROJECT_ID}`,
  storageBucket: `${REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${REACT_APP_APP_ID}`,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const projectStorage = firebase.storage();

export { firebase, projectStorage };
