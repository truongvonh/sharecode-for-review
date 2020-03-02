import {
  GET_TEAM_IN_ROUND_SUCCESS,
  GET_TEAM_IN_ROUND_PROGRESS,
  GET_TEAM_IN_ROUND_FAILED,
  ADD_MATCH_ANY_ROUND_SUCCESS,
  ADD_MATCH_ANY_ROUND_PROGRESS,
  ADD_MATCH_ANY_ROUND_FAILED,
  UPLOAD_IMAGE_TO_MATCH_SUCCESS,
  UPLOAD_IMAGE_TO_MATCH_PROGRESS,
  UPLOAD_IMAGE_TO_MATCH_FAILED
} from './constant';
import { CAMPAIGN_EVENTS_ENDPOINT } from '../../api/constant';

export const getTeamInRound = ({ round_id }) => {
  return {
    types: [GET_TEAM_IN_ROUND_PROGRESS, GET_TEAM_IN_ROUND_SUCCESS, GET_TEAM_IN_ROUND_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.TEAM_IN_ROUND({ round_id }),
    payload: { round_id }
  };
};

export const addTeamToAnyRound = ({ round_id, team_1, team_2 }) => {
  return {
    types: [ADD_MATCH_ANY_ROUND_PROGRESS, ADD_MATCH_ANY_ROUND_SUCCESS, ADD_MATCH_ANY_ROUND_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ADD_MATCH_ANY_ROUND({ round_id, team_1, team_2 }),
    payload: { round_id, team_1, team_2 }
  };
};

export const uploadImageToMatch = ({ match_id, photos }) => {
  return {
    types: [UPLOAD_IMAGE_TO_MATCH_PROGRESS, UPLOAD_IMAGE_TO_MATCH_SUCCESS, UPLOAD_IMAGE_TO_MATCH_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.UPLOAD_IMAGE_TO_MATCH({ match_id, photos }),
    payload: { match_id, photos }
  };
};
