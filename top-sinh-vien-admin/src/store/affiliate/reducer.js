import {
  GET_ALL_AFFILIATE_PROGRESS,
  GET_ALL_AFFILIATE_SUCCESS,
  GET_ALL_AFFILIATE_FAILED,
  ADD_AFFILIATE_PROGRESS,
  ADD_AFFILIATE_SUCCESS,
  ADD_AFFILIATE_FAILED,
  DELETE_AFFILIATE_PROGRESS,
  DELETE_AFFILIATE_SUCCESS,
  DELETE_AFFILIATE_FAILED,
  UPDATE_AFFILIATE_PROGRESS,
  UPDATE_AFFILIATE_SUCCESS,
  UPDATE_AFFILIATE_FAILED,
  TOGGLE_DISPLAY_AFFILIATE_PROGRESS,
  TOGGLE_DISPLAY_AFFILIATE_SUCCESS,
  TOGGLE_DISPLAY_AFFILIATE_FAILED,
  ALL_AFFILIATE_PROGRESS,
  ALL_AFFILIATE_FAILED,
  ALL_AFFILIATE_SUCCESS,
  PRIORITY_AFFILIATE_PROGRESS,
  PRIORITY_AFFILIATE_FAILED,
  PRIORITY_AFFILIATE_SUCCESS,
  GET_PRIORITY_AFFILIATE_PROGRESS,
  GET_PRIORITY_AFFILIATE_FAILED,
  GET_PRIORITY_AFFILIATE_SUCCESS
} from './constant';

const initialState = {
  isLoading: true,
  status: '',
  allAffiliate: [],
  allAffiliates: [],
  affiliatePriority: [],
  total: 0,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AFFILIATE_PROGRESS:
    case ADD_AFFILIATE_PROGRESS:
    case DELETE_AFFILIATE_PROGRESS:
    case UPDATE_AFFILIATE_PROGRESS:
    case TOGGLE_DISPLAY_AFFILIATE_PROGRESS:
    case ALL_AFFILIATE_PROGRESS:
    case PRIORITY_AFFILIATE_PROGRESS:
    case GET_PRIORITY_AFFILIATE_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case GET_ALL_AFFILIATE_FAILED:
    case ADD_AFFILIATE_FAILED:
    case DELETE_AFFILIATE_FAILED:
    case UPDATE_AFFILIATE_FAILED:
    case TOGGLE_DISPLAY_AFFILIATE_FAILED:
    case ALL_AFFILIATE_FAILED:
    case PRIORITY_AFFILIATE_FAILED:
    case GET_PRIORITY_AFFILIATE_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case GET_ALL_AFFILIATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allAffiliate: action.data && action.data.result,
        status: action.type,
        total: action.data && action.data.total
      };
    }
    case ADD_AFFILIATE_SUCCESS: {
      return {
        ...state,
        status: action.type,
        allAffiliate: [...state.allAffiliate, action.data],
        total: state.total + 1
      };
    }
    case DELETE_AFFILIATE_SUCCESS: {
      const allAffiliate = [...state.allAffiliate].map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });
      return {
        ...state,
        status: action.type,
        allAffiliate,
        total: state.total + 1
      };
    }
    case UPDATE_AFFILIATE_SUCCESS: {
      const allAffiliate = state.allAffiliate.map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });
      return {
        ...state,
        status: action.type,
        allAffiliate
      };
    }
    case TOGGLE_DISPLAY_AFFILIATE_SUCCESS: {
      const allAffiliate = state.allAffiliate.map(item => {
        if (item._id === (action.data && action.data.id)) return { ...item, status: !item.status };
        return item;
      });
      return {
        ...state,
        status: action.type,
        allAffiliate
      };
    }
    case ALL_AFFILIATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allAffiliates: action.data,
        status: action.type
      };
    }
    case PRIORITY_AFFILIATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        affiliatePriority: action.data,
        status: action.type
      };
    }
    case GET_PRIORITY_AFFILIATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        affiliatePriority: action.data,
        status: action.type
      };
    }
    default:
      return state;
  }
};
export default reducer;
