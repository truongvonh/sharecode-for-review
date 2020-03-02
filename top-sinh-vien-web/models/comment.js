import { User } from 'models/user';

export default class CommentModel {
  constructor(comment) {
    this._id = comment._id;
    this.updatedAt = comment.updatedAt;
    this.comment_type = comment.comment_type;
    this.photos = comment.photos;
    this.content = comment.content || comment.comment;
    this.user = new User(comment.user);
    if (comment.nextPageReply)
      this.nextPageReply = comment.nextPageReply;
    if (comment.parent)
      this.parent = comment.parent;
    this.replyComment = !!comment.replyComment && new CommentModel(comment.replyComment);
  }
}
