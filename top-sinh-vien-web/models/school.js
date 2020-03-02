import { User } from 'models/user';
import CommentModel from 'models/comment';

export class SchoolModel {
  constructor(school) {
    this._id = school._id || '';
    this.name = school.name;
    this.avatar = school.avatar;
    this.address = school.address;
    this.cover = school.cover;
    this.avatar = school.avatar;
    this.rating = school.avgRating;
    this.schoolCode = school.schoolCode;
    this.total_follow_school = school.total_follow_school;
    this.follow = school.follow;
    this.coordinate = school.coordinate;
  }
}

export class SchoolAboutModel {
  constructor(school) {
    this.total_image = school.total_image;
    this.total_review_school = school.total_review_school;
    this.location_near_by_school = school.location_near_by_school;
    this.total_follow_school = school.total_follow_school;
    this.follow = school.follow;
    this.school = school.school;
  }
}

class SchoolInfoModel {
  constructor(schoolInfo) {
    this.id = schoolInfo._id;
    this.name = schoolInfo.name;
    this.avatar = schoolInfo.avatar;
    this.cover = schoolInfo.cover;
    this.schoolCode = schoolInfo.schoolCode;
    this.photos = schoolInfo.photos;
    this.rating = schoolInfo.rating;
    this.educationProgramer = schoolInfo.educationProgramer;
    this.club = schoolInfo.club;
    this.intro = schoolInfo.intro;
    this.address = schoolInfo.address;
    this.coordinate = this.getCoordinate(schoolInfo.coordinate);
    this.delete = schoolInfo.delete;
    this.avgRating = schoolInfo.avgRating;
    this.totalReview = (!!schoolInfo.totalReview && schoolInfo.totalReview) || 0;
    this.total_image = schoolInfo.total_image;
  }

  getRating(rating) {
    if (!rating || !Array.isArray(rating)) return null;
    return rating.map(item => new RatingItem(item));
  }

  getAvgRating(rating) {
    if (!rating || !Array.isArray(rating) || !rating.length) {
      return 0;
    }

    return (
      rating.reduce((avgRating, item) => {
        if (!!item && !!item.avgRating) {
          avgRating = avgRating + item.avgRating;
          return avgRating;
        }
        return avgRating;
      }, 0) / rating.length
    );
  }

  getCoordinate(coordinate) {
    if (!coordinate)
      return {
        latitude: 0,
        longitude: 0
      };

    let response = {};

    if (coordinate['lat']) {
      response = {
        ...response,
        latitude: coordinate['lat']
      };
    } else {
      response = {
        ...response,
        latitude: coordinate['latitude']
      };
    }

    if (coordinate['lon']) {
      response = {
        ...response,
        longitude: coordinate['lon']
      };
    } else {
      response = {
        ...response,
        longitude: coordinate['longitude']
      };
    }

    return response;
  }
}

class ReviewType {
  constructor(reviewType) {
    this.name = reviewType.name;
    this._id = reviewType._id;
  }
}

class RatingItem {
  constructor(rating) {
    this.type = new ReviewType(rating.type);
    this.score = rating.score;
    this.avgRating = rating.avgRating;
    this.rating = rating.rating;
  }
}

export class SchoolReviewModel {
  constructor(schoolReview) {
    this._id = schoolReview._id;
    this.user = new User(schoolReview.user);
    this.flag = schoolReview.flag;
    this.updatedAt = schoolReview.updatedAt;
    this.voted = schoolReview.voted;
    this.reply_comment = schoolReview.reply_comment;
    this.content = schoolReview.content;
    this.totalVote = schoolReview.total_vote;
    this.photos = schoolReview.photos;
    this.totalComment = schoolReview.total_comment;
    this.comment =
      schoolReview.comment && schoolReview.comment.length
        ? schoolReview.comment.map(item => new CommentModel(item))
        : [];
    this.school = new SchoolModel(schoolReview.id_school);
    this.rating = schoolReview.avgRating;
    this.ratings = schoolReview.ratings.length ? schoolReview.ratings.map(item => new RatingItem(item)) : [];
  }
}

export class SchoolOverviewModel {
  constructor(schoolOverview) {
    this.review_school = schoolOverview.review_school;
    this.user_follow_school = schoolOverview.user_follow_school;
    this.location_review_near_school = schoolOverview.location_review_near_school;
  }
}
