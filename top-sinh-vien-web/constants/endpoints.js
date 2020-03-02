import RequestUtils from 'utils/api_handler';
import { Ranking } from 'models/userRanking';
import { NewFeedModel } from 'models/newFeed';
import { GroupItemModel } from 'models/groupItem';
import { LocationReview } from '../models/locationReview';
import { User, UserFollow } from '../models/user';
import { SchoolAboutModel, SchoolModel, SchoolReviewModel } from 'models/school';
import { LocationModel, LocationNearSchoolModel, LocationReviewModel } from 'models/location';
import { LocationDetail } from 'models/locationDetail';
import { CampaignTypeModel } from 'models/campaignType';
import { GroupModel, GroupPostModel } from 'models/group';
import CommentModel from 'models/comment';
import UserActivityModel from '../models/userActivity';
import { FollowSchool } from 'models/followSchool';
import {
  LocationNearSchoolOverviewModel,
  ProfileSchoolItemModel,
  UserFollowSchoolModel
} from 'models/profileSchoolItem';
import CampaignRoundModel from 'models/campaignRound';
import { CampaignMatchModel, CampaignRound32Model } from 'models/campaignMatch';
import { ALL_NAME_ROUNDS } from 'constants/common';
import BadgeModel from 'models/badge';
import LocationTypeModal from 'models/locationType';
import { LocationReviewDetail } from 'models/LocationReviewDetail';
import { isProduction } from 'utils/helper';

const BASE_APIV1 = endpoint => `${!isProduction ? process.env.API_URL_STAGING : process.env.API_URL}/apiV1` + endpoint;
// const BASE_APIV1 = endpoint => `${process.env.API_URL}/apiV1` + endpoint;
const BASE_APIV2 = endpoint => `${!isProduction ? process.env.API_URL_STAGING : process.env.API_URL}/apiV2` + endpoint;
// const BASE_APIV2 = endpoint => `${process.env.API_URL}/apiV2` + endpoint;

export const SCHOOL_V2_ENDPOINT = {
  async LOCATION_NEAR_SCHOOL({ id, page = 1, limit = 10, key = '', id_type }) {
    const { result: data } = await new RequestUtils({
      endpoint: BASE_APIV2(`/school/location-near-by-school/${id}`)
    }).post(
      { id_type },
      {
        page,
        limit,
        key
      }
    );
    return data.map(item => new LocationNearSchoolModel(item));
  }
};

export const AUTH_ENDPOINT = {
  async LOGIN({ username, password }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/login') }).post({
      username,
      password
    });
  },

  async LOGOUT() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/logout') }).get({});
  },

  async GET_USER_INFO(customHeaders = {}) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/me'), customHeaders }).get({});
  },

  async GOOGLE_AUTH({ access_token }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/oauth/google')
    }).post({ access_token });
  },

  async FACEBOOK_AUTH({ access_token }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/oauth/facebook') }).post({
      access_token
    });
  },

  async EMAIL_REGISTER({ first_name = '', last_name, username, password }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/register/')
    }).post({
      first_name,
      last_name,
      username,
      password
    });
  },

  async CONFIRM_CODE({ verify_code, username }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/register/confirm/')
    }).post({
      verify_code,
      username
    });
  },

  async RE_SEND_CODE({ username, type_resend_code = 'register' }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/resend-code/')
    }).post({
      username,
      type_resend_code
    });
  },

  async FORGOT_PASSWORD({ username, type_forgot_password = 'email' }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/forgot-password/')
    }).post({
      username,
      type_forgot_password
    });
  },

  async FORGOT_PASSWORD_CONFIRM({ verify_code, username, new_password, confirm_password }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/forgot-password/confirm/')
    }).post({
      verify_code,
      username,
      new_password,
      confirm_password
    });
  }
};

export const RAKING_ENDPOINT = {
  async LIST_RAKING({ page, limit, id_school, sort }) {
    // console.log({ page, limit, id_school, sort });
    let query = { page, limit, id_school };
    if (sort) query = { ...query, sort };
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/listRanking/')
    }).get({
      query
    });

    return data.map(item => new Ranking(item));
  }
};

