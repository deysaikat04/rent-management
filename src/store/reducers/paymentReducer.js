const initState = {
  success: false,
  error: false,
  msg: "",
};

const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_PAYMENT":
      state = {
        error: action.payload,
        success: true,
        msg: "",
      };
      return state;

    case "ADD_PAYMENT_ERROR":
      state = {
        error: true,
        msg: action.payload,
        success: false,
      };
      return state;

    case "RESET":
      return initState;

    default:
      return state;
  }
};

export default paymentReducer;
