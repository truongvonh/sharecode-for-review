import RequestUtils from './index';
import UserModel from 'model/User';
import SchoolReview from 'model/SchoolReview';
import { ReportModel } from '../model/Report';
import { NotificationModel } from '../model/Notification';
import { BadgeModel } from 'model/Badge';
import { BADGE_TYPE } from 'constant';
import { ALL_COMMENT_FAILED } from '../store/schoolReview/constant';

const BASE_APIV1 = endpoint => '/apiV1' + endpoint;
const DEFAULT_QUERY = { page: 1, limit: 10 };

export const COMMON_ENDPOINT = {
  async UPLOAD_PHOTOS(photos, type) {
    return await new RequestUtils({}).upload(photos, type);
  }
};

export const LOCATION_ENDPOINT = {
  async GET_LOCATION({ place_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/place-id') }).post({ place_id });
  },

  async GET_ALL_LOCATION({ page = 1, limit = 10, key = '', id_type, id_school }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/all-location') }).post({
      page,
      limit,
      key,
      id_type,
      id_school
    });
  },

  async ADD_NEAR_SCHOOL({ id_school, id_location, flag }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/school/location-near-by-school') }).post({
      id_school,
      id_location,
      flag
    });
  },

  async FILTER_LOCATION_NEAR_SCHOOL({ school_id, key, limit = 300, page = 1 }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/location-near-by-school/${school_id}`) }).get({
      query: {
        page,
        limit,
        key
      }
    });
  },

  async DELETE_LOCATION({ location_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/${location_id}`) }).delete();
  },

  async GET_ALL_LOCATION_TYPE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/all-location-type') }).get({});
  },
  async USER_GET_ALL_LOCATION_TYPE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/location/all-location-type') }).get({});
  },

  async POST_LOCATION_TYPE({ name }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/post-location-type') }).post({ name });
  },

  async DELETE_LOCATION_TYPE({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/location-type/${id}`) }).delete();
  },

  async EDIT_LOCATION_TYPE({ id, name }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/location-type/${id}`) }).put({
      name
    });
  },

  async ADD_TYPE_IN_LOCATION({ id_location, id_type_location }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/add-type-in-location') }).post({
      id_location,
      id_type_location
    });
  },

  async ADD_LOCATION({ name, address, description, coordinate, website, avatar, photos }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/post-location') }).post({
      name,
      address,
      description,
      coordinate,
      website,
      avatar,
      photos
    });
  },
  async ADD_ADS_LOCATION({ id_location }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/add-ads-location/${id_location}`) }).put({});
  },

  async UPDATE_LOCATION({
    id,
    name,
    address,
    description,
    coordinate,
    website,
    avatar,
    photos,
    delete_photos,
    delete_avatar
  }) {
    const data = { name, address, coordinate, avatar, photos, description, website };

    let payLoad = data;

    if (delete_photos.length)
      payLoad = {
        ...payLoad,
        delete_photos
      };

    if (delete_avatar.length)
      payLoad = {
        ...payLoad,
        delete_avatar
      };

    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/${id}`) }).put(payLoad);
  }
};

