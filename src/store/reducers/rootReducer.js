// import authReducer from './authReducer';
import paymentReducer from './paymentReducer';
import tenantReducer from './tenantReducer';
import authReducer from './authReducer';
import documentReducer from './documentReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    payment: paymentReducer,
    tenants: tenantReducer,
    auth: authReducer,
    documents: documentReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer
