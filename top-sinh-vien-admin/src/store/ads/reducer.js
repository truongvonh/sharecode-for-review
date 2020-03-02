import {
  ADD_BANNER_ADS_PROGRESS,
  ADD_BANNER_ADS_SUCCESS,
  ADD_BANNER_ADS_FAILED,
  UPDATE_BANNER_ADS_PROGRESS,
  UPDATE_BANNER_ADS_SUCCESS,
  UPDATE_BANNER_ADS_FAILED,
  DELETE_BANNER_ADS_PROGRESS,
  DELETE_BANNER_ADS_SUCCESS,
  DELETE_BANNER_ADS_FAILED,
  SET_HOT_NEWS_PROGRESS,
  SET_HOT_NEWS_SUCCESS,
  SET_HOT_NEWS_FAILED,
  GET_ALL_BANNER_PROGRESS,
  GET_ALL_BANNER_SUCCESS,
  GET_ALL_BANNER_FAILED,
  GET_ALL_BANNER_TYPE_PROGRESS,
  GET_ALL_BANNER_TYPE_SUCCESS,
  GET_ALL_BANNER_TYPE_FAILED,
  POST_BANNER_TYPE_PROGRESS,
  POST_BANNER_TYPE_SUCCESS,
  POST_BANNER_TYPE_FAILED,
  PUT_BANNER_TYPE_PROGRESS,
  PUT_BANNER_TYPE_SUCCESS,
  PUT_BANNER_TYPE_FAILED,
  DELETE_BANNER_TYPE_PROGRESS,
  DELETE_BANNER_TYPE_SUCCESS,
  DELETE_BANNER_TYPE_FAILED,
  GET_ALL_BANNER_TYPE_DELETE_PROGRESS,
  GET_ALL_BANNER_TYPE_DELETE_SUCCESS,
  GET_ALL_BANNER_TYPE_DELETE_FAILED
} from './constant';

const initialState = {
  isLoading: true,
  status: '',
  allAds: [],
  total: 0,
  error: null,
  allAdsType: [],
  allAdsTypeDelete: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BANNER_ADS_PROGRESS:
    case UPDATE_BANNER_ADS_PROGRESS:
    case DELETE_BANNER_ADS_PROGRESS:
    case GET_ALL_BANNER_PROGRESS:
    case SET_HOT_NEWS_PROGRESS:
    case GET_ALL_BANNER_TYPE_PROGRESS:
    case POST_BANNER_TYPE_PROGRESS:
    case PUT_BANNER_TYPE_PROGRESS:
    case DELETE_BANNER_TYPE_PROGRESS:
    case GET_ALL_BANNER_TYPE_DELETE_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case ADD_BANNER_ADS_FAILED:
    case UPDATE_BANNER_ADS_FAILED:
    case DELETE_BANNER_ADS_FAILED:
    case GET_ALL_BANNER_FAILED:
    case SET_HOT_NEWS_FAILED:
    case GET_ALL_BANNER_TYPE_FAILED:
    case POST_BANNER_TYPE_FAILED:
    case PUT_BANNER_TYPE_FAILED:
    case DELETE_BANNER_TYPE_FAILED:
    case GET_ALL_BANNER_TYPE_DELETE_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case GET_ALL_BANNER_SUCCESS: {
      const newData = action.data && action.data.data;
      return {
        ...state,
        isLoading: false,
        allAds: newData,
        status: action.type,
        total: action.data && action.data.pageCount
      };
    }
    case ADD_BANNER_ADS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allAds: [action.data, ...state.allAds],
        status: action.type,
        total: state.total + 1
      };
    }
    case DELETE_BANNER_ADS_SUCCESS: {
      const allAds = [...state.allAds].map(item => {
        if (item._id === (action.data && action.data._id)) {
          return { ...item, delete: !item.delete };
        }
        return item;
      });
      // const allAds = state.allAds.filter(item => item._id !== action.data.id);
      return {
        ...state,
        isLoading: false,
        allAds,
        status: action.type,
        total: state.total - 1
      };
    }
    case UPDATE_BANNER_ADS_SUCCESS: {
      const allAds = state.allAds.map(item => {
        if (item._id === action.data._id) return action.data;
        return item;
      });
      return {
        ...state,
        isLoading: false,
        allAds,
        status: action.type
      };
    }

    case SET_HOT_NEWS_SUCCESS: {
      const allAds = state.allAds.map(item => {
        if (item._id === action.data.id) return { ...item, hotNew: !item.hotNew };
        return item;
      });
      return {
        ...state,
        isLoading: false,
        allAds,
        status: action.type
      };
    }

    case GET_ALL_BANNER_TYPE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allAdsType: action.data,
        status: action.type
      };
    }

    case GET_ALL_BANNER_TYPE_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdsTypeDelete: action.data,
        status: action.type
      };

    case POST_BANNER_TYPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allAdsType: [...state.allAdsType, action.data],
        status: action.type
      };

    case PUT_BANNER_TYPE_SUCCESS:
      const data = [...state.allAdsType].map(item => {
        if (item._id === (action.data && action.data._id)) {
          return { ...item, name: action.data && action.data.name };
        }
        return item;
      });
      return {
        ...state,
        isLoading: false,
        allAdsType: data,
        status: action.type
      };
    case DELETE_BANNER_TYPE_SUCCESS:
      const result = [...state.allAdsType].map(item => {
        if (item._id === (action.data && action.data._id)) {
          return { ...item, delete: !item.delete };
        }
        return item;
      });
      return {
        ...state,
        isLoading: false,
        allAdsType: result,
        status: action.type
      };

    default:
      return state;
  }
};
export default reducer;
