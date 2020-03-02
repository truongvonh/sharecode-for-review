export class LocationDetail {
  constructor(Detail) {
    this._id = Detail.info._id;
    this.name = Detail.info.name;
    this.address = Detail.info.address;
    this.avgRating = Detail.info.rating;
    this.score = Detail.info.score;
    this.photos = Detail.info.photos;
    this.description = Detail.info.description;
    this.coordinate = Detail.info.coordinate;
    this.avatar = this.getAvatar(Detail.info.avatar);
    this.school = Detail.school || [];
    this.locationType = Detail.info.locationType || [];
    this.rating = Detail.rating;
  }
  getAvatar = avatar => {
    if (avatar.length) return avatar;
    else return [];
  };
}
