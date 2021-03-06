import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import * as types from "../constants/actionTypes";

const loginInitiate = () => ({
  type: types.LOGIN_INITIATE,
});

const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFail = (error) => ({
  type: types.LOGIN_FAIL,
  payload: error,
});

export const login = (email, password) => {
  return function (dispatch) {
    dispatch(loginInitiate());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(loginSuccess(user));
        localStorage.setItem("userAccessToken", user.accessToken);
        localStorage.setItem("userEmail", user.email);
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};

export const checkLocalStorageForLogin = () => {
  return function (dispatch) {
    const accessToken = localStorage.getItem("userAccessToken");
    const email = localStorage.getItem("userEmail");
    if (accessToken && email) {
      dispatch(loginSuccess({ accessToken, email }));
    }
  };
};

const logoutInitiate = () => ({
  type: types.LOGOUT_INITIATE,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
  type: types.LOGOUT_FAIL,
  payload: error,
});

export const logout = () => {
  return function (dispatch) {
    dispatch(logoutInitiate());
    signOut(auth)
      .then(() => {
        dispatch(logoutSuccess());
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userEmail");
      })
      .catch((error) => dispatch(logoutFail(error.message)));
  };
};
