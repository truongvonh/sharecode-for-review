// import { SchoolModel } from 'models/school';
import CommentModel from 'models/comment';
import { User } from 'models/user';

export class LocationModel {
  constructor(location) {
    this.name = location.name;
    this.address = location.address;
    this.rating = location.rating;
    this.score = location.score;
    this.avatar = this.getAvatar(location.avatar);
    this.school = location.school || [];
    this._id = location._id;
  }

  getAvatar = avatar => {
    if (avatar.length) return avatar;
    else return [];
  };
}

export class LocationReviewModel {
  constructor(locationReview) {
    this._id = locationReview._id;
    this.rating = locationReview.rating;
    this.photos = locationReview.photos;
    this.totalVote = locationReview.total_vote;
    this.totalComment = locationReview.total_comment;
    this.voted = locationReview.voted;
    this.reply_comment = locationReview.reply_comment;
    this.content = locationReview.content;
    this.createdAt = locationReview.createdAt;
    this.updatedAt = locationReview.updatedAt;
    this.user = new User(locationReview.user);
    this.location = new LocationModel(locationReview.location);
    this.comment =
      locationReview.comment && locationReview.comment.length
        ? locationReview.comment.map(item => new CommentModel(item))
        : [];
  }
}

export class LocationNearSchoolModel {
  constructor(location) {
    this._id = location._id;
    this.name = location.name;
    this.address = location.address;
    this.rating = location.rating;
    this.score = location.score;
    this.photos = location.photos;
    this.description = location.description;
    this.coordinate = location.coordinate;
    this.avatar = this.getAvatar(location.avatar);
    this.school = location.school || [];
    this.locationType = location.locationType || [];
  }
  getAvatar = avatar => {
    if (avatar.length) return avatar;
    else return [];
  };
}
