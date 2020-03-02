import {
  GET_ALL_LOCATION_REVIEW_PROGRESS,
  GET_ALL_LOCATION_REVIEW_SUCCESS,
  GET_ALL_LOCATION_REVIEW_FAILED,
  GET_LOCATION_REVIEW_PROGRESS,
  GET_LOCATION_REVIEW_SUCCESS,
  GET_LOCATION_REVIEW_FAILED,
  DELETE_LOCATION_REVIEW_PROGRESS,
  DELETE_LOCATION_REVIEW_SUCCESS,
  DELETE_LOCATION_REVIEW_FAILED
} from './constant';
import { LOCATION_REVIEW_ENDPOINT } from '../../api/constant';

export const getAllLocationReview = ({ page = 1, limit = 10, location, search_name }) => {
  return {
    types: [GET_ALL_LOCATION_REVIEW_PROGRESS, GET_ALL_LOCATION_REVIEW_SUCCESS, GET_ALL_LOCATION_REVIEW_FAILED],
    callAPI: () => LOCATION_REVIEW_ENDPOINT.ALL_LOCATION_REVIEW({ page, limit, location, search_name }),
    payload: { page, limit, location, search_name }
  };
};

export const getLocationReview = ({ id }) => {
  return {
    types: [GET_LOCATION_REVIEW_PROGRESS, GET_LOCATION_REVIEW_SUCCESS, GET_LOCATION_REVIEW_FAILED],
    callAPI: () => LOCATION_REVIEW_ENDPOINT.GET_LOCATION_REVIEW({ id }),
    payload: { id }
  };
};

export const deleteLocationReview = ({ id }) => {
  return {
    types: [DELETE_LOCATION_REVIEW_PROGRESS, DELETE_LOCATION_REVIEW_SUCCESS, DELETE_LOCATION_REVIEW_FAILED],
    callAPI: () => LOCATION_REVIEW_ENDPOINT.DELETE_LOCATION_REVIEW({ id }),
    payload: { id }
  };
};
