export const REGEX = {
  IS_EMAIL: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gi,
  IS_PHONE_NUMBER: /^[0-9]{10,14}$/gi,
  IS_NUMBER: /^\d{0,}$/g,
  PASSWORD_VALIDATION: /^.{6,30}$/gi
};

export const HEADER = {
  ALL_TEXT: ['Bảng tin ', 'Cộng đồng', 'Thi đấu', 'Đại học - Cao đẳng'],
  ALL_LINK: ['/news', '#', '/newscompetition/happening', '/university']
};

export const TYPE_FOLLOW = {
  SCHOOL_FOLLOW: 'SCHOOL_FOLLOW',
  USER_FOLLOW: 'USER_FOLLOW'
};

export const ALL_NEWS_FEED_TYPE = {
  REVIEW_LOCATION: 'REVIEW_LOCATION',
  UPDATE_REVIEW_LOCATION: 'UPDATE_REVIEW_LOCATION',

  REVIEW_SCHOOL: 'REVIEW_SCHOOL',
  UPDATE_REVIEW_SCHOOL: 'UPDATE_REVIEW_SCHOOL',

  POST_GROUP: 'POST_GROUP',
  PUT_GROUP: 'PUT_GROUP',

  VOTED_ABOUT_GROUP: 'VOTED_ABOUT_GROUP',
  VOTED_ABOUT_REVIEW_SCHOOL: 'VOTED_ABOUT_REVIEW_SCHOOL',
  VOTED_ABOUT_REVIEW_LOCATION: 'VOTED_ABOUT_REVIEW_LOCATION',

  COMMENTED_ABOUT_REVIEW_LOCATION: 'COMMENTED_ABOUT_REVIEW_LOCATION',
  COMMENTED_ABOUT_REVIEW_SCHOOL: 'COMMENTED_ABOUT_REVIEW_SCHOOL',
  COMMENTED_ABOUT_GROUP: 'COMMENTED_ABOUT_GROUP'
};

export const ALL_INTERACT_CONTENT = {
  ALL_ICONS: ['ic_like', 'ic_message', 'ic_share'],
  ALL_TEXT: ['like', 'comment', 'share'],
  ALL_PROPERTY: ['totalVote', 'totalComment', 'totalShare']
};

export const ALL_NAME_ROUNDS = {
  ROUND_32: 'ROUND_32',
  ROUND_16: 'ROUND_16',
  ROUND_8: 'ROUND_8',
  ROUND_4: 'ROUND_4',
  ROUND_2: 'ROUND_2',
  ROUND_1: 'ROUND_1'
};

export const ALL_ROUNDS_LABEL = {
  ROUND_32: 'Vòng sơ loại',
  ROUND_16: 'Vòng 1/16',
  ROUND_8: 'Vòng 1/8',
  ROUND_4: 'Tứ kết',
  ROUND_2: 'Bán kết',
  ROUND_1: 'Chung kết'
};

export const CAMPAIGN = {
  ALL_STATUS: ['HAPPENING', 'NOT_HAPPEN', 'HAPPENED'],
  ALL_TEXTS: ['Đang thi', 'Sắp diễn ra', 'Đã thi']
};

export const HEADER_NAVIGATE_RESULT = {
  ALL_LINKS: ['/result', '/result/school', '/result/location', '/result/user', '/result/location_review'],
  ALL_TEXTS: ['Tất cả', 'Trường học', 'Địa điểm', 'Thành viên', 'Bài viết']
};

export const UPLOAD_TYPE = {
  LOCATION_REVIEW: 'LOCATION_REVIEW',
  CAMPAIGN: 'CAMPAIGN',
  APPOINTMENT: 'APPOINTMENT',
  SCHOOL_REVIEW: 'SCHOOL_REVIEW',
  SCHOOL: 'SCHOOL',
  COMMENT: 'COMMENT',
  CONSULTANT: 'CONSULTANT',
  AVATAR: 'AVATAR',
  GROUP: 'GROUP',
  REPORT: 'REPORT',
  AFFILIATE: 'AFFILIATE',
  LOCATION: 'LOCATION',
  BANNER: 'BANNER',
  BADGE: 'BADGE'
};

export const ALL_TYPE = {
  LOCATION: 'LOCATION',
  LOCATION_REVIEW: 'LOCATION_REVIEW',
  USER: 'USER',
  SCHOOL: 'SCHOOL'
};

export const ALL_GENDER = {
  MALE: 0,
  FEMALE: 1,
  UNDEFINED: 2
};

export const PROFILE_USER_TYPE = {
  YOU_FOLLOW: 'you-follow',
  FOLLOW_YOU: 'follow-you',
  FOLLOW_SCHOOL: 'follow-school',
  TIME_LINE: 'time-line',
  EDIT_PROFILE: 'edit-profile',
  PROFILE_USER: 'profile-user',
  ALBUM_USER: 'album-user'
};

