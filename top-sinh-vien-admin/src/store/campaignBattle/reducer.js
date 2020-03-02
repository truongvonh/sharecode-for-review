import {
  GET_TEAM_IN_ROUND_SUCCESS,
  GET_TEAM_IN_ROUND_PROGRESS,
  GET_TEAM_IN_ROUND_FAILED,
  ADD_MATCH_ANY_ROUND_SUCCESS,
  ADD_MATCH_ANY_ROUND_PROGRESS,
  ADD_MATCH_ANY_ROUND_FAILED,
  UPLOAD_IMAGE_TO_MATCH_PROGRESS,
  UPLOAD_IMAGE_TO_MATCH_SUCCESS,
  UPLOAD_IMAGE_TO_MATCH_FAILED
} from './constant';

const initialState = {
  isOpen: false,
  status: '',
  teamInBattle: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_IN_ROUND_PROGRESS:
    case ADD_MATCH_ANY_ROUND_PROGRESS:
    case UPLOAD_IMAGE_TO_MATCH_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_TEAM_IN_ROUND_FAILED:
    case ADD_MATCH_ANY_ROUND_FAILED:
    case UPLOAD_IMAGE_TO_MATCH_FAILED:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.error
      };
    case GET_TEAM_IN_ROUND_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        teamInBattle: action.data
      };
    case ADD_MATCH_ANY_ROUND_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        teamInBattle: [...state.teamInBattle, action.data]
      };
    case UPLOAD_IMAGE_TO_MATCH_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false
      };
    default:
      return state;
  }
};
export default reducer;