export const SCHOOL_ENDPOINT = {
  async GET_ALL_SCHOOL({ page = 1, limit = 500, key = '' }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/school/get-all-school') }).get({
      query: {
        page,
        limit,
        key
      }
    });
  },

  async ADD_SCHOOL(payload) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/school/post-school') }).post(payload);
  },

  async REMOVE_SCHOOL({ school_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/${school_id}`) }).delete();
  },

  async EDIT_SCHOOL({ school_id, payload }) {
    const {
      name,
      address,
      avatar,
      intro,
      education_programer,
      school_code,
      photos,
      delete_photos,
      club,
      cover
    } = payload;
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/${school_id}`) }).put({
      name,
      address,
      avatar,
      intro,
      education_programer,
      school_code,
      photos,
      delete_photos,
      club,
      cover
    });
  },
  async ADD_ADS_SCHOOL({ id_school }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/add-ads-school/${id_school}`) }).put({});
  }
};

export const USER_ENDPOINT = {
  async LOGIN({ username, password }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/login') }).post({ username, password });
  },

  async LOGOUT() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/logout') }).get({});
  },

  async ME() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/me') }).get({});
  },

  async CREATE_ROLE({ name_role, permissions }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/role/create-role') }).post({
      name_role,
      permissions
    });
  },

  async GET_ALL_ROLE({}) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/role/get-all-role') }).get({});
  },

  async EDIT_ROLE({ id, name_role, permissions }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/role/${id}`) }).put({
      name_role,
      permissions
    });
  },

  async DELETE_ROLE({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/role/${id}`) }).delete({});
  },

  async ADD_USER({ first_name, last_name, username, password }) {
    const result = await new RequestUtils({ endpoint: BASE_APIV1('/admin/user/add-user') }).post({
      first_name,
      last_name,
      username,
      password
    });
    return new UserModel(result);
  },

  async GET_ALL_USER({ page = 1, limit = 10 }) {
    const { allUser, total } = await new RequestUtils({ endpoint: BASE_APIV1('/admin/user/all-user') }).get({
      query: {
        page,
        limit
      }
    });

    return {
      total,
      allUser: allUser.map(item => new UserModel(item))
    };
  },

  async DELETE_USER({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/user/delete-user/${id}`) }).delete({});
  },

  async UPDATE_USER({ id, first_name, last_name }) {
    const result = await new RequestUtils({ endpoint: BASE_APIV1(`/admin/user/put-user/${id}`) }).put({
      first_name,
      last_name
    });

    return new UserModel(result);
  },

  async UPDATE_USER_ROLE({ id_user, id_role }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/user/authorized-user') }).post({
      id_user,
      id_role
    });
  },

  async SEARCH_USER({ key_search, page, limit, status, id_school }) {
    let payload = { page, limit, status };
    if (key_search) payload = { ...payload, key_search };
    if (id_school) payload = { ...payload, id_school };

    const { allUser, total } = await new RequestUtils({ endpoint: BASE_APIV1('/admin/user/search-user') }).post(
      payload
    );

    return {
      total,
      allUser: allUser.map(item => new UserModel(item))
    };
  }
};