export const SCHOOL_ENDPOINT = {
  async LIST_SCHOOL({ page = 1, limit = 12 }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/school/get-all-school/')
    }).get({
      query: {
        page,
        limit
      }
    });
    return data.map(item => new SchoolModel(item));
  },

  async DETAIL_SCHOOL_REVIEW({ id, headers }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/school-review/${id}`),
      customHeaders: headers
    }).get({});
    return new SchoolReviewModel(data);
  },
  async SCHOOL_INFO({ university_id }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/${university_id}`)
    }).get({});
    return new SchoolAboutModel(data);
  },
  async LOCATION_NEAR_SCHOOL({ id, page = 1, limit = 10, key = '' }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/location-near-by-school/${id}`)
    }).post(
      {},
      {
        page,
        limit
      }
    );
    return data.map(item => new LocationNearSchoolModel(item));
  },
  async REVIEW_OF_SCHOOL({ id, page = 1, limit = 10, rating = '' }) {
    const { total, result } = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/review-of-school/${id}`)
    }).get({
      query: {
        page,
        limit,
        rating
      }
    });
    return {
      total,
      result: result.map(item => new ProfileSchoolItemModel(item))
    };
  },
  async OVERVIEW_SCHOOL({ id }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/school-review-location-review-user-follow/${id}`)
    }).get({
      query: {}
    });
    return {
      review_school: data.review_school.data.map(review => new ProfileSchoolItemModel(review)),
      user_follow_school: data.user_follow_school.data.map(user => new UserFollowSchoolModel(user)),
      location_review_near_school: data.location_review_near_school.data.map(
        location => new LocationNearSchoolOverviewModel(location)
      )
    };
  },
  async REVIEW_LOCATION_NEAR_SCHOOL({ id, page = 1, limit = 10, rating = '' }) {
    const { total, result } = await new RequestUtils({
      endpoint: BASE_APIV1(`/school/location-review-near-by-school/${id}`)
    }).get({
      query: { page, limit, rating }
    });
    return {
      total,
      result: result.map(item => new LocationNearSchoolOverviewModel(item))
    };
  }
};

export const FLOW_ENDPOINT = {
  async FLOW_USER({ follow_id, type }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/follow/')
    }).post({
      follow_id,
      type
    });
  },
  async LIST_FOLLOW_SCHOOL({ page = 1, limit = 12, key = '', user_id }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/follow/list-you-follow-school/${user_id}`)
    }).get({
      query: {
        page,
        limit,
        key
      }
    });
    return data.map(item => new FollowSchool(item));
  },
  async LIST_PEOPLE_FOLLOW_YOU({ page = 1, limit = 12, user_id, key = '' }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/follow/list-user-follow-you/${user_id}`)
    }).get({
      query: {
        page,
        limit,
        key
      }
    });
    return data.map(item => new User(item));
  },
  async LIST_YOU_FOLLOW_PEOPLE({ page = 1, limit = 12, user_id, key = '' }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/follow/list-you-follow-people/${user_id}`)
    }).get({
      query: {
        page,
        limit,
        key
      }
    });
    return data.map(item => new User(item));
  },
  async FLOW_SCHOOL({ follow_id, type }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/follow/')
    }).post({
      follow_id,
      type
    });
  },
  async LIST_TOTAL_FOLLOW_SCHOOL({ page = 1, limit = 12, id_school, key = '', id_badge = '' }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/follow/list-total-follow-school/${id_school}`)
    }).get({
      query: {
        page,
        limit,
        key,
        id_badge
      }
    });
    return data.map(item => new UserFollow(item));
  }
};

export const NEW_FEED_ENDPOINT = {
  async LIST_NEW_FEED({ page, limit, last_index }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1('/newfeed/') }).post(
      {},
      {
        page,
        limit,
        last_index
      }
    );

    return data.map(item => new NewFeedModel(item));
  },
  async LIST_NEW_FEED_V2({ page, limit, last_id, customHeader = false }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV2('/newfeed/'), customHeader }).post(
      {},
      {
        page,
        limit,
        last_id
      }
    );

    return data.map(item => new NewFeedModel(item));
  }
};

export const USER_ENDPOINT = {
  async LIST_ABOUT_USER({ user_id }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/user/more-about-user-info/${user_id}`)
    }).get({});
  },

  async UPDATE_USER_INFO({
    last_name,
    first_name = '',
    gender,
    date_of_birth = '',
    school,
    address,
    avatar = [],
    cover = [],
    describe
  }) {
    const payload = avatar.length
      ? { avatar }
      : cover.length
      ? { cover }
      : { last_name, gender, date_of_birth, school, address, describe, first_name };
    return await new RequestUtils({
      endpoint: BASE_APIV1('/user/update')
    }).put(payload);
  },

  async PROFILE_INFO({ user_id }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/user/${user_id}`)
    }).get({});
    return new User(data);
  },

  async UPDATE_EMAIL({ email, password }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/update-email-phone/email') }).put({
      email,
      password
    });
  },

  async UPDATE_CONFIRM_EMAIL({ email, verify_code }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/update/confirm') }).put({
      email,
      verify_code
    });
  },

  async LIST_USER_ACTIVITY({ user_id, page = 1, limit = 10 }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/user/activity/${user_id}`)
    }).get({
      query: {
        page,
        limit
      }
    });
    return data.map(item => new UserActivityModel(item));
  },

  async NOTIFICATIONS({ page = 1, limit = 10 }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/notification') }).get({
      query: {
        page,
        limit
      }
    });
  },
  async COUNT_NOTIFICATIONS() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/notification-count') }).get({});
  },

  async READ_NOTIFICATIONS({ notification_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/user/notification-read${notification_id}`) }).put();
  },

  async READ_ALL_NOTIFICATIONS() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/user/read-all-notification') }).get({});
  }
};

export const CAMPAIGN_ENDPOINT = {
  async LIST_CAMPAIGN({ status = '', headers }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/campaign-events/type/'),
      customHeaders: headers
    }).get({
      query: {
        status
      }
    });
    return data.map(item => new CampaignTypeModel(item));
  },

  async LIST_MATCH_BY_ROUND({ type_id, round_id, page = 1, limit = 12 }) {
    const payload = round_id ? { type_id, round_id } : { type_id };
    const query = { page, limit };
    const { bannersWeb, banners, round, result } = await new RequestUtils({
      endpoint: BASE_APIV1('/campaign-events/match-of-round')
    }).post(payload, query);
    return {
      bannersWeb: bannersWeb,
      banners: banners,
      round: new CampaignRoundModel(round),
      result: result.map(match =>
        round.name_round === ALL_NAME_ROUNDS.ROUND_32 ? new CampaignRound32Model(match) : new CampaignMatchModel(match)
      )
    };
  },

  async GET_MATCH_DETAIL({ match_id, headers }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/campaign-events/match-of-round/${match_id}`),
      customHeaders: headers
    }).get({});
  },

  async GET_ALL_ROUND_OF_TYPE({ type_id }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/round-of-type/${type_id}`) }).get({});
    return data.map(item => new CampaignRoundModel(item));
  },

  async GET_RELATE_MATCH({ type_id, round_id, match_id }) {
    const { result, round } = await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/match-of-round') }).post({
      type_id,
      round_id,
      match_id
    });
    return {
      result: result.map(item => new CampaignMatchModel(item)),
      round: new CampaignRoundModel(round)
    };
  },

  async GET_ALL_COMMENT_OF_MATCH({ match_id, page = 1, limit = 10 }) {
    const { results, count_comment } = await new RequestUtils({
      endpoint: BASE_APIV1(`/campaign-events/match-of-round/comment/${match_id}`)
    }).get({
      query: {
        page,
        limit
      }
    });
    return {
      results: results.map(comment => new CommentModel(comment)),
      count_comment
    };
  },

  async VOTE_TEAM({ match_id, round_id, team }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/vote') }).post({
      match_id,
      round_id,
      team
    });
  },

  async COMMENT_TO_MATCH({ comment, match_id, files }) {
    const result = await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/comment') }).post({
      match_id,
      comment,
      files
    });
    return new CommentModel(result);
  },

  async DELETE_COMMENT({ comment_id, user_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/campaign-events/match-of-round/comment/${comment_id}`) }).delete({
      user_id
    });
  },

  async EDIT_COMMENT_MATCH({ comment, user_id, comment_id, files }) {
    const baseObj = { comment, user_id, comment_id };
    const payLoad = files.length ? { ...baseObj, files } : baseObj;
    const result = await new RequestUtils({ endpoint: BASE_APIV1('/campaign-events/comment') }).put(payLoad);
    return new CommentModel(result);
  }
};

export const SEARCH_ENDPOINT = {
  async LIST_SEARCH({ key_search }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1('/search/search-main') }).post({
      key_search
    });
    const { result_location, result_location_review, result_users, result_school } = data;
    return {
      location: result_location.length ? result_location.map(item => new LocationModel(item)) : [],
      location_review: result_location_review.length
        ? result_location_review.map(item => new LocationReview(item))
        : [],
      user: result_users.length ? result_users.map(item => new User(item)) : [],
      school: result_school.length ? result_school.map(item => new SchoolModel(item)) : []
    };
  },

  async SEARCH_TYPE({ key_search = '', page = 1, limit = 10, type, customHeaders = {} }) {
    const params = Object.keys(customHeaders).length
      ? {
          endpoint: BASE_APIV1('/search/search-filter-type'),
          customHeaders
        }
      : {
          endpoint: BASE_APIV1('/search/search-filter-type')
        };
    const data = await new RequestUtils(params).post({
      key_search,
      page,
      limit,
      type
    });
    if (type === 'SCHOOL') {
      return data.map(item => new SchoolModel(item));
    } else if (type === 'LOCATION') {
      return data.map(item => new LocationModel(item));
    } else if (type === 'USER') {
      return data.map(item => new User(item));
    } else {
      return data.map(item => new LocationReview(item));
    }
  }
};

export const LOCATION_ENDPOINT = {
  async LIST_LOCATION({ page = 1, limit }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/location/all-location')
    }).get({
      query: {
        page,
        limit
      }
    });
    return data.map(item => new LocationModel(item));
  },

  async GET_LOCATION_REVIEW({ id, headers = false }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/location/review/${id}`),
      customHeaders: headers
    }).get({});
    return new LocationReviewModel(data);
  },

  async ALL_LOCATION_TYPE() {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/location/all-location-type')
    }).get({
      query: {}
    });
    return data.map(item => new LocationTypeModal(item));
  },

  async DETAIL_LOCATION({ id }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1(`/location/${id}`)
    }).get({});
    return new LocationDetail(data);
  },

  async LOCATION_REVIEW({ id, page = 1, limit = 10, rating }) {
    const { total, result } = await new RequestUtils({
      endpoint: BASE_APIV1(`/location/location-review-of-location/${id}`)
    }).get({
      query: { page, limit, rating }
    });
    return {
      total,
      result: result.map(item => new LocationReviewDetail(item))
    };
  }
};

export const GROUP_ENDPOINT = {
  async GET_ALL_GROUP() {
    const groups = await new RequestUtils({ endpoint: BASE_APIV1('/group/all-name-group') }).get({});
    return groups.map(item => new GroupModel(item));
  },
  async DETAIL_POST_GROUP({ id, headers }) {
    const detail = await new RequestUtils({
      endpoint: BASE_APIV1(`/group/put-group/${id}`),
      customHeaders: headers
    }).get({});
    return new GroupPostModel(detail);
  },
  async GET_POST_GROUP({ type, page = 1, limit = 10, headers = false }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/group/all-post-type-group/'),
      customHeaders: headers
    }).get({
      query: {
        type,
        page,
        limit
      }
    });
    return data.map(item => new GroupItemModel(item));
  }
};

export const VOTE_ENDPOINT = {
  async VOTE({ vote_type, document }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/vote/') }).post({ vote_type, document });
  }
};

export const COMMENT_ENDPOINT = {
  async GET_ALL_COMMENT({ comment_type, document, page = 1, limit = 10 }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1('/comment/get-all-comment') }).post(
      {
        comment_type,
        document
      },
      {
        page,
        limit
      }
    );
    return {
      result: data.result.map(item => new CommentModel(item.comment)),
      nextPage: data.nextPage
    };
  },
  async GET_ALL_REPLY_COMMENT({ parent, page = 1, limit = 10 }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1('/comment/get-all-reply-comment') }).get({
      query: {
        parent,
        page,
        limit
      }
    });

    return {
      result: data.result.map(item => new CommentModel(item)),
      nextPage: data.nextPage
    };
  },
  async POST_COMMENT({ content, comment_type, document, photos }) {
    const data = await new RequestUtils({ endpoint: BASE_APIV1('/comment/post-comment') }).post({
      content,
      comment_type,
      document,
      photos
    });
    return new CommentModel(data);
  },
  async DELETE_COMMENT({ comment_id }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/comment/${comment_id}`) }).delete({});
  },
  async EDIT_COMMENT({ comment_id, content, photos, delete_photos }) {
    return await new RequestUtils({ endpoint: BASE_APIV1(`/comment/${comment_id}`) }).put({
      content,
      photos,
      delete_photos
    });
  }
};

