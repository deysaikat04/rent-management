export const addUser = (userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async calls to DB
        const firestore = getFirestore();
        firestore.collection('users').add({
            ...userId,
            toc: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_USER', payload: userId });
        }).catch((err) => {
            dispatch({ type: 'ADD_USER_ERROR', err });
        });
    }
};

export const signIn = (userId) => {
    return (
        { type: 'USER_SIGNIN', payload: userId }
    )
}