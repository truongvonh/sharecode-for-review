import {
  SEND_NOTIFICATION_ALL_USER_PROGRESS,
  SEND_NOTIFICATION_ALL_USER_SUCCESS,
  SEND_NOTIFICATION_ALL_USER_FAILED,

  GET_ALL_NOTIFICATIONS_PROGRESS,
  GET_ALL_NOTIFICATIONS_SUCCESS,
  GET_ALL_NOTIFICATIONS_FAILED,

  READ_NOTIFICATION_PROGRESS,
  READ_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAILED,
} from './constant';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: true,
  status: '',
  allNotification: [],
  notRead: 0,
  total: 0,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION_ALL_USER_PROGRESS:
    case GET_ALL_NOTIFICATIONS_PROGRESS:
    case READ_NOTIFICATION_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };

    case SEND_NOTIFICATION_ALL_USER_FAILED:
    case GET_ALL_NOTIFICATIONS_FAILED:
    case READ_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        status: action.type,
        error: action.error
      };
    case SEND_NOTIFICATION_ALL_USER_SUCCESS: {
      toast.success('Gửi toàn bộ thông báo thành công!');
      return {
        ...state,
        isLoading: false,
        status: action.type
      };
    }

    case READ_NOTIFICATION_SUCCESS: {
      const allNotification = state.allNotification.map(item => {
        if (item._id === (action.data && action.data.id)) return { ...item, read: true };
        return item;
      });

      return {
        ...state,
        isLoading: false,
        status: action.type,
        allNotification,
        notRead: state.notRead - 1
      };
    }

    case GET_ALL_NOTIFICATIONS_SUCCESS: {

      const result = (action.data && action.data.allNotification);

      return {
        ...state,
        isLoading: false,
        status: action.type,
        allNotification: [...state.allNotification, ...result],
        notRead: (action.data && action.data.totalNotRead)
      };
    }
    default:
      return state;
  }
};
export default reducer;
