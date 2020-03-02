import {
  GET_ALL_REPORT_PROGRESS,
  GET_ALL_REPORT_SUCCESS,
  GET_ALL_REPORT_FAILED,
  BLOCK_REPORT_PROGRESS,
  BLOCK_REPORT_SUCCESS,
  BLOCK_REPORT_FAILED,
} from './constant';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: true,
  status: '',
  allReports: [],
  total: 0,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REPORT_PROGRESS:
    case BLOCK_REPORT_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case GET_ALL_REPORT_FAILED:
    case BLOCK_REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case GET_ALL_REPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allReports: action.data && action.data.allReport,
        status: action.type,
        total: action.data && action.data.pageCount
      };
    }
    case BLOCK_REPORT_SUCCESS: {
      const allReports = [...state.allReports].filter(item => item._id !== (action.data && action.data.id));
      return {
        ...state,
        status: action.type,
        total: state.total - 1,
        allReports
      };
    }
    default:
      return state;
  }
};
export default reducer;
