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

const initialState = {
  isLoading: true,
  status: '',
  allBadge: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BADGE_PROGRESS:
    case EDIT_BADGE_PROGRESS:
    case DELETE_BADGE_PROGRESS:
      return {
        ...state,
        status: action.type,
        allStatical: action.data,
        isLoading: true
      };
    case GET_ALL_BADGE_FAILED:
    case EDIT_BADGE_FAILED:
    case DELETE_BADGE_FAILED:
      return {
        ...state,
        status: action.type,
        error: action.error,
        isLoading: false
      };

    case GET_ALL_BADGE_SUCCESS: {
      return {
        ...state,
        status: action.type,
        allBadge: action.data,
        type: action.type,

      };
    }
    case DELETE_BADGE_SUCCESS: {
      const allBadge = state.allBadge.filter(item => item !== (action.data && action.data.id));
      return {
        ...state,
        allBadge,
        status: action.type,
        type: action.type,
      };
    }
    case EDIT_BADGE_SUCCESS: {
      const allBadge = state.allBadge.map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });
      return {
        ...state,
        allBadge,
        status: action.type,
        type: action.type,
      };
    }
    default:
      return state;
  }
};
export default reducer;
