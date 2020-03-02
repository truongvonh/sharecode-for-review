import {
  GET_ALL_BADGE_PROGRESS,
  GET_ALL_BADGE_SUCCESS,
  GET_ALL_BADGE_FAILED,

  EDIT_BADGE_PROGRESS,
  EDIT_BADGE_SUCCESS,
  EDIT_BADGE_FAILED,
  DELETE_BADGE_PROGRESS,
  DELETE_BADGE_SUCCESS,
  DELETE_BADGE_FAILED,
} from './constant';
import { BADGE_ENDPOINT } from '../../api/constant';

export const getAllBadge = () => ({
  types: [
    GET_ALL_BADGE_PROGRESS,
    GET_ALL_BADGE_SUCCESS,
    GET_ALL_BADGE_FAILED
  ],
  callAPI: () => BADGE_ENDPOINT.GET_ALL_BADGE(),
  payload: ''
});

export const updateBadge = ({ id, badge_type, name, day_count, photos, delete_photos, point, comment_count }) => ({
  types: [
    EDIT_BADGE_PROGRESS,
    EDIT_BADGE_SUCCESS,
    EDIT_BADGE_FAILED
  ],
  callAPI: () => BADGE_ENDPOINT.EDIT_BADGE({ id, badge_type, name, day_count, photos, delete_photos, point, comment_count }),
  payload: { id, badge_type, name, day_count, photos, delete_photos, point, comment_count }
});

export const deleteBadge = ({ id }) => ({
  types: [
    DELETE_BADGE_PROGRESS,
    DELETE_BADGE_SUCCESS,
    DELETE_BADGE_FAILED
  ],
  callAPI: () => BADGE_ENDPOINT.DELETE_BADGE({ id }),
  payload: { id }
});
