import { OVERVIEW_SCHOOL_STATUS, PROFILE_USER_TYPE } from 'constants/common';

export const NAVIGATE_URL = {
  RANK_PAGE: '/rank',
  UNIVERSITY_PAGE: '/university',
  NEWS_PAGE: '/news',

  SCHOOL_DETAIL_PAGE: {
    URL: school_id => `/profile-university/over-view/${school_id}`,
    AS: '/profile-university'
  },

  DETAIL_SCHOOL_REVIEW: {
    URL: (id, type) => `/detail-school-review/${id}/${type}`,
    AS: '/detailSchoolReview'
  },

  DETAIL_LOCATION_REVIEW: {
    URL: (id, type) => `/detail-location-review/${id}/${type}`,
    AS: '/detailLocationReview'
  },

  REVIEW_DETAIL_PAGE: {
    URL: review_id => `/detail-review/${review_id}`,
    AS: ''
  },

  ALBUM_LOCATION_PAGE: {
    URL: location_id => `/album-location/${location_id}`,
    AS: '/album-location'
  },

  NEW_DETAIL_PAGE: {
    URL: (id, type) => `/news-detail/${id}/${type}`,
    AS: '/newsDetail'
  },

  LOCATION_DETAIL_PAGE: {
    URL: location_id => `/location-detail-page/${location_id}`,
    AS: '/LocationDetailPage'
  },

  LOCATION_PAGE: {
    URL: school_id => `/Place/${school_id}`,
    AS: '/Place'
  },

  LOCATION_MAP_PAGE: {
    URL: school_id => `/location-map/${school_id}`,
    AS: '/location-map'
  },

  LOCATION_MAP_DETAIL: {
    URL: location_id => `/location-map-detail/${location_id}`,
    AS: '/LocationMapDetail'
  },

  //GROUP
  GROUP_DETAIL_PAGE: {
    URL: group_type => `/group/${group_type}`,
    AS: '/GroupDetail'
  },
  USER_PROFILE_PAGE: {
    URL: (id, status = PROFILE_USER_TYPE.TIME_LINE) => `/profile-user/${status}/${id}`,
    AS: status => `/profile-user/${status}`
  },
  CAMPAIGN_TYPE_PAGE: {
    URL: type => `/newscompetition/${type}`,
    AS: '/newscompetition'
  },
  SCHOOl_PROFILE_PAGE: {
    URL: (id, status = OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL) => `/profile-university/${status}/${id}`,
    AS: (status = OVERVIEW_SCHOOL_STATUS.OVERVIEW_SCHOOL) => `/profile-university/${status}`
  },
  CAMPAIGN_KNOCK_OUT_PAGE: {
    URL: (type_id, round_id) => `/camapaign/knock-out/${type_id}/${round_id}`,
    AS: '/campaignKnockOut'
  },

  CAMPAIGN_KICK_START_PAGE: {
    URL: (type_id, round_id) => `/camapaign/kick-start/${type_id}/${round_id}`,
    AS: '/campaignKickStart'
  },

  CAMPAIGN_MATCH_PAGE: {
    URL: match_id => `/camapaign/match/${match_id}`,
    AS: '/competitionDetail'
  },

  SEARCH_RESULT: {
    URL: keyword => `/result?keyword=${keyword}`,
    AS: 'result'
  }
};
