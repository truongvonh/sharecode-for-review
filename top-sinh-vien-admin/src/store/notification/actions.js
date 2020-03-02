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
import { NOTIFICATION_ENDPOINT } from '../../api/constant';

export const sendAllNotification = ({ title, content }) => ({
  types: [
    SEND_NOTIFICATION_ALL_USER_PROGRESS,
    SEND_NOTIFICATION_ALL_USER_SUCCESS,
    SEND_NOTIFICATION_ALL_USER_FAILED
  ],
  callAPI: () => NOTIFICATION_ENDPOINT.SEND_NOTIFICATION_ALL_USER({ title, content }),
  payload: { title, content }
});

export const getAllNotification = ({ page, limit }) => ({
  types: [
    GET_ALL_NOTIFICATIONS_PROGRESS,
    GET_ALL_NOTIFICATIONS_SUCCESS,
    GET_ALL_NOTIFICATIONS_FAILED
  ],
  callAPI: () => NOTIFICATION_ENDPOINT.GET_ALL_NOTIFICATIONS({ page, limit }),
  payload: { page, limit }
});

export const readNotification = ({ id }) => ({
  types: [
    READ_NOTIFICATION_PROGRESS,
    READ_NOTIFICATION_SUCCESS,
    READ_NOTIFICATION_FAILED
  ],
  callAPI: () => NOTIFICATION_ENDPOINT.READ_NOTIFICATION({ id }),
  payload: { id }
});
