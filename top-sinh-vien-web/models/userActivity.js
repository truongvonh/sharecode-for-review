import { NewFeedModel } from 'models/newFeed';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import { getNestedObjectSafe } from 'utils/helper';

export default class UserActivityModel extends NewFeedModel {
  constructor(userActivities) {
    super(userActivities);
    this.impactObj = this.checkImpactObj(userActivities);
  }

  checkImpactObj = item => {
    switch (item.type) {
      case ALL_NEWS_FEED_TYPE.POST_GROUP:
      case ALL_NEWS_FEED_TYPE.PUT_GROUP: {
        return {
          name: getNestedObjectSafe(item, ['document', 'group', 'name']),
          photos: getNestedObjectSafe(item, ['document', 'photos']),
          content: getNestedObjectSafe(item, ['document', 'content']),
          groupTagSchool: item.groupTagSchool || [],
          groupTag: item.groupTag || [],
          linkDetailPost: getNestedObjectSafe(item, ['document', '_id']),
          linkProfile: getNestedObjectSafe(item, ['document', 'group', 'type']) || null,
          isGroup: true
        };
      }

      case ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL:
      case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_SCHOOL:
        return {
          rating: getNestedObjectSafe(item, ['document', 'avgRating']),
          name: getNestedObjectSafe(item, ['document', 'id_school', 'name']),
          content: getNestedObjectSafe(item, ['document', 'content']),
          photos: getNestedObjectSafe(item, ['document', 'photos']),
          linkDetailPost: getNestedObjectSafe(item, ['document', '_id']),
          linkProfile: getNestedObjectSafe(item, ['document', 'id_school', '_id']),
          isSchool: true
        };

      case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
        return {
          rating: getNestedObjectSafe(item, ['document', 'rating']),
          photos: getNestedObjectSafe(item, ['document', 'photos']),
          name: (item.location && item.location.name) || '',
          content: getNestedObjectSafe(item, ['document', 'content']),
          linkDetailPost: getNestedObjectSafe(item, ['document', '_id']),
          linkProfile: getNestedObjectSafe(item, ['document', 'location', '_id']),
          isLocation: true
        };
    }
  };
}
