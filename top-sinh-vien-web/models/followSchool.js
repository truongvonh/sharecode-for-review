export class FollowSchool {
  constructor(followSchool) {
    this._id = followSchool.document._id;
    this.avatar = followSchool.document.avatar;
    this.name = followSchool.document.name;
    this.follow = followSchool.follow;
    this.photos = followSchool.document.photos;
  }
}
