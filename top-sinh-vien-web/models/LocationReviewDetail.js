import { OVERVIEW_SCHOOL_TYPE } from 'constants/common';
import { getNestedObjectSafe } from 'utils/helper';
import { User } from 'models/user';

export class LocationReviewDetail {
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
      linkProfile: getNestedObjectSafe(item, ['user', '_id'])
      // isSchool: true
    };
  };
}
