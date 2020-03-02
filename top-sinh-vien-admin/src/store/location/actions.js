import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_PROGRESS,
  GET_LOCATION_FAILED,
  GET_ALL_LOCATION_SUCCESS,
  GET_ALL_LOCATION_PROGRESS,
  GET_ALL_LOCATION_FAILED,
  ADD_NEAR_SCHOOL_SUCCESS,
  ADD_NEAR_SCHOOL_PROGRESS,
  ADD_NEAR_SCHOOL_FAILED,
  FILTER_LOCATION_NEAR_SCHOOL_SUCCESS,
  FILTER_LOCATION_NEAR_SCHOOL_PROGRESS,
  FILTER_LOCATION_NEAR_SCHOOL_FAILED,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_PROGRESS,
  DELETE_LOCATION_FAILED,
  GET_ALL_LOCATION_TYPE_SUCCESS,
  GET_ALL_LOCATION_TYPE_PROGRESS,
  GET_ALL_LOCATION_TYPE_FAILED,
  POST_LOCATION_TYPE_SUCCESS,
  POST_LOCATION_TYPE_PROGRESS,
  POST_LOCATION_TYPE_FAILED,
  DELETE_LOCATION_TYPE_SUCCESS,
  DELETE_LOCATION_TYPE_PROGRESS,
  DELETE_LOCATION_TYPE_FAILED,
  ADD_TYPE_IN_LOCATION_SUCCESS,
  ADD_TYPE_IN_LOCATION_PROGRESS,
  ADD_TYPE_IN_LOCATION_FAILED,
  EDIT_LOCATION_TYPE_SUCCESS,
  EDIT_LOCATION_TYPE_PROGRESS,
  EDIT_LOCATION_TYPE_FAILED,
  USER_GET_ALL_LOCATION_TYPE_SUCCESS,
  USER_GET_ALL_LOCATION_TYPE_PROGRESS,
  USER_GET_ALL_LOCATION_TYPE_FAILED,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_PROGRESS,
  ADD_LOCATION_FAILED,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_PROGRESS,
  UPDATE_LOCATION_FAILED,
  ADD_ADS_LOCATION_SUCCESS,
  ADD_ADS_LOCATION_PROGRESS,
  ADD_ADS_LOCATION_FAILED
} from './constant';
import { LOCATION_ENDPOINT } from '../../api/constant';