export const UPLOAD_IMAGE_ENDPOINT = {
  async UPLOAD_FILE({ files, type, onUploadProgress = () => null }) {
    return await new RequestUtils({}).upload(files, type, onUploadProgress);
  }
};

export const COMMON_ENDPOINT = {
  async SEARCH_PROVINCE() {
    return await new RequestUtils({
      endpoint: BASE_APIV1('/common/province-city/')
    }).get({
      query: {}
    });
  }
};

export const SEARCH_SCHOOL_ENDPOINT = {
  async LIST_SEARCH_SCHOOL({ page = 1, limit = 10, key, filter = 'ALL', sort = 'desc' }) {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/search/search-school/')
    }).get({
      query: {
        page,
        limit,
        key,
        filter,
        sort
      }
    });
    return data.map(item => new SchoolModel(item));
  }
};

export const ALBUM_PHOTOS_ENDPOINT = {
  async ALBUM_PHOTOS({ user_id, page = 1 }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/album/photos-review/${user_id}`)
    }).get({
      query: {
        page
      }
    });
  },
  async ALBUM_SCHOOL({ id_school, page = 1, limit = 10 }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/album/school/${id_school}`)
    }).get({
      query: {
        page,
        limit
      }
    });
  },
  async ALBUM_LOCATION({ id, page = 1, limit = 10 }) {
    return await new RequestUtils({
      endpoint: BASE_APIV1(`/album/location/${id}`)
    }).get({
      query: {
        page,
        limit
      }
    });
  }
};

export const AFFILIATE_ENDPOINT = {
  async ALL_AFFILIATE({ page = 1, limit = 10 }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/affiliate/all') }).get({
      query: {
        page,
        limit
      }
    });
  }
};

export const ADS_ENDPOINT = {
  async ALL_BANNER_ADS() {
    return await new RequestUtils({ endpoint: BASE_APIV1('/ads/all-banner') }).get({});
  },

  async BANNER_HOT_NEWS({ page = 1, limit = 10 }) {
    return await new RequestUtils({ endpoint: BASE_APIV1('/ads/all-banner-hot-new') }).get({
      page,
      limit
    });
  }
};

export const BADGE_ENDPOINT = {
  async LIST_BADGE() {
    const data = await new RequestUtils({
      endpoint: BASE_APIV1('/badge/all-badge/')
    }).get({
      query: {}
    });
    return data.map(item => new BadgeModel(item));
  }
};
