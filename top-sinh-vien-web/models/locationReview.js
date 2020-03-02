import { User } from './user';
import { LocationModel } from './location';
export class LocationReview {
  constructor(Review) {
    this.user = new User(Review.user);
    this.location = new LocationModel(Review.location);
    this.content = Review.content;
    this.createdAt = Review.createdAt;
    this.rating = Review.rating;
    this.photos = Review.photos;
    this._id = Review._id;
  }
}
