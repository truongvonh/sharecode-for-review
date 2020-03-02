import {
  GET_ALL_STATICAL_PROGRESS,
  GET_ALL_STATICAL_SUCCESS,
  GET_ALL_STATICAL_FAILED,
} from './constant';

const initialState = {
  isLoading: true,
  status: '',
  allStatical: {},
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATICAL_PROGRESS:
      return {
        ...state,
        status: action.type,
        allStatical: action.data,
        isLoading: true
      };
    default:
      return state;
  }
};
export default reducer;
