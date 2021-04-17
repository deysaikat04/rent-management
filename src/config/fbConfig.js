import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const { FB_API_KEY, FB_AUTH_DOMAIN, FB_PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } = process.env;

var firebaseConfig = {
    apiKey: `${FB_API_KEY}`,
    authDomain: `${FB_AUTH_DOMAIN}`,
    projectId: `${FB_PROJECT_ID}`,
    storageBucket: `${STORAGE_BUCKET}`,
    messagingSenderId: `${MESSAGING_SENDER_ID}`,
    appId: `${APP_ID}`
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;