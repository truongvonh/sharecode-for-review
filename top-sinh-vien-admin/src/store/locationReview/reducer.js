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
import UserModel from '../../model/User';

const initialState = {
  isLoading: false,
  status: '',
  allLocationReview: [],
  total: 0,
  error: null,
  detailReview: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOCATION_REVIEW_PROGRESS:
    case GET_LOCATION_REVIEW_PROGRESS:
    case DELETE_LOCATION_REVIEW_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_ALL_LOCATION_REVIEW_FAILED:
    case GET_LOCATION_REVIEW_FAILED:
    case DELETE_LOCATION_REVIEW_FAILED:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.error
      };
    case GET_ALL_LOCATION_REVIEW_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocationReview: action.data && action.data.data,
        total: action.data && action.data.pageCount
      };
    case GET_LOCATION_REVIEW_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        detailReview: action.data
      };
    case DELETE_LOCATION_REVIEW_SUCCESS:
      const allLocationReview = [...state.allLocationReview].filter(item => item._id !== action.data._id);
      return {
        ...state,
        status: action.type,
        allLocationReview
      };
    default:
      return state;
  }
};

export default reducer;