export const GALLERY_TYPE = {
  FACEBOOK: 'FACEBOOK',
  ALBUM: 'ALBUM',
  ALBUM_SCHOOL: 'ALBUM_SCHOOL',
  ALBUM_LOCATION: 'ALBUM_LOCATION'
};

export const ACCOUNT_TYPE = {
  EMAIL_PHONE: 0,
  FACEBOOK: 1,
  GOOGLE: 2,
  APPLE: 3
};

export const HEADER_MENU = {
  PROFILE_USER: 'Trang cá nhân',
  EDIT_PROFILE_USER: 'Chỉnh sửa thông tin cá nhân',
  LOG_OUT: 'Đăng xuất'
};

export const NO_DATA_PROFILE = {
  INFO: 'Không có thông tin để hiển thị!',
  PHOTO: 'Không có hình ảnh để hiển thị!'
};

export const FALLBACK_IMAGE_TYPE = {
  AVATAR: 'avatar',
  SCHOOL: 'school',
  COVER: 'cover',
  LOCATION: 'location',
  REVIEW: 'review'
};

export const TEXT_IMAGE_TYPE = {
  AVATAR: 'Cập nhật ảnh đại diện',
  COVER: 'Cập nhật ảnh bìa'
};

export const UNFOLLOW_TYPE = {
  SCHOOL: 'school',
  USER: 'user'
};

export const REVIEW_SCHOOL_TEXT = {
  REVIEW_LOCATION: 'Review địa điểm xung quanh',
  REVIEW_SCHOOL: 'Review trường học',
  USER_FOLLOW_SCHOOL: 'Sinh viên theo dõi'
};

export const REVIEW_LOCATION_TEXT = {
  REVIEW_LOCATION: 'VIẾT REVIEW VỀ ĐỊA ĐIỂM'
};

export const OVERVIEW_SCHOOL_TYPE = {
  REVIEW_LOCATION: 'REVIEW_LOCATION',
  REVIEW_SCHOOL: 'REVIEW_SCHOOL'
};

export const OVERVIEW_SCHOOL_STATUS = {
  REVIEW_LOCATION: 'review-location',
  REVIEW_SCHOOL: 'review',
  OVERVIEW_SCHOOL: 'over-view',
  ALBUM_SCHOOL: 'album-school',
  STUDENT_FOLLOW: 'student-follow'
};

export const ALL_NOTIFICATIONS_TYPE = {
  COMMENTED_ABOUT_REVIEW_LOCATION: 'COMMENTED_ABOUT_REVIEW_LOCATION',
  COMMENTED_ABOUT_REVIEW_SCHOOL: 'COMMENTED_ABOUT_REVIEW_SCHOOL',
  COMMENTED_ABOUT_GROUP: 'COMMENTED_ABOUT_GROUP',

  VOTED_ABOUT_REVIEW_LOCATION: 'VOTED_ABOUT_REVIEW_LOCATION',
  VOTED_ABOUT_REVIEW_SCHOOL: 'VOTED_ABOUT_REVIEW_SCHOOL',
  VOTED_ABOUT_GROUP: 'VOTED_ABOUT_GROUP',

  REPLY_COMMENTED_ABOUT_REVIEW_LOCATION: 'REPLY_COMMENTED_ABOUT_REVIEW_LOCATION',
  REPLY_COMMENTED_ABOUT_REVIEW_SCHOOL: 'REPLY_COMMENTED_ABOUT_REVIEW_SCHOOL',
  REPLY_COMMENTED_ABOUT_GROUP: 'REPLY_COMMENTED_ABOUT_GROUP'
};

export const ALL_UPLOAD_TYPE = {
  COMMENT: 'COMMENT',
  SCHOOL: 'SCHOOL',
  LOCATION_REVIEW: 'LOCATION_REVIEW',
  SCHOOL_REVIEW: 'SCHOOL_REVIEW',
  AVATAR: 'AVATAR',
  CAMPAIGN: 'CAMPAIGN',
  GROUP: 'GROUP',
  REPORT: 'REPORT',
  AFFILIATE: 'AFFILIATE',
  LOCATION: 'LOCATION',
  BANNER: 'BANNER',
  BADGE: 'BADGE',
  PHOTO_CHAT: 'PHOTO_CHAT'
};

export const GROUP_TYPE = {
  BEAUTY: 'BEAUTY',
  ENTERTAINMENT: 'ENTERTAINMENT',
  TENANT: 'TENANT',
  TRADING: 'TRADING',
  NEWS: 'NEWS'
};
