import {
  CREATE_ROLE_PROGRESS,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILED,
  GET_ALL_ROLE_PROGRESS,
  GET_ALL_ROLE_SUCCESS,
  GET_ALL_ROLE_FAILED,
  EDIT_ROLE_PROGRESS,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAILED,
  DELETE_ROLE_PROGRESS,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  ADD_USER_PROGRESS,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  GET_ALL_USER_PROGRESS,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILED,
  DELETE_USER_PROGRESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  UPDATE_USER_PROGRESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_ROLE_PROGRESS,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAILED,
  SEARCH_USER_PROGRESS,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILED
} from './constant';
import UserModel from '../../model/User';

const initialState = {
  isLoading: true,
  allRoles: [],
  allUsers: [],
  status: '',
  total: 0,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROLE_PROGRESS:
    case GET_ALL_ROLE_PROGRESS:
    case EDIT_ROLE_PROGRESS:
    case DELETE_ROLE_PROGRESS:
    case ADD_USER_PROGRESS:
    case GET_ALL_USER_PROGRESS:
    case DELETE_USER_PROGRESS:
    case UPDATE_USER_PROGRESS:
    case UPDATE_USER_ROLE_PROGRESS:
    case SEARCH_USER_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case DELETE_ROLE_FAILED:
    case GET_ALL_ROLE_FAILED:
    case EDIT_ROLE_FAILED:
    case CREATE_ROLE_FAILED:
    case GET_ALL_USER_FAILED:
    case ADD_USER_FAILED:
    case DELETE_USER_FAILED:
    case UPDATE_USER_FAILED:
    case UPDATE_USER_ROLE_FAILED:
    case SEARCH_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case GET_ALL_USER_SUCCESS:
    case SEARCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allUsers: action.data.allUser,
        total: action.data.total
      };
    }
    case CREATE_ROLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allRoles: [...state.allRoles, action.data]
      };
    }
    case DELETE_ROLE_SUCCESS: {
      const allRoles = [...state.allRoles].filter(item => item._id !== (action.data && action.data.id));
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allRoles
      };
    }
    case GET_ALL_ROLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allRoles: action.data
      };
    }
    case EDIT_ROLE_SUCCESS: {
      console.log('EDIT_ROLE_SUCCESS', state);
      const allRoles = [...state.allRoles].map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allRoles
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allUsers: [action.data, ...state.allUsers]
      };
    }
    case DELETE_USER_SUCCESS: {
      const allUsers = [...state.allUsers].map(element => {
        if (element._id === action.payload.id) {
          if (element.status.color === 'success') {
            return {
              ...element,
              status: {
                label: 'Đang bị khoá',
                color: 'danger'
              }
            };
          } else
            return {
              ...element,
              status: {
                label: 'Đang hoạt động',
                color: 'success'
              }
            };
        } else return element;
      });
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allUsers,
        total: state.total
      };
    }
    case UPDATE_USER_SUCCESS: {
      const allUsers = [...state.allUsers].map(item => {
        if (item._id === (action.data && action.data._id)) return action.data;
        return item;
      });
      return {
        ...state,
        isLoading: false,
        status: action.type,
        allUsers
      };
    }
    case UPDATE_USER_ROLE_SUCCESS: {
      const newListUsers = [...state.allUsers];
      const updatedUserIndex = newListUsers.findIndex(user => user._id === action.data._id);

      newListUsers[updatedUserIndex] = new UserModel(action.data);

      return {
        ...state,
        isLoading: false,
        status: action.type,
        allUsers: newListUsers
      };
    }

    default:
      return state;
  }
};
export default reducer;
