export const addTenant = (tenant) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async calls to DB
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        firestore.collection('tenants').add({
            ...tenant,
            toc: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_TENANT', tenant });
        }).catch((err) => {
            dispatch({ type: 'ADD_TENANT_ERROR', err });
        });

    }
};

// export const createIncome = (project) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         //make async calls to DB
//         const firestore = getFirestore();
//         const profile = getState().firebase.profile;
//         const authorId = getState().firebase.auth.uid;
//         firestore.collection('income').add({
//             ...project,            
//             authorId: authorId,
//             createdAt: new Date()
//         }).then(() => {
//             dispatch({ type: 'CREATE_INCOME', project: project });
//         }).catch((err) => {
//             dispatch({ type: 'CREATE_INCOME_ERROR', err });
//         });       

//     }
// };

// export const deleteProject = (projectId) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         //make async calls to DB
//         //console.log(projectId)
//         const firestore = getFirestore();
//         firestore.collection('projects').doc(projectId).delete().then(() => {
//             dispatch({ type: 'PROJECT_DELETED' });
//         }).catch((err) => {
//             dispatch({ type: 'PROJECT_DELETED_ERROR', err });
//         });       

//     }
// };