export const getLocation = ({ place_id }) => {
  return {
    types: [GET_LOCATION_PROGRESS, GET_LOCATION_SUCCESS, GET_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.GET_LOCATION({ place_id }),
    payload: { place_id }
  };
};

export const getAllLocation = ({ page = 1, limit = 10, key = '', id_type, id_school }) => {
  return {
    types: [GET_ALL_LOCATION_PROGRESS, GET_ALL_LOCATION_SUCCESS, GET_ALL_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.GET_ALL_LOCATION({ page, limit, key, id_type, id_school }),
    payload: { page, limit, key, id_type, id_school }
  };
};

export const addNearSchool = ({ id_school, id_location, flag }) => {
  return {
    types: [ADD_NEAR_SCHOOL_PROGRESS, ADD_NEAR_SCHOOL_SUCCESS, ADD_NEAR_SCHOOL_FAILED],
    callAPI: () => LOCATION_ENDPOINT.ADD_NEAR_SCHOOL({ id_school, id_location, flag }),
    payload: { id_school, id_location, flag }
  };
};

export const filterLocationNearSchool = ({ school_id, key, limit = 10, page = 1 }) => {
  return {
    types: [
      FILTER_LOCATION_NEAR_SCHOOL_PROGRESS,
      FILTER_LOCATION_NEAR_SCHOOL_SUCCESS,
      FILTER_LOCATION_NEAR_SCHOOL_FAILED
    ],
    callAPI: () => LOCATION_ENDPOINT.FILTER_LOCATION_NEAR_SCHOOL({ school_id, key, limit, page }),
    payload: { school_id, key, limit, page }
  };
};

export const deleteLocation = ({ location_id }) => {
  return {
    types: [DELETE_LOCATION_PROGRESS, DELETE_LOCATION_SUCCESS, DELETE_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.DELETE_LOCATION({ location_id }),
    payload: { location_id }
  };
};

export const getAllLocationType = () => {
  return {
    types: [GET_ALL_LOCATION_TYPE_PROGRESS, GET_ALL_LOCATION_TYPE_SUCCESS, GET_ALL_LOCATION_TYPE_FAILED],
    callAPI: () => LOCATION_ENDPOINT.GET_ALL_LOCATION_TYPE(),
    payload: ''
  };
};
export const userGetAllLocationType = () => {
  return {
    types: [USER_GET_ALL_LOCATION_TYPE_PROGRESS, USER_GET_ALL_LOCATION_TYPE_SUCCESS, USER_GET_ALL_LOCATION_TYPE_FAILED],
    callAPI: () => LOCATION_ENDPOINT.USER_GET_ALL_LOCATION_TYPE(),
    payload: ''
  };
};

export const postLocationType = ({ name }) => {
  return {
    types: [POST_LOCATION_TYPE_PROGRESS, POST_LOCATION_TYPE_SUCCESS, POST_LOCATION_TYPE_FAILED],
    callAPI: () => LOCATION_ENDPOINT.POST_LOCATION_TYPE({ name }),
    payload: { name }
  };
};

export const deleteLocationType = ({ id }) => {
  return {
    types: [DELETE_LOCATION_TYPE_PROGRESS, DELETE_LOCATION_TYPE_SUCCESS, DELETE_LOCATION_TYPE_FAILED],
    callAPI: () => LOCATION_ENDPOINT.DELETE_LOCATION_TYPE({ id }),
    payload: { id }
  };
};

export const addTypeInLocation = ({ id_location, id_type_location }) => {
  return {
    types: [ADD_TYPE_IN_LOCATION_PROGRESS, ADD_TYPE_IN_LOCATION_SUCCESS, ADD_TYPE_IN_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.ADD_TYPE_IN_LOCATION({ id_location, id_type_location }),
    payload: { id_location, id_type_location }
  };
};

export const editLocationType = ({ id, name }) => {
  return {
    types: [EDIT_LOCATION_TYPE_PROGRESS, EDIT_LOCATION_TYPE_SUCCESS, EDIT_LOCATION_TYPE_FAILED],
    callAPI: () => LOCATION_ENDPOINT.EDIT_LOCATION_TYPE({ id, name }),
    payload: { id, name }
  };
};

export const addLocation = ({ name, address, description, coordinate, website, avatar, photos }) => {
  return {
    types: [ADD_LOCATION_PROGRESS, ADD_LOCATION_SUCCESS, ADD_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.ADD_LOCATION({ name, address, description, coordinate, website, avatar, photos }),
    payload: { name, address, description, coordinate, website, avatar, photos }
  };
};

export const updateLocation = ({
  id,
  name,
  address,
  description,
  coordinate,
  website,
  avatar,
  photos,
  delete_photos,
  delete_avatar
}) => {
  return {
    types: [UPDATE_LOCATION_PROGRESS, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILED],
    callAPI: () =>
      LOCATION_ENDPOINT.UPDATE_LOCATION({
        id,
        name,
        address,
        description,
        coordinate,
        website,
        avatar,
        photos,
        delete_photos,
        delete_avatar
      }),
    payload: { id, name, address, description, coordinate, website, avatar, photos, delete_photos, delete_avatar }
  };
};

export const addAdsLocation = ({ id_location }) => {
  return {
    types: [ADD_ADS_LOCATION_PROGRESS, ADD_ADS_LOCATION_SUCCESS, ADD_ADS_LOCATION_FAILED],
    callAPI: () => LOCATION_ENDPOINT.ADD_ADS_LOCATION({ id_location }),
    payload: { id_location }
  };
};
