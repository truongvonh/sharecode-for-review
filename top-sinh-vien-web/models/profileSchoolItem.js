import { getNestedObjectSafe } from 'utils/helper';
import { User } from './user';
import { ALL_NEWS_FEED_TYPE, OVERVIEW_SCHOOL_TYPE } from 'constants/common';

export class ProfileSchoolItemModel {
  constructor(schoolItem) {
    this.type = ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL;
    this.user = new User(getNestedObjectSafe(schoolItem, ['user']));
    this.totalVote = getNestedObjectSafe(schoolItem, ['total_vote']);
    this.totalComment = getNestedObjectSafe(schoolItem, ['total_comment']);
    this.voted = getNestedObjectSafe(schoolItem, ['voted']);
    this.updatedAt = getNestedObjectSafe(schoolItem, ['createdAt']);
    this.impactObj = this.newIpactObj(schoolItem);
  }

  newIpactObj = item => {
    return {
      rating: getNestedObjectSafe(item, ['avgRating']),
      name: getNestedObjectSafe(item, ['id_school', 'name']),
      content: getNestedObjectSafe(item, ['content']),
      photos: getNestedObjectSafe(item, ['photos']),
      linkDetailPost: getNestedObjectSafe(item, ['_id']),
      linkProfile: getNestedObjectSafe(item, ['id_school', '_id']),
      isSchool: true
    };
  };
}

export class LocationNearSchoolOverviewModel {
  constructor(overview) {
    this.type = OVERVIEW_SCHOOL_TYPE.REVIEW_LOCATION;
    this.user = new User(getNestedObjectSafe(overview, ['user']));
    this.totalVote = getNestedObjectSafe(overview, ['total_vote']);
    this.totalComment = getNestedObjectSafe(overview, ['total_comment']);
    this.voted = getNestedObjectSafe(overview, ['voted']);
    this.updatedAt = getNestedObjectSafe(overview, ['createdAt']);
    this.impactObj = this.checkOverviewObject(overview);
  }
  checkOverviewObject = item => {
    return {
      rating: getNestedObjectSafe(item, ['rating']),
      name: getNestedObjectSafe(item, ['location', 'name']),
      content: getNestedObjectSafe(item, ['content']),
      photos: getNestedObjectSafe(item, ['photos']),
      linkDetailPost: getNestedObjectSafe(item, ['_id']),
      linkProfile: getNestedObjectSafe(item, ['location', '_id']),
      isLocation: true
    };
  };
}

export class UserFollowSchoolModel {
  constructor(userFollowSchool) {
    this.user = new User(getNestedObjectSafe(userFollowSchool, ['user']));
    this._id = userFollowSchool._id;
    this.follow = userFollowSchool.follow;
  }
}
