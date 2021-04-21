// import authReducer from './authReducer';
import paymentReducer from './paymentReducer';
import tenantReducer from './tenantReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    // auth: authReducer,
    payment: paymentReducer,
    tenants: tenantReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer
