/* eslint-disable no-case-declarations */
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

const initialState = {
  isOpen: false,
  isLoading: false,
  status: '',
  schoolsReview: [],
  error: null,
  total: 0,
  detailReview: null,
  allComment: [],
  nextPage: false,
  allReplyComment: [],
  nextPageReply: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SCHOOL_REVIEW_PROGRESS:
    case REMOVE_SCHOOL_REVIEW_PROGRESS:
    case DETAIL_SCHOOL_REVIEW_PROGRESS:
    case DELETE_COMMENT_PROGRESS:
    case ALL_COMMENT_PROGRESS:
    case ALL_REPLY_COMMENT_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_ALL_SCHOOL_REVIEW_SUCCESS:
      return {
        ...state,
        status: action.type,
        schoolsReview: action.data.data,
        total: action.data && action.data.pageCount
      };
    case REMOVE_SCHOOL_REVIEW_SUCCESS:
      const schoolsReview = [...state.schoolsReview].filter(
        schoolsReview => schoolsReview._id !== (action.data && action.data.id)
      );
      return {
        ...state,
        status: action.type,
        schoolsReview,
        total: state.total - 1
      };
    case DETAIL_SCHOOL_REVIEW_SUCCESS:
      return {
        ...state,
        status: action.type,
        detailReview: action && action.data
      };
    case DELETE_COMMENT_SUCCESS:
      const data = state.allComment.filter(item => item.comment._id !== action.data._id);
      return {
        ...state,
        status: action.type,
        allComment: data
      };
    case ALL_COMMENT_SUCCESS:
      return {
        ...state,
        status: action.type,
        allComment: action.data.result.length ? [...state.allComment, ...action.data.result] : [],
        nextPage: action.data && action.data.nextPage
      };
    case ALL_REPLY_COMMENT_SUCCESS:
      return {
        ...state,
        status: action.type,
        allReplyComment: action.data.result.length ? action.data.result : [],
        nextPageReply: action.data && action.data.nextPage
      };
    case GET_ALL_SCHOOL_REVIEW_FAILED:
    case REMOVE_SCHOOL_REVIEW_FAILED:
    case DETAIL_SCHOOL_REVIEW_FAILED:
    case DELETE_COMMENT_FAILED:
    case ALL_COMMENT_FAILED:
    case ALL_REPLY_COMMENT_FAILED:
      return {
        ...state,
        status: action.type,
        error: action.error
      };
    case RESET_COMMENT:
      return {
        ...state,
        allComment: [],
        allReplyComment: []
      };
    default:
      return state;
  }
};

export default reducer;
