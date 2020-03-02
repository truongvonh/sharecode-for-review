import { COMMON_TYPES } from 'redux/common/constant';

const initialState = {
  visibleLoginModal: false,
  searchData: {
    location: [],
    location_review: [],
    user: [],
    school: []
  },
  allGroups: [],
  status: '',
  globalLoading: false,
  detailReviewData: {}
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case COMMON_TYPES.TOGGLE_LOGIN_MODAL: {
      return {
        ...state,
        visibleLoginModal: !state.visibleLoginModal,
        status: action.type
      };
    }
    case COMMON_TYPES.CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        visibleLoginModal: initialState.visibleLoginModal,
        status: action.type
      };
    }

    case COMMON_TYPES.SEARCH_MAIN: {
      return {
        ...state,
        searchData: action.payload,
        status: action.type
      };
    }

    case COMMON_TYPES.GET_ALL_GROUPS: {
      return {
        ...state,
        allGroups: action.payload
      };
    }
    case COMMON_TYPES.OPEN_LOADING: {
      return {
        ...state,
        globalLoading: true
      };
    }
    case COMMON_TYPES.CLOSE_LOADING: {
      return {
        ...state,
        globalLoading: false
      };
    }
    case COMMON_TYPES.GET_DETAILS_REVIEW_SCHOOL: {
      return {
        ...state,
        detailReviewData: action.detailData
      };
    }
    case COMMON_TYPES.GET_DETAILS_REVIEW_LOCATION: {
      return {
        ...state,
        detailReviewData: action.detailData
      };
    }
    default:
      return state;
  }
}
