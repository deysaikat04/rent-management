export const addDocs = (uploadObj, userId, tenantId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async calls to DB
        const firestore = getFirestore();
        // const profile = getState().firebase.profile;

        firestore.collection('documents').doc(tenantId).set({
            docs: [ ...uploadObj ],
            userId,
            toc: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_DOCUMENT', payload: false });
        }).catch((err) => {
            dispatch({ type: 'ADD_DOCUMENT_ERROR', payload: err });
        });
    }
};

export const resetPaymentState = () => {
    return {
        type: 'RESET'
    }
}