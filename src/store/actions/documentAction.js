export const addDocs = (uploadObj, userId, tenantId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async calls to DB
    const firestore = getFirestore();
    // const profile = getState().firebase.profile;

    firestore
      .collection("documents")
      .doc(tenantId)
      .set({
        docs: { ...uploadObj },
        userId,
        tenantId,
        toc: new Date(),
      })
      .then(() => {
        // dispatch({ type: "ADD_DOCUMENT", payload: uploadObj });
        dispatch(fetchDocs(userId));
      })
      .catch((err) => {
        dispatch({ type: "ADD_DOCUMENT_ERROR", payload: err });
      });
  };
};
export const fetchDocs = (userId, tenantId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async calls to DB
    const firestore = getFirestore();
    let alldocumentArray = [];
    let docsOfTenant = [];
    let noData = false;

    firestore
      .collection("documents")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          let tenantDocumentArr = [];
          var data = element.data();
          if (data["userId"] === userId && data["tenantId"] === tenantId) {
            alldocumentArray.push(data);

            if (alldocumentArray.length) {
              const documentObj = alldocumentArray.filter(
                (_) => _.tenantId === tenantId
              )[0];
              for (let item in documentObj.docs) {
                tenantDocumentArr.push(documentObj.docs[item]);
              }
              if (tenantDocumentArr.length === 0) noData = true;
              docsOfTenant = tenantDocumentArr;
            }
          }
        });
        if (docsOfTenant.length || noData)
          dispatch({ type: "FETCH_DOCUMENT", payload: docsOfTenant });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_DOCUMENT_ERROR", payload: err });
      });
  };
};

export const resetPaymentState = () => {
  return {
    type: "RESET",
  };
};
