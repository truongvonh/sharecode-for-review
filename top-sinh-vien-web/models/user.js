import BadgeModel from 'models/badge';

export class UserProfile {
  constructor(profile) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.fullName = this.getFullName();
    this.avatar = profile.avatar;
    this.school = profile.school;
    this.cover = profile.cover;
    this.dateOfBirth = profile.dateOfBirth;
    this.gender = profile.gender;
    this.address = profile.address;
    this.describe = profile.describe;
  }

  getFullName() {
    return `${this.lastName} ${this.firstName}`;
  }
}

export class User {
  constructor(user) {
    this._id = user._id || '';
    this.email = user.email || '';
    this.follow = user.follow || '';
    this.profile = new UserProfile(user.profile);
    this.accountType = user.accountType;
    this.badge = user.id_badge && user.id_badge.length ? user.id_badge.map(item => new BadgeModel(item)) : [];
    this.badge = user.id_badge && user.id_badge.length ? user.id_badge.map(item => new BadgeModel(item)) : [];
  }
}

export class UserFollow {
  constructor(user) {
    this._id = user.user._id || '';
    this.follow = user.follow;
    this.profile = new UserProfile(user.user.profile);
    this.badge =
      user.user && user.user.id_badge && user.user.id_badge.length
        ? user.user.id_badge.map(item => new BadgeModel(item))
        : [];
  }
}
