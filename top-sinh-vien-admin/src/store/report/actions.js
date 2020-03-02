import {
  GET_ALL_REPORT_PROGRESS,
  GET_ALL_REPORT_SUCCESS,
  GET_ALL_REPORT_FAILED,
  BLOCK_REPORT_PROGRESS,
  BLOCK_REPORT_SUCCESS,
  BLOCK_REPORT_FAILED,
} from './constant';
import { REPORT_ENDPOINT } from '../../api/constant';

export const getAllReport = ({ page, limit, status = false }) => ({
  types: [
    GET_ALL_REPORT_PROGRESS,
    GET_ALL_REPORT_SUCCESS,
    GET_ALL_REPORT_FAILED
  ],
  callAPI: () => REPORT_ENDPOINT.GET_ALL_REPORT({ page, limit, status }),
  payload: { page, limit, status }
});

export const blockReport = ({ id }) => ({
  types: [
    BLOCK_REPORT_PROGRESS,
    BLOCK_REPORT_SUCCESS,
    BLOCK_REPORT_FAILED
  ],
  callAPI: () => REPORT_ENDPOINT.BLOCK_REPORT({ id }),
  payload: { id }
});
