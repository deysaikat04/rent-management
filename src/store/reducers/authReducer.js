const initState = {
  userId: "",
  success: false,
  error: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_USER":
      state = {
        userId: action.payload,
      };
      return state;

    case "USER_SIGNIN":
      state = {
        userId: action.payload,
      };
      return state;

    case "ADD_USER_ERROR":
      return state;

    case "USER_LOGIN":
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000 * 24 * 7;
      now.setTime(time);
      document.cookie =
        "userid=" +
        action.payload +
        "; expires=" +
        now.toUTCString() +
        "; path=/";
      state = {
        userId: action.payload,
        success: true,
        error: false,
      };
      return state;

    case "USER_LOGIN_ERROR":
      state = {
        userId: "",
        success: false,
        error: true,
      };
      return state;

    case "USER_LOGOUT":
      state = {
        userId: "",
        success: false,
        error: false,
      };
      return state;
    default:
      return state;
  }
};

export default authReducer;
