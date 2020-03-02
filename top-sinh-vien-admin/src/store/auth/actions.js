import {
  GET_ME_SUCCESS,
  GET_ME_PROGRESS,
  GET_ME_FAILED
} from './constant';
import { USER_ENDPOINT } from '../../api/constant';
import { updateStatus } from './../common/actions';

export const getMe = () => {
  return async dispatch => {
    dispatch(updateStatus(GET_ME_PROGRESS));
    try {
      const payload = await USER_ENDPOINT.ME();
      dispatch(updateStatus(GET_ME_SUCCESS, payload ));
    } catch (error) {
      dispatch(updateStatus(GET_ME_FAILED, { error }));
    }
  };
};