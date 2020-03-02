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
import { ADS_ENDPOINT, BANNER_TYPE } from '../../api/constant';

export const addBannerAds = ({ title, photos, position, screen, link, time_start, time_end, id_type }) => ({
  types: [ADD_BANNER_ADS_PROGRESS, ADD_BANNER_ADS_SUCCESS, ADD_BANNER_ADS_FAILED],
  callAPI: () => ADS_ENDPOINT.ADD_BANNER_ADS({ title, photos, position, screen, link, time_start, time_end, id_type }),
  payload: { title, photos, position, screen, link, time_start, time_end, id_type }
});

export const updateBannerAds = ({ id, title, photos, position, screen, link, time_start, time_end, id_type }) => ({
  types: [UPDATE_BANNER_ADS_PROGRESS, UPDATE_BANNER_ADS_SUCCESS, UPDATE_BANNER_ADS_FAILED],
  callAPI: () =>
    ADS_ENDPOINT.UPDATE_BANNER_ADS({ id, title, photos, position, screen, link, time_start, time_end, id_type }),
  payload: { id, title, photos, position, screen, link, time_start, time_end, id_type }
});

export const deleteBannerAds = ({ id }) => ({
  types: [DELETE_BANNER_ADS_PROGRESS, DELETE_BANNER_ADS_SUCCESS, DELETE_BANNER_ADS_FAILED],
  callAPI: () => ADS_ENDPOINT.DELETE_BANNER_ADS({ id }),
  payload: { id }
});

export const setHotNew = ({ id }) => ({
  types: [SET_HOT_NEWS_PROGRESS, SET_HOT_NEWS_SUCCESS, SET_HOT_NEWS_FAILED],
  callAPI: () => ADS_ENDPOINT.SET_HOT_NEWS({ id }),
  payload: { id }
});

export const getAllBanner = ({ page, limit }) => ({
  types: [GET_ALL_BANNER_PROGRESS, GET_ALL_BANNER_SUCCESS, GET_ALL_BANNER_FAILED],
  callAPI: () => ADS_ENDPOINT.GET_ALL_BANNER({ page, limit }),
  payload: { page, limit }
});

export const getAllBannerType = () => ({
  types: [GET_ALL_BANNER_TYPE_PROGRESS, GET_ALL_BANNER_TYPE_SUCCESS, GET_ALL_BANNER_TYPE_FAILED],
  callAPI: () => BANNER_TYPE.ALL_BANNER_TYPE(),
  payload: {}
});

export const postBannerType = ({ name }) => ({
  types: [POST_BANNER_TYPE_PROGRESS, POST_BANNER_TYPE_SUCCESS, POST_BANNER_TYPE_FAILED],
  callAPI: () => BANNER_TYPE.POST_BANNER_TYPE({ name }),
  payload: { name }
});

export const putBannerType = ({ name, id_banner }) => ({
  types: [PUT_BANNER_TYPE_PROGRESS, PUT_BANNER_TYPE_SUCCESS, PUT_BANNER_TYPE_FAILED],
  callAPI: () => BANNER_TYPE.PUT_BANNER_TYPE({ name, id_banner }),
  payload: { name, id_banner }
});

export const deleteBannerType = ({ id_banner }) => ({
  types: [DELETE_BANNER_TYPE_PROGRESS, DELETE_BANNER_TYPE_SUCCESS, DELETE_BANNER_TYPE_FAILED],
  callAPI: () => BANNER_TYPE.DELETE_BANNER_TYPE({ id_banner }),
  payload: { id_banner }
});

export const getAllBannerTypeDelete = () => ({
  types: [GET_ALL_BANNER_TYPE_DELETE_PROGRESS, GET_ALL_BANNER_TYPE_DELETE_SUCCESS, GET_ALL_BANNER_TYPE_DELETE_FAILED],
  callAPI: () => BANNER_TYPE.ALL_BANNER_TYPE_DELETE(),
  payload: {}
});
