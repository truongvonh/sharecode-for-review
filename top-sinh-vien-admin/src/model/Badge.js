class BadgeModel {
  constructor(badge) {
    this._id = badge._id;
    this.point = badge.point;
    this.name = badge.name;
    this.badge_type = badge.badge_type;
    this.photos = badge.photos;
    this.criteria = this.checkCriteria(badge);
  }

  checkCriteria = (badge) => {
    if (badge.criteria) return  JSON.parse(badge.criteria);
    return false;
  }
}

const BADGE_TYPE_ENUM = ['best-ranking', 'comment-top', 'active'];

export {
  BADGE_TYPE_ENUM,
  BadgeModel
};