import {
  TOGGLE_MODAL,
  GET_ALL_SCHOOL_SUCCESS,
  GET_ALL_SCHOOL_PROGRESS,
  GET_ALL_SCHOOL_FAILED,
  REMOVE_SCHOOL_SUCCESS,
  REMOVE_SCHOOL_PROGRESS,
  REMOVE_SCHOOL_FAILED,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_PROGRESS,
  ADD_SCHOOL_FAILED,
  EDIT_SCHOOL_SUCCESS,
  EDIT_SCHOOL_PROGRESS,
  EDIT_SCHOOL_FAILED,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_PROGRESS,
  ADD_TEAM_FAILED,
  ADD_ADS_SCHOOL_SUCCESS,
  ADD_ADS_SCHOOL_PROGRESS,
  ADD_ADS_SCHOOL_FAILED
} from './constant';
import { SCHOOL_ENDPOINT, CAMPAIGN_EVENTS_ENDPOINT } from '../../api/constant';
import { updateStatus } from './../common/actions';
import { toast } from 'react-toastify';

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const addTeam = ({ school_id = null, filter }) => {
  return async dispatch => {
    dispatch(updateStatus(ADD_TEAM_PROGRESS));
    try {
      const payload = await CAMPAIGN_EVENTS_ENDPOINT.ADD_TEAM({ school_id, filter });
      dispatch(updateStatus(ADD_TEAM_SUCCESS, payload));
      toast.success('Add all school to team success');
    } catch (error) {
      dispatch(updateStatus(ADD_TEAM_FAILED, { error }));
      toast.error(error || 'Oops. Something errors!');
    }
  };
};

export const getAllSchool = ({ page = 1, limit = 500, key = '' }) => {
  return async dispatch => {
    dispatch(updateStatus(GET_ALL_SCHOOL_PROGRESS));
    try {
      const payload = await SCHOOL_ENDPOINT.GET_ALL_SCHOOL({ page, limit, key });
      dispatch(updateStatus(GET_ALL_SCHOOL_SUCCESS, payload));
    } catch (error) {
      dispatch(updateStatus(GET_ALL_SCHOOL_FAILED, { error }));
      toast.error(error);
    }
  };
};

export const addSchool = data => {
  return async dispatch => {
    dispatch(updateStatus(ADD_SCHOOL_PROGRESS));
    try {
      const payload = await SCHOOL_ENDPOINT.ADD_SCHOOL(data);
      dispatch(updateStatus(ADD_SCHOOL_SUCCESS, payload));
    } catch (error) {
      dispatch(updateStatus(ADD_SCHOOL_FAILED, { error }));
      toast.error(error);
    }
  };
};

export const removeSchool = ({ school_id }) => {
  return {
    types: [REMOVE_SCHOOL_PROGRESS, REMOVE_SCHOOL_SUCCESS, REMOVE_SCHOOL_FAILED],
    callAPI: () => SCHOOL_ENDPOINT.REMOVE_SCHOOL({ school_id }),
    payload: { school_id }
  };
};

export const editSchool = ({ school_id, payload }) => {
  return {
    types: [EDIT_SCHOOL_PROGRESS, EDIT_SCHOOL_SUCCESS, EDIT_SCHOOL_FAILED],
    callAPI: () => SCHOOL_ENDPOINT.EDIT_SCHOOL({ school_id, payload }),
    payload: { school_id, payload }
  };
};

export const addAdsSchool = ({ id_school }) => {
  return {
    types: [ADD_ADS_SCHOOL_SUCCESS, ADD_ADS_SCHOOL_SUCCESS, ADD_ADS_SCHOOL_FAILED],
    callAPI: () => SCHOOL_ENDPOINT.ADD_ADS_SCHOOL({ id_school }),
    payload: { id_school }
  };
};
