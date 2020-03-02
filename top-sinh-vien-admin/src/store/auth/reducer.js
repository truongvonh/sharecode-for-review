import { 
  GET_ME_SUCCESS,
  GET_ME_PROGRESS,
  GET_ME_FAILED 
} from './constant';

const initialState = {
  isLoading: true,
  user: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ME_PROGRESS: 
      return {
        ...state,
        isLoading: true
      };
    case GET_ME_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.data
      };
    }
    case GET_ME_FAILED: 
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
export default reducer;
