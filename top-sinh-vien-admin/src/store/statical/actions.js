import {
  GET_ALL_STATICAL_PROGRESS,
  GET_ALL_STATICAL_SUCCESS,
  GET_ALL_STATICAL_FAILED,
} from './constant';
import { STATICALS_ENDPOINT } from '../../api/constant';

export const getAllStatical = () => ({
  types: [
    GET_ALL_STATICAL_PROGRESS,
    GET_ALL_STATICAL_SUCCESS,
    GET_ALL_STATICAL_FAILED
  ],
  callAPI: () => STATICALS_ENDPOINT.GET_ALL_STATICAL(),
  payload: ''
});