export const CAMPAIGN_EVENTS_ENDPOINT = {
  async ADD_TEAM({ school_id = null, filter }) {
    if (school_id)
      return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-team') }).post({ school_id });
    return new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/add-team?filter=${filter}`) }).post({});
  },

  async GET_TEAM_VOTE_ROUND_32({ page = 1, limit = 100, type_id, text_search = '' }) {
    if (text_search)
      return await new RequestUtils({
        endpoint: BASE_APIV1(`/campaign-events/vote-round-32/${type_id}&text_search=${text_search}`)
      }).get({
        query: {
          page,
          limit
        }
      });
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/vote-round-32/${type_id}`) }).get({
      query: {
        page,
        limit
      }
    });
  },
  async GET_TYPE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/type') }).get({});
  },

  async ADD_TEAM_WINNER_ROUND_32({ type_id, team, check }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-team-winner-round-32') }).post({
      type_id,
      team,
      check
    });
  },

  async TEAM_NOT_JOIN({ round_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/team-not-join/${round_id}`) }).get({});
  },

  async ROUND_OF_TYPE({ type_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/round-of-type/${type_id}`) }).get({});
  },
  async TEAM_IN_ROUND({ round_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/team-in-round/${round_id}`) }).get({});
  },

  async ADD_MATCH_ANY_ROUND({ round_id, team_1, team_2 }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-match-any-round/') }).post({
      round_id,
      team_1,
      team_2
    });
  },

  async ADD_TYPE({ type, name, startTime }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-type/') }).post({
      type,
      name,
      startTime
    });
  },

  async UPDATE_ROUND_TIME({ round_id, startTime, endTime }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/update-round-time/') }).put({
      round_id,
      startTime,
      endTime
    });
  },

  async UPDATE_STATUS_ROUND({ status, round_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/update-status-round/${round_id}`) }).put({
      status
    });
  },

  async UPLOAD_IMAGE_TO_MATCH({ match_id, photos }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/match-of-round/image/${match_id}`) }).post({
      photos
    });
  },

  async ADD_ROUND({ type_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-round/') }).post({ type_id });
  },

  async ADD_AVATAR_TEAM({ team, type_id, avatar }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-avatar-team') }).post({
      team,
      type_id,
      avatar
    });
  },
  async ADD_BANNER_TO_MATCH_OR_ROUND({ type_id, banners, type_apply, items_apply, typeScreen, bannersWeb }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/banner/${type_id}`) }).post({
      banners,
      type_apply,
      items_apply,
      typeScreen,
      bannersWeb
    });
  },
  async GET_DETAIL_BANNER_OF_MATCH_OR_ROUND({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/banner/${id}`) }).get({});
  },
  async EDIT_BANNERS_OF_MATCH_OR_ROUND({ items_id, banners, typeScreen, bannersWeb }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/banner') }).put({
      items_id,
      banners,
      typeScreen,
      bannersWeb
    });
  },
  async ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE({
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
  }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/add-banner-types') }).post({
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
    });
  }
};

export const REPORT_ENDPOINT = {
  async GET_ALL_REPORT({ page, limit, status }) {
    const { allReport, pageCount } = await new RequestUtils({ endpoint: BASE_APIV1('/admin/report/all-report') }).get({
      query: {
        page,
        limit,
        status
      }
    });
    return {
      allReport,
      pageCount
    };
  },

  async BLOCK_REPORT({ id }) {
    return new RequestUtils({ endpoint: BASE_APIV1(`/admin/report/block-post/${id}`) }).put({});
  }
};

export const STATISTICAL_ENDPOINT = {
  async GET_STATISTICAL() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/statistical/') }).get({});
  },

  async GET_FILTER_MEMBER({ type, month, year }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/statistical/filter-member') }).get({
      query: {
        type,
        year,
        month
      }
    });
  },

  async GET_YEAR_CREATE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/statistical/year-create') }).get({});
  }
};

export const NOTIFICATION_ENDPOINT = {
  async SEND_NOTIFICATION_ALL_USER({ title, content }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/send-notification-all-user') }).post({
      title,
      content
    });
  },

  async GET_ALL_NOTIFICATIONS({ page, limit }) {
    const { allNotification, totalNotRead } = await new RequestUtils({
      endpoint: BASE_APIV1('/admin/notification/all-notification')
    }).get({
      query: {
        page,
        limit
      }
    });

    return {
      allNotification: allNotification.map(item => new NotificationModel(item)),
      totalNotRead
    };
  },

  async READ_NOTIFICATION({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/notification/read-notification/${id}`) }).get({});
  }
};

export const AFFILIATE_ENDPOINT = {
  async GET_ALL_AFFILIATE({ page, limit }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/affiliate/all') }).get({
      query: {
        page,
        limit
      }
    });
  },

  async ADD_AFFILIATE({ photos, name, link }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/affiliate/') }).post({
      photos,
      name,
      link
    });
  },

  async DELETE_AFFILIATE({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/affiliate/${id}`) }).delete({});
  },

  async UPDATE_AFFILIATE({ id, name, photos, link }) {
    const payLoad = {
      name,
      photos,
      link
    };
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/affiliate/${id}`) }).put(payLoad);
  },

  async TOGGLE_DISPLAY_AFFILIATE({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/affiliate/toggle-display/${id}`) }).put({});
  },

  async ALL_AFFILIATE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/affiliate/all') }).get({
      query: {
        limit: -1
      }
    });
  },

  async PRIORITY_AFFILIATE({ affiliate }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/affiliate/priority') }).post({
      affiliate
    });
  },

  async GET_PRIORITY_AFFILIATE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/affiliate/priority') }).get({});
  }
};

// export const STATISTICAL_ENDPOINT = {
//   async GET_ALL_STATICAL() {
//     return await new RequestUtils({ endpoint: BASE_APIV1('/admin/statistical') }).get({});
//   }
// };

export const BADGE_ENDPOINT = {
  async GET_ALL_BADGE() {
    const result = await new RequestUtils({ endpoint: BASE_APIV1('/admin/badge/all-badge') }).get({});
    return result.map(item => new BadgeModel(item));
  },

  async EDIT_BADGE({ id, badge_type, name, day_count, photos, delete_photos, point, comment_count }) {
    let payLoad = { badge_type, name, day_count, photos, point, comment_count };
    if (delete_photos.length) {
      payLoad = {
        ...payLoad,
        delete_photos
      };
    }

    if (badge_type === BADGE_TYPE.BEST_RANKING) {
      delete payLoad.day_count;
      delete payLoad.comment_count;
    } else if (badge_type === BADGE_TYPE.ACTIVE) {
      delete payLoad.comment_count;
      delete payLoad.point;
    } else {
      delete payLoad.point;
    }

    const result = await new RequestUtils({ endpoint: BASE_APIV1(`/admin/badge/badge/${id}`) }).put(payLoad);
    return new BadgeModel(result);
  },

  async DELETE_BADGE({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/badge/badge/${id}`) }).delete({});
  }
};

