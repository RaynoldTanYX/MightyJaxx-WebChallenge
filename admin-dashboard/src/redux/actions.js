import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as types from "./actionTypes";

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
      })
      .catch((error) => dispatch(loginFail(error.message)));
  };
};
