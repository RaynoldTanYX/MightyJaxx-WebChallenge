import * as types from "../actionTypes";

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_INITIATE:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.LOGOUT_INITIATE:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: null,
      };
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