export const ADS_ENDPOINT = {
  async ADD_BANNER_ADS({ title, photos, position, screen, link, time_start, time_end, id_type }) {
    const payload = { title, photos, position, screen, link, time_start, time_end, id_type };
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/post-banner') }).post(payload);
  },

  async UPDATE_BANNER_ADS({ id, title, photos, position, screen, link, time_start, time_end, id_type }) {
    const payload = { title, photos, position, screen, link, time_start, time_end, id_type };
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/ads/banner/${id}`) }).put(payload);
  },

  async DELETE_BANNER_ADS({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/ads/banner/${id}`) }).delete({});
  },

  async SET_HOT_NEWS({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/ads/hot-new/${id}`) }).put({});
  },

  async GET_ALL_BANNER({ page, limit }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/all-banner') }).get({
      query: {
        page,
        limit
      }
    });
  }
};

export const SCHOOL_REVIEW_ENDPOINT = {
  async LIST_SCHOOL_REVIEW({ page, limit, id_school }) {
    const { pageCount, data } = await new RequestUtils({ endpoint: BASE_APIV1('/admin/school/all-school-review') }).get(
      {
        query: {
          page,
          limit,
          id_school
        }
      }
    );
    return { pageCount, data: data.map(item => new SchoolReview(item)) };
  },

  async DELETE_SCHOOL_REVIEW({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/delete-school-review/${id}`) }).delete({});
  },

  async DETAIL_SCHOOL_REVIEW({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/school/detail-school-review/${id}`) }).get({});
  }
};

export const COMMENT_ENDPOINT = {
  async DELETE_COMMENT({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/comment/${id}`) }).delete({});
  },

  async ALL_COMMENT({ page = 1, limit = 10, comment_type, document }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/comment/get-all-comment?page=${page}&limit=${limit}`)
    }).post({
      comment_type,
      document
    });
  },

  async ALL_REPLY_COMMENT({ page = 1, limit = 10, parent }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/comment/get-all-reply-comment') }).get({
      query: {
        page,
        limit,
        parent
      }
    });
  }
};

export const LOCATION_REVIEW_ENDPOINT = {
  async ALL_LOCATION_REVIEW({ page = 1, limit = 10, location, search_name }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/location/list-location-review') }).get({
      query: {
        location,
        search_name,
        page,
        limit
      }
    });
  },

  async GET_LOCATION_REVIEW({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/review/${id}`) }).get({});
  },

  async DELETE_LOCATION_REVIEW({ id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/location/review/${id}`) }).delete({});
  }
};

export const BANNER_TYPE = {
  async ALL_BANNER_TYPE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/all-banner-type') }).get({});
  },

  async ALL_BANNER_TYPE_DELETE() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/all-banner-type-delete') }).get({});
  },

  async POST_BANNER_TYPE({ name }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/admin/ads/add-type-banner') }).post({
      name
    });
  },

  async PUT_BANNER_TYPE({ name, id_banner }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/ads/type-banner/${id_banner}`) }).put({
      name
    });
  },

  async DELETE_BANNER_TYPE({ id_banner }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/admin/ads/type-banner/${id_banner}`) }).delete({});
  }
};
