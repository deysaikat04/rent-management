export const addTenant = (tenant, userId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async calls to DB
        const firestore = getFirestore();
        firestore.collection('tenants').add({
            userId: userId,
            ...tenant,
            toc: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_TENANT', payload: false });
        }).catch((err) => {
            dispatch({ type: 'ADD_TENANT_ERROR', payload: err });
        });

    }
};

export const resetState = () => {
    return {
        type: 'RESET'
    }
}
