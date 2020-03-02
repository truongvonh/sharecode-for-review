import { User } from './user';
import { getNestedObjectSafe } from 'utils/helper';

export class GroupItemModel {
  constructor(groupItem) {
    this.type = 'POST_GROUP';
    this.user = new User(groupItem.user);
    this.totalVote = groupItem.total_vote;
    this._id = groupItem._id;
    this.totalComment = groupItem.total_comment;
    this.voted = groupItem.voted;
    this.updatedAt = groupItem.updatedAt;
    this.host = groupItem.host || null;
    this.occupation = groupItem.occupation || null;
    this.price = groupItem.price || null;
    this.groupType = getNestedObjectSafe(groupItem, ['group', 'type']) || null;
    this.groupTags = groupItem.groupTags || null;
    this.impactObj = this.checkNewFeedObject(groupItem);
  }

  checkNewFeedObject = item => {
    return {
      name: item.group && item.group.name,
      photos: item.photos,
      content: item.content,
      // groupTagSchool: item.groupTagSchool,
      groupTag: item.groupTag || [],
      linkDetailPost: getNestedObjectSafe(item, ['_id']),
      linkProfile: getNestedObjectSafe(item, ['group', 'type']) || null,
      isGroup: true
    };
  };
}
