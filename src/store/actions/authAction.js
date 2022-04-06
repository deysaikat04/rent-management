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

export const logIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((resp) => {
        console.log("Success");
        dispatch({ type: "USER_LOGIN", payload: resp.user.uid });
      })
      .catch((error) => {
        console.log("Login error", error);
        dispatch({ type: "USER_LOGIN_ERROR", error });
      });
  };
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "USER_LOGOUT" });
      })
      .catch((error) => {
        console.log("Login error", error);
        dispatch({ type: "USER_LOGIN_ERROR", error });
      });
  };
};
