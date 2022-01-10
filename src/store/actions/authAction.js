export const addUser = ({ googleId, name, email }) => {
  return (dispatch, getState, { getFirestore }) => {
    let userExists = false;
    const firestore = getFirestore();

    firestore
      .collection("users")
      .where("googleId", "==", googleId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          userExists = false;
        } else {
          snapshot.forEach((doc) => {
            userExists = true;
          });
        }
        if (!userExists) {
          firestore
            .collection("users")
            .add({
              googleId,
              name,
              email,
              toc: new Date(),
            })
            .then(() => {
              dispatch({ type: "ADD_USER", payload: googleId });
            })
            .catch((err) => {
              dispatch({ type: "ADD_USER_ERROR", err });
            });
        }
      })
      .catch((err) => {
        dispatch({ type: "ADD_USER_ERROR", err });
      });
  };
};


export const signIn = (userId) => {
  return { type: "USER_SIGNIN", payload: userId };
};
