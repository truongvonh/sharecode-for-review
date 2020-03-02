import { COMMON_TYPES } from './constant';
import { AUTH_ACTION_TYPES } from 'constants/actionTypes';

export const toggleLoginModal = () => dispatch => {
  dispatch({ type: COMMON_TYPES.TOGGLE_LOGIN_MODAL });
  dispatch({ type: AUTH_ACTION_TYPES.CLEAR_AUTH_ERROR });
};

export const getAllGroup = payload => dispatch => {
  dispatch({
    type: COMMON_TYPES.GET_ALL_GROUPS,
    payload
  });
};

export const closeLoginModal = () => dispatch => {
  dispatch({ type: COMMON_TYPES.CLOSE_LOGIN_MODAL });
  dispatch({ type: AUTH_ACTION_TYPES.CLEAR_AUTH_ERROR });
};

export const onSearchMain = payload => dispatch => {
  dispatch({
    type: COMMON_TYPES.SEARCH_MAIN,
    payload
  });
};

export const openLoading = () => dispatch => {
  dispatch({
    type: COMMON_TYPES.OPEN_LOADING
  });
};

export const closeLoading = () => dispatch => {
  dispatch({
    type: COMMON_TYPES.CLOSE_LOADING
  });
};

export const getDetailReviewSchool = detailData => dispatch => {
  dispatch({
    type: COMMON_TYPES.GET_DETAILS_REVIEW_SCHOOL,
    detailData
  });
};

export const getDetailReviewLocation = detailData => dispatch => {
  dispatch({
    type: COMMON_TYPES.GET_DETAILS_REVIEW_LOCATION,
    detailData
  });
};
