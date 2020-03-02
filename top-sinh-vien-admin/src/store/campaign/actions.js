import {
  ADD_TEAM_SUCCESS,
  ADD_TEAM_PROGRESS,
  ADD_TEAM_FAILED,
  ADD_TYPE_SUCCESS,
  ADD_TYPE_PROGRESS,
  ADD_TYPE_FAILED,
  GET_TEAM_VOTE_ROUND_32_SUCCESS,
  GET_TEAM_VOTE_ROUND_32_PROGRESS,
  GET_TEAM_VOTE_ROUND_32_FAILED,
  GET_TYPE_SUCCESS,
  GET_TYPE_PROGRESS,
  GET_TYPE_FAILED,
  ADD_TEAM_WINNER_ROUND_32_SUCCESS,
  ADD_TEAM_WINNER_ROUND_32_PROGRESS,
  ADD_TEAM_WINNER_ROUND_32_FAILED,
  TEAM_NOT_JOIN_SUCCESS,
  TEAM_NOT_JOIN_PROGRESS,
  TEAM_NOT_JOIN_FAILED,
  ROUND_OF_TYPE_SUCCESS,
  ROUND_OF_TYPE_PROGRESS,
  ROUND_OF_TYPE_FAILED,
  UPDATE_ROUND_TIME_SUCCESS,
  UPDATE_ROUND_TIME_PROGRESS,
  UPDATE_ROUND_TIME_FAILED,
  UPDATE_STATUS_ROUND_SUCCESS,
  UPDATE_STATUS_ROUND_PROGRESS,
  UPDATE_STATUS_ROUND_FAILED,
  ADD_ROUND_SUCCESS,
  ADD_ROUND_PROGRESS,
  ADD_ROUND_FAILED,
  ADD_AVATAR_TEAM_SUCCESS,
  ADD_AVATAR_TEAM_PROGRESS,
  ADD_AVATAR_TEAM_FAILED,
  ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS,
  ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS,
  ADD_BANNER_TO_MATCH_OR_ROUND_FAILED,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_FAILED,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_PROGRESS,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_FAILED
} from './constant';
import { CAMPAIGN_EVENTS_ENDPOINT } from '../../api/constant';
import { updateStatus } from './../common/actions';
import { toast } from 'react-toastify';

export const addTeam = ({ school_id = null, filter }) => {
  return async dispatch => {
    dispatch(updateStatus(ADD_TEAM_PROGRESS));
    try {
      const payload = await CAMPAIGN_EVENTS_ENDPOINT.ADD_TEAM({ school_id, filter });
      dispatch(updateStatus(ADD_TEAM_SUCCESS, payload));
      toast.success('Add all school to team success');
    } catch (error) {
      dispatch(updateStatus(ADD_TEAM_FAILED, { error }));
      toast.error(error || 'Oops. Something errors!');
    }
  };
};

export const getType = () => {
  return async dispatch => {
    dispatch(updateStatus(GET_TYPE_PROGRESS));
    try {
      const payload = await CAMPAIGN_EVENTS_ENDPOINT.GET_TYPE({});
      dispatch(updateStatus(GET_TYPE_SUCCESS, payload));
    } catch (error) {
      dispatch(updateStatus(GET_TYPE_FAILED, { error }));
      toast.error(error || 'Oops. Something errors!');
    }
  };
};

export const getTeamVoteRound32 = ({ type_id, text_search = null }) => {
  return async dispatch => {
    dispatch(updateStatus(GET_TEAM_VOTE_ROUND_32_PROGRESS));
    try {
      const payload = await CAMPAIGN_EVENTS_ENDPOINT.GET_TEAM_VOTE_ROUND_32({ type_id, text_search });
      dispatch(updateStatus(GET_TEAM_VOTE_ROUND_32_SUCCESS, payload));
    } catch (error) {
      dispatch(updateStatus(GET_TEAM_VOTE_ROUND_32_FAILED, { error }));
      toast.error(error || 'Oops. Something errors!');
    }
  };
};

export const addTeamWinnerRound32 = ({ type_id, team, check = true }) => {
  return {
    types: [ADD_TEAM_WINNER_ROUND_32_PROGRESS, ADD_TEAM_WINNER_ROUND_32_SUCCESS, ADD_TEAM_WINNER_ROUND_32_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ADD_TEAM_WINNER_ROUND_32({ type_id, team, check }),
    payload: { type_id, team, check }
  };
};

export const getTeamNotJoin = ({ round_id }) => {
  return {
    types: [TEAM_NOT_JOIN_PROGRESS, TEAM_NOT_JOIN_SUCCESS, TEAM_NOT_JOIN_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.TEAM_NOT_JOIN({ round_id }),
    payload: { round_id }
  };
};

export const getRoundOfType = ({ type_id }) => {
  return {
    types: [ROUND_OF_TYPE_PROGRESS, ROUND_OF_TYPE_SUCCESS, ROUND_OF_TYPE_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ROUND_OF_TYPE({ type_id }),
    payload: { type_id }
  };
};

export const addType = ({ type, name, startTime }) => {
  return {
    types: [ADD_TYPE_PROGRESS, ADD_TYPE_SUCCESS, ADD_TYPE_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ADD_TYPE({ type, name, startTime }),
    payload: { type, name, startTime }
  };
};

export const updateRound = ({ round_id, startTime, endTime }) => {
  return {
    types: [UPDATE_ROUND_TIME_PROGRESS, UPDATE_ROUND_TIME_SUCCESS, UPDATE_ROUND_TIME_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.UPDATE_ROUND_TIME({ round_id, startTime, endTime }),
    payload: { round_id, startTime, endTime }
  };
};

export const updateStatusRound = ({ status, round_id }) => {
  return {
    types: [UPDATE_STATUS_ROUND_PROGRESS, UPDATE_STATUS_ROUND_SUCCESS, UPDATE_STATUS_ROUND_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.UPDATE_STATUS_ROUND({ status, round_id }),
    payload: { status, round_id }
  };
};

export const addRound = ({ type_id }) => {
  return {
    types: [ADD_ROUND_PROGRESS, ADD_ROUND_SUCCESS, ADD_ROUND_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ADD_ROUND({ type_id }),
    payload: { type_id }
  };
};

export const addAvatarTeam = ({ team, type_id, avatar }) => {
  return {
    types: [ADD_AVATAR_TEAM_PROGRESS, ADD_AVATAR_TEAM_SUCCESS, ADD_AVATAR_TEAM_FAILED],
    callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.ADD_AVATAR_TEAM({ team, type_id, avatar }),
    payload: { team, type_id, avatar }
  };
};

export const addBannerToMatchOrRound = ({ type_id, banners, type_apply, items_apply, typeScreen, bannersWeb }) => {
  return {
    types: [
      ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS,
      ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS,
      ADD_BANNER_TO_MATCH_OR_ROUND_FAILED
    ],
    callAPI: () =>
      CAMPAIGN_EVENTS_ENDPOINT.ADD_BANNER_TO_MATCH_OR_ROUND({
        type_id,
        banners,
        type_apply,
        items_apply,
        typeScreen,
        bannersWeb
      }),
    payload: { type_id, banners, type_apply, items_apply, typeScreen, bannersWeb }
  };
};

export const editBannersOfMatchOrRound = ({ items_id, banners, typeScreen, bannersWeb }) => ({
  types: [
    EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS,
    EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS,
    EDIT_BANNERS_OF_MATCH_OR_ROUND_FAILED
  ],
  callAPI: () => CAMPAIGN_EVENTS_ENDPOINT.EDIT_BANNERS_OF_MATCH_OR_ROUND({ items_id, banners, typeScreen, bannersWeb }),
  payload: { items_id, banners, typeScreen, bannersWeb }
});

export const addAvatarRuleRewardForCampaignType = ({
  type_id,
  avatar,
  rule,
  reward,
  name,
  cover,
  avatarWeb,
  ruleWeb,
  rewardWeb,
  coverWeb
}) => ({
  types: [
    ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_PROGRESS,
    ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS,
    ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_FAILED
  ],
  callAPI: () =>
    CAMPAIGN_EVENTS_ENDPOINT.ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE({
      type_id,
      avatar,
      rule,
      reward,
      name,
      cover,
      avatarWeb,
      ruleWeb,
      rewardWeb,
      coverWeb
    }),
  payload: { type_id, avatar, rule, reward, name, cover, avatarWeb, ruleWeb, rewardWeb, coverWeb }
});
