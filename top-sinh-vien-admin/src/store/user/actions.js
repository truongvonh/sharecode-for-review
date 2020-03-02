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
  SEARCH_USER_FAILED,
} from './constant';
import { USER_ENDPOINT } from '../../api/constant';

export const createRole = ({ name_role, permissions }) => ({
  types: [
    CREATE_ROLE_PROGRESS,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_FAILED
  ],
  callAPI: () => USER_ENDPOINT.CREATE_ROLE({ name_role, permissions }),
  payload: { name_role, permissions }
});

export const getAllRole = ({ }) => ({
  types: [
    GET_ALL_ROLE_PROGRESS,
    GET_ALL_ROLE_SUCCESS,
    GET_ALL_ROLE_FAILED
  ],
  callAPI: () => USER_ENDPOINT.GET_ALL_ROLE({  }),
  payload: { }
});

export const updateRole = ({ id, name_role, permissions }) => ({
  types: [
    EDIT_ROLE_PROGRESS,
    EDIT_ROLE_SUCCESS,
    EDIT_ROLE_FAILED
  ],
  callAPI: () => USER_ENDPOINT.EDIT_ROLE({ id, name_role, permissions }),
  payload: { id, name_role, permissions }
});

export const deleteRole = ({ id }) => ({
  types: [
    DELETE_ROLE_PROGRESS,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_FAILED
  ],
  callAPI: () => USER_ENDPOINT.DELETE_ROLE({ id }),
  payload: { id }
});

export const addUser = ({ first_name, last_name, username, password }) => ({
  types: [
    ADD_USER_PROGRESS,
    ADD_USER_SUCCESS,
    ADD_USER_FAILED
  ],
  callAPI: () => USER_ENDPOINT.ADD_USER({ first_name, last_name, username, password }),
  payload: { first_name, last_name, username, password }
});

export const getAllUser = ({ page = 1, limit = 10 }) => ({
  types: [
    GET_ALL_USER_PROGRESS,
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAILED
  ],
  callAPI: () => USER_ENDPOINT.GET_ALL_USER({ page, limit }),
  payload: { page, limit }
});

export const deleteUser = ({ id }) => ({
  types: [
    DELETE_USER_PROGRESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED
  ],
  callAPI: () => USER_ENDPOINT.DELETE_USER({ id }),
  payload: { id }
});

export const updateUser = ({ id, first_name, last_name, username, password }) => ({
  types: [
    UPDATE_USER_PROGRESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
  ],
  callAPI: () => USER_ENDPOINT.UPDATE_USER({ id, first_name, last_name, username, password }),
  payload: { id, first_name, last_name, username, password }
});

export const updateUserRole = ({ id_user, id_role }) => ({
  types: [
    UPDATE_USER_ROLE_PROGRESS,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAILED
  ],
  callAPI: () => USER_ENDPOINT.UPDATE_USER_ROLE({ id_user, id_role }),
  payload: { id_user, id_role }
});

export const searchUser = ({ key_search, page, limit, status, id_school }) => ({
  types: [
    SEARCH_USER_PROGRESS,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAILED
  ],
  callAPI: () => USER_ENDPOINT.SEARCH_USER({ key_search, page, limit, status, id_school }),
  payload: { key_search, page, limit, status, id_school }
});
