import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_PROGRESS,
  GET_LOCATION_FAILED,
  GET_ALL_LOCATION_SUCCESS,
  GET_ALL_LOCATION_PROGRESS,
  GET_ALL_LOCATION_FAILED,
  ADD_NEAR_SCHOOL_SUCCESS,
  ADD_NEAR_SCHOOL_PROGRESS,
  ADD_NEAR_SCHOOL_FAILED,
  FILTER_LOCATION_NEAR_SCHOOL_SUCCESS,
  FILTER_LOCATION_NEAR_SCHOOL_PROGRESS,
  FILTER_LOCATION_NEAR_SCHOOL_FAILED,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_PROGRESS,
  DELETE_LOCATION_FAILED,
  GET_ALL_LOCATION_TYPE_SUCCESS,
  GET_ALL_LOCATION_TYPE_PROGRESS,
  GET_ALL_LOCATION_TYPE_FAILED,
  POST_LOCATION_TYPE_SUCCESS,
  POST_LOCATION_TYPE_PROGRESS,
  POST_LOCATION_TYPE_FAILED,
  DELETE_LOCATION_TYPE_SUCCESS,
  DELETE_LOCATION_TYPE_PROGRESS,
  DELETE_LOCATION_TYPE_FAILED,
  ADD_TYPE_IN_LOCATION_SUCCESS,
  ADD_TYPE_IN_LOCATION_PROGRESS,
  ADD_TYPE_IN_LOCATION_FAILED,
  EDIT_LOCATION_TYPE_SUCCESS,
  EDIT_LOCATION_TYPE_PROGRESS,
  EDIT_LOCATION_TYPE_FAILED,
  USER_GET_ALL_LOCATION_TYPE_SUCCESS,
  USER_GET_ALL_LOCATION_TYPE_PROGRESS,
  USER_GET_ALL_LOCATION_TYPE_FAILED,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_PROGRESS,
  ADD_LOCATION_FAILED,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_PROGRESS,
  UPDATE_LOCATION_FAILED,
  ADD_ADS_LOCATION_SUCCESS,
  ADD_ADS_LOCATION_PROGRESS,
  ADD_ADS_LOCATION_FAILED
} from './constant';

const initialState = {
  isLoading: false,
  status: '',
  allLocation: [],
  total: 0,
  error: null,
  allTypes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_PROGRESS:
    case GET_ALL_LOCATION_PROGRESS:
    case ADD_NEAR_SCHOOL_PROGRESS:
    case FILTER_LOCATION_NEAR_SCHOOL_PROGRESS:
    case USER_GET_ALL_LOCATION_TYPE_PROGRESS:
    case DELETE_LOCATION_PROGRESS:
    case GET_ALL_LOCATION_TYPE_PROGRESS:
    case POST_LOCATION_TYPE_PROGRESS:
    case DELETE_LOCATION_TYPE_PROGRESS:
    case ADD_TYPE_IN_LOCATION_PROGRESS:
    case EDIT_LOCATION_TYPE_PROGRESS:
    case ADD_LOCATION_PROGRESS:
    case UPDATE_LOCATION_PROGRESS:
    case ADD_ADS_LOCATION_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_LOCATION_FAILED:
    case GET_ALL_LOCATION_FAILED:
    case ADD_NEAR_SCHOOL_FAILED:
    case FILTER_LOCATION_NEAR_SCHOOL_FAILED:
    case USER_GET_ALL_LOCATION_TYPE_FAILED:
    case DELETE_LOCATION_FAILED:
    case GET_ALL_LOCATION_TYPE_FAILED:
    case POST_LOCATION_TYPE_FAILED:
    case DELETE_LOCATION_TYPE_FAILED:
    case ADD_TYPE_IN_LOCATION_FAILED:
    case EDIT_LOCATION_TYPE_FAILED:
    case ADD_LOCATION_FAILED:
    case UPDATE_LOCATION_FAILED:
    case ADD_ADS_LOCATION_FAILED:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.error
      };
    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation: [...state.allLocation, action.data && action.data.result],
        total: state.total + 1
      };
    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation: [...state.allLocation, action.data],
        total: state.total + 1
      };
    case UPDATE_LOCATION_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const allLocation = state.allLocation.map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });

      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation,
        total: state.total + 1
      };
    case GET_ALL_LOCATION_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation: action.data.result,
        total: action.data && action.data.total
      };
    case ADD_NEAR_SCHOOL_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false
      };
    case GET_ALL_LOCATION_TYPE_SUCCESS:
    case USER_GET_ALL_LOCATION_TYPE_SUCCESS: {
      const allTypes = action.data.map(element => {
        return {
          ...element,
          label: element.name,
          value: element._id
        };
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTypes
      };
    }
    case FILTER_LOCATION_NEAR_SCHOOL_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation: action.data && action.data.result,
        total: action.data && action.data.total
      };
    case DELETE_LOCATION_SUCCESS: {
      const allLocation = [...state.allLocation].map(item => {
        if (item._id === (action.data && action.data.location_id)) return { ...item, delete: !item.delete };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation
      };
    }
    case POST_LOCATION_TYPE_SUCCESS: {
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTypes: [...state.allTypes, action.data]
      };
    }
    case DELETE_LOCATION_TYPE_SUCCESS: {
      const allTypes = [...state.allTypes].map(item => {
        if (item._id === (action.data && action.data.id)) {
          return { ...item, delete: !item.delete };
        }
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTypes
      };
    }
    case ADD_TYPE_IN_LOCATION_SUCCESS: {
      const allLocation = [...state.allLocation].map(item => {
        if (item._id === (action.data && action.data._id)) {
          return { ...item, id_type: action.data ? action.data.id_type : [] };
        }
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation
      };
    }
    case EDIT_LOCATION_TYPE_SUCCESS: {
      const allTypes = [...state.allTypes].map(item => {
        if (item._id === (action.data && action.data._id)) return { ...item, name: action.data && action.data.name };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTypes
      };
    }
    case ADD_ADS_LOCATION_SUCCESS: {
      const allLocation = state.allLocation.map(item => {
        if (item._id === (action.data && action.data._id)) return { ...item, ads: !item.ads };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allLocation
      };
    }
    default:
      return state;
  }
};
export default reducer;
