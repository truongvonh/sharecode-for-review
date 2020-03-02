import { User } from './user';
import { ALL_NEWS_FEED_TYPE } from 'constants/common';
import { getNestedObjectSafe } from 'utils/helper';
import BadgeModel from 'models/badge';

export class NewFeedModel {
  constructor(newFeed) {
    this.type = newFeed.type;
    this.user = new User(newFeed.user);
    this.totalVote = newFeed.totalVote;
    this.totalComment = newFeed.totalComment;
    this.voted = newFeed.voted;
    this.updatedAt = newFeed.updatedAt;
    if (newFeed.last)
      this.last_id = newFeed.last;
    this.impactObj = this.checkNewFeedObject(newFeed);

    if (getNestedObjectSafe(newFeed, ['owner', '_id'])) {
      this.owner = new User(newFeed.owner);
    }
  }

  checkNewFeedObject = (item) => {
    switch (item.type) {
      case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
      case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
      case ALL_NEWS_FEED_TYPE.POST_GROUP:
      case ALL_NEWS_FEED_TYPE.PUT_GROUP: {
        return {
          name: item.group && item.group.name,
          photos: item.groupPost && item.groupPost.photos,
          content: item.groupPost && item.groupPost.content,
          groupTagSchool: item.groupTagSchool,
          groupTag: item.groupTag || [],
          linkDetailPost: getNestedObjectSafe(item, ['groupPost', '_id']),
          linkProfile: getNestedObjectSafe(item, ['group', 'type']),
          isGroup: true
        };
      }

      case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_SCHOOL:
      case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_SCHOOL:
      case ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL:
      case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_SCHOOL:
        return {
          rating: item.schoolReview && item.schoolReview.avgRating || 0,
          name: getNestedObjectSafe(item, ['school', 'name']),
          content: item.schoolReview && item.schoolReview.content,
          photos: item.schoolReview && item.schoolReview.photos,
          linkDetailPost: getNestedObjectSafe(item, ['schoolReview', '_id']),
          linkProfile: getNestedObjectSafe(item, ['school', '_id']),
          isSchool: true
        };

      case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
      case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
        return {
          rating: item.locationReview && item.locationReview.rating || 0,
          photos: item.locationReview && item.locationReview.photos,
          name: item.location && item.location.name || '',
          content: item.locationReview && item.locationReview.content,
          linkDetailPost: getNestedObjectSafe(item, ['locationReview', '_id']),
          linkProfile: getNestedObjectSafe(item, ['location', '_id']),
          isLocation: true
        };

    }
  }
}
