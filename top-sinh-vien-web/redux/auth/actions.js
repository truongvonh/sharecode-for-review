import { AUTH_ACTION_TYPES } from 'constants/actionTypes';

export const getUserInfo = (userInfo) => dispatch => {
    dispatch({
        type: AUTH_ACTION_TYPES.USER_INFO,
        payload: userInfo
    });
};

export const logOut = () => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPES.LOGOUT,
  });
};

export const clearErrorMessage = () => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPES.CLEAR_AUTH_ERROR,
  });
};

export const onAuthError = (errorMessage) => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPES.AUTH_ERROR,
    errorMessage
  });
};

export const updateUserInfo = (userInfo) => dispatch => {
  dispatch({
    type: AUTH_ACTION_TYPES.UPDATE_USER_INFO,
    userInfo
  });
};