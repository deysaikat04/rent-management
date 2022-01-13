const initState = {
  success: false,
  error: false,
  msg: "",
};

const tenantReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TENANT":
      state = {
        error: action.payload,
        success: true,
        msg: "",
      };
      return state;

    case "ADD_TENANT_ERROR":
      state = {
        error: true,
        success: true,
        msg: action.payload,
      };
      return state;

    case "TENANT_DELETED":
      state = {
        error: false,
        success: true,
        msg: "",
      };
      return state;

    case "TENANT_DELETED_ERROR":
      state = {
        error: true,
        success: false,
        msg: action.err,
      };
      return state;

    case "RESET":
      return initState;

    default:
      return state;
  }
};

export default tenantReducer;
