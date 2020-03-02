class BadgeModel {
  constructor(badge) {
    this.name = badge.name;
    this.photos = this.getBadgePhotos(badge.photos);
    this._id = badge._id;
    this.badge_type = badge.badge_type;
  }

  getBadgePhotos(photos = []) {
    if (!photos || !Array.isArray(photos) || !photos.length) {
      return null;
    }

    return photos.map(photo => {
      return {
        thumb:  !!photo && `${process.env.API_URL}${photo.thumb}` || '',
        origin: !!photo && `${process.env.API_URL}${photo.origin}` || ''
      };
    });
  };
}

export default BadgeModel;
