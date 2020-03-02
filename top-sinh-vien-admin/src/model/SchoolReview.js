import UserModel from './User';

class SchoolReviewModel {
  constructor(review) {
    this._id = review._id;
    this.content = review.content;
    this.createdAt = review.createdAt;
    this.photos = review.photos.length ? review.photos : [];
    this.rating = review.ratings.length ? review.ratings : [];
    this.user = new UserModel(review.user);
    this.school = review.id_school ? { name: review.id_school.name, schoolCode: review.id_school.schoolCode } : null;
  }
}

export default SchoolReviewModel;
