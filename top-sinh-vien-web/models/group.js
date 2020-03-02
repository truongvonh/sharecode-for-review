import { User } from 'models/user';
import { getNestedObjectSafe } from 'utils/helper';

export class GroupModel {
  constructor(group) {
    this.name = group.name;
    this.type = group.type;
    this.icon = this.getIcon(group.icon);
  }

  getIcon = icon => {
    return icon && `${process.env.API_URL}${icon}`;
  };
}

export class GroupPostModel {
  constructor(groupPost) {
    this._id = groupPost._id;
    this.content = groupPost.content;
    this.user = new User(groupPost.user);
    this.updatedAt = groupPost.updatedAt;
    this.photos = groupPost.photos;
    this.totalVote = groupPost.total_vote;
    this.totalComment = groupPost.total_comment;
    this.voted = groupPost.voted;
    this.comment = groupPost.comment;
    this.reply_comment = groupPost.reply_comment;
    this.tag_school = groupPost.tag_school;
    this.group = new GroupModel(groupPost.group);
    this.host = groupPost.host || null;
    this.occupation = groupPost.occupation || null;
    this.price = groupPost.price || null;
    this.groupType = getNestedObjectSafe(groupPost, ['group', 'type']) || null;
    this.linkDetailPost = getNestedObjectSafe(groupPost, ['_id']) || null;
    this.groupTags = groupPost.groupTags || null;
  }
}
