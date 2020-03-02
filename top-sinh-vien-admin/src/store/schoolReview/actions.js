import {
  GET_ALL_SCHOOL_REVIEW_PROGRESS,
  GET_ALL_SCHOOL_REVIEW_SUCCESS,
  GET_ALL_SCHOOL_REVIEW_FAILED,
  DETAIL_SCHOOL_REVIEW_PROGRESS,
  DETAIL_SCHOOL_REVIEW_SUCCESS,
  DETAIL_SCHOOL_REVIEW_FAILED,
  REMOVE_SCHOOL_REVIEW_PROGRESS,
  REMOVE_SCHOOL_REVIEW_SUCCESS,
  REMOVE_SCHOOL_REVIEW_FAILED,
  DELETE_COMMENT_PROGRESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILED,
  ALL_COMMENT_PROGRESS,
  ALL_COMMENT_SUCCESS,
  ALL_COMMENT_FAILED,
  ALL_REPLY_COMMENT_PROGRESS,
  ALL_REPLY_COMMENT_SUCCESS,
  ALL_REPLY_COMMENT_FAILED,
  RESET_COMMENT
} from './constant';

import { SCHOOL_REVIEW_ENDPOINT, COMMENT_ENDPOINT } from '../../api/constant';
import { toast } from 'react-toastify';
import { updateStatus } from './../common/actions';

export const getAllSchoolReview = ({ page = 1, limit = 500, id_school }) => {
  return async dispatch => {
    dispatch(updateStatus(GET_ALL_SCHOOL_REVIEW_PROGRESS));
    try {
      const payload = await SCHOOL_REVIEW_ENDPOINT.LIST_SCHOOL_REVIEW({ page, limit, id_school });
      dispatch(updateStatus(GET_ALL_SCHOOL_REVIEW_SUCCESS, payload));
    } catch (error) {
      dispatch(updateStatus(GET_ALL_SCHOOL_REVIEW_FAILED, { error }));
      toast.error(error);
    }
  };
};

export const removeSchoolReview = ({ id }) => {
  return {
    types: [REMOVE_SCHOOL_REVIEW_PROGRESS, REMOVE_SCHOOL_REVIEW_SUCCESS, REMOVE_SCHOOL_REVIEW_FAILED],
    callAPI: () => SCHOOL_REVIEW_ENDPOINT.DELETE_SCHOOL_REVIEW({ id }),
    payload: { id }
  };
};

export const detailSchoolReview = ({ id }) => {
  return {
    types: [DETAIL_SCHOOL_REVIEW_PROGRESS, DETAIL_SCHOOL_REVIEW_SUCCESS, DETAIL_SCHOOL_REVIEW_FAILED],
    callAPI: () => SCHOOL_REVIEW_ENDPOINT.DETAIL_SCHOOL_REVIEW({ id }),
    payload: { id }
  };
};

export const deleteComment = ({ id }) => {
  return {
    types: [DELETE_COMMENT_PROGRESS, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED],
    callAPI: () => COMMENT_ENDPOINT.DELETE_COMMENT({ id }),
    payload: { id }
  };
};

export const getAllComment = ({ page, limit, comment_type, document }) => {
  return {
    types: [ALL_COMMENT_PROGRESS, ALL_COMMENT_SUCCESS, ALL_COMMENT_FAILED],
    callAPI: () => COMMENT_ENDPOINT.ALL_COMMENT({ page, limit, comment_type, document }),
    payload: { page, limit, comment_type, document }
  };
};

export const getAllReplyComment = ({ page, limit, parent }) => {
  return {
    types: [ALL_REPLY_COMMENT_PROGRESS, ALL_REPLY_COMMENT_SUCCESS, ALL_REPLY_COMMENT_FAILED],
    callAPI: () => COMMENT_ENDPOINT.ALL_REPLY_COMMENT({ page, limit, parent }),
    payload: { page, limit, parent }
  };
};

export const resetComment = () => {
  return {
    types: [RESET_COMMENT, RESET_COMMENT, RESET_COMMENT],
    callAPI: async () => ({}),
    payload: {}
  };
};
