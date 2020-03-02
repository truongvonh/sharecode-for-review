class UserModel {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.fullName = this.getFullName(user.profile) || user.fullName || 'Ẩnh danh';
    this.status = user.status;
    this.role = user.role;
    this.first_name = user.profile && user.profile.firstName;
    this.last_name = user.profile && user.profile.lastName;
    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.password = user.password;
    this.avatar = this.getUserAvatar(user.profile);
    this.schoolUser = this.getSchoolUser(user.profile);
    this.status = this.getUserStatus(user.status) || user.status;
  }

  getFullName = user => {
    const result = user && `${user.firstName} ${user.lastName}`;
    if (result.length === 1) return this.email;
    return result;
  };

  setRole = role => {
    this.role = role;
  };

  getUserAvatar = user => {
    return user && user.avatar && user.avatar.length ? user.avatar[0].thumb : '';
  };

  getSchoolUser = user => {
    return user && user.school ? `${user.school.name} - (${user.school.schoolCode} )` : '';
  };

  getUserStatus = status =>
    !status
      ? { label: 'Chưa kích hoạt', color: 'warning' }
      : status === 1
      ? { label: 'Đang hoạt động', color: 'success' }
      : { label: 'Đang bị khoá', color: 'danger' };
}

export default UserModel;
