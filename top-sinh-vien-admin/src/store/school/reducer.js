import {
  TOGGLE_MODAL,
  GET_ALL_SCHOOL_SUCCESS,
  GET_ALL_SCHOOL_PROGRESS,
  GET_ALL_SCHOOL_FAILED,
  REMOVE_SCHOOL_SUCCESS,
  REMOVE_SCHOOL_PROGRESS,
  REMOVE_SCHOOL_FAILED,
  ADD_TEAM_SUCCESS,
  ADD_TEAM_PROGRESS,
  ADD_TEAM_FAILED,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_PROGRESS,
  ADD_SCHOOL_FAILED,
  EDIT_SCHOOL_SUCCESS,
  EDIT_SCHOOL_PROGRESS,
  EDIT_SCHOOL_FAILED,
  ADD_ADS_SCHOOL_SUCCESS,
  ADD_ADS_SCHOOL_PROGRESS,
  ADD_ADS_SCHOOL_FAILED
} from './constant';

const initialState = {
  isOpen: false,
  isLoading: false,
  status: '',
  schools: [],
  error: null,
  total: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        status: action.type,
        isOpen: !state.isOpen
      };
    case GET_ALL_SCHOOL_PROGRESS:
    case ADD_TEAM_PROGRESS:
    case ADD_SCHOOL_PROGRESS:
    case REMOVE_SCHOOL_PROGRESS:
    case EDIT_SCHOOL_PROGRESS:
    case ADD_ADS_SCHOOL_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_ALL_SCHOOL_FAILED:
    case ADD_SCHOOL_FAILED:
    case ADD_TEAM_FAILED:
    case REMOVE_SCHOOL_FAILED:
    case EDIT_SCHOOL_FAILED:
    case ADD_ADS_SCHOOL_FAILED:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.error
      };
    case GET_ALL_SCHOOL_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools: action.data.result,
        total: action.data && action.data.total
      };
    case ADD_TEAM_SUCCESS: {
      const schools = [...state.schools].map(item => {
        if (item._id === (action.data && action.data.school)) return { ...item, check: true };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools
      };
    }
    case ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools: [action.data, ...state.schools],
        total: state.total + 1
      };
    case REMOVE_SCHOOL_SUCCESS: {
      const schools = [...state.schools].filter(school => school._id !== (action.data && action.data.school_id));
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools,
        total: state.total - 1
      };
    }
    case EDIT_SCHOOL_SUCCESS: {
      const schools = [...state.schools].map(school => {
        if (school._id === (action.data && action.data._id)) return { ...action.data };
        return school;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools
      };
    }
    case ADD_ADS_SCHOOL_SUCCESS: {
      const schools = state.schools.map(item => {
        if (item._id === (action.data && action.data._id)) return { ...item, ads: !item.ads };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        schools
      };
    }

    default:
      return state;
  }
};
export default reducer;
