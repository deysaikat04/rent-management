export const addPayment = (paymentObj, tenantId, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async calls to DB
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;

        firestore.collection('tenants').doc(tenantId).update({
            payments: { ...paymentObj },
            toc: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_PAYMENT', payload: false });
        }).catch((err) => {
            dispatch({ type: 'ADD_PAYMENT_ERROR', payload: err });
        });
    }
};

export const resetPaymentState = () => {
    return {
        type: 'RESET'
    }
}