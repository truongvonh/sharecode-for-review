import {
  GET_STATISTICAL_PROGRESS,
  GET_STATISTICAL_SUCCESS,
  GET_STATISTICAL_FAILED,
  GET_FILTER_MEMBER_PROGRESS,
  GET_FILTER_MEMBER_SUCCESS,
  GET_FILTER_MEMBER_FAILED,
  GET_YEAR_CREATE_PROGRESS,
  GET_YEAR_CREATE_SUCCESS,
  GET_YEAR_CREATE_FAILED
} from './constant';

const initialState = {
  isLoading: true,
  status: '',
  allStatistical: null,
  error: null,
  filterStatistical: null,
  allYearCreateUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATISTICAL_PROGRESS:
    case GET_FILTER_MEMBER_PROGRESS:
    case GET_YEAR_CREATE_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case GET_STATISTICAL_FAILED:
    case GET_FILTER_MEMBER_FAILED:
    case GET_YEAR_CREATE_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case GET_STATISTICAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allStatistical: action.data[0],
        status: action.type
      };
    }
    case GET_FILTER_MEMBER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        filterStatistical: action.data && action.data,
        status: action.type
      };
    }
    case GET_YEAR_CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allYearCreateUser: action.data && action.data,
        status: action.type
      };
    }
    default:
      return state;
  }
};
export default reducer;
