import { ALL_NAME_ROUNDS, ALL_NEWS_FEED_TYPE, ALL_TYPE } from 'constants/common';
import SvgIcons from 'components/SvgIcons';
import React from 'react';
import { NAVIGATE_URL } from 'constants/url';

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const promiseDelayImport = (importFunc, timeout = 1000) => () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(importFunc), timeout);
  });
};

export const getNestedObjectSafe = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined), nestedObj);
};

export const stringDate = (date, withHours = false) => {
  const parseDate = new Date(date);
  const result = parseDate.getDate() + '/' + parseDate.getMonth() + '/' + parseDate.getFullYear();
  const getHours = parseDate.getHours() + ':' + parseDate.getMinutes();
  if (withHours) return `${getHours}  ${result}`;
  else return result;
};

const timeSince = date => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 86400);
  if (interval > 6) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }
  if (interval <= 6 && interval > 0) {
    return interval + ' ngày trước';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' giờ trước';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' phút trước';
  }
  return Math.floor(seconds) + ' giây trước';
};
export const getFromNow = createdAt => {
  return timeSince(new Date(createdAt));
};

export const checkDetailTitle = type => {
  switch (type) {
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.PUT_GROUP:
    case ALL_NEWS_FEED_TYPE.POST_GROUP:
      return 'chi tiết bài viết trong nhóm';
    case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
      return 'chi tiết review địa điểm';
    default:
      return 'chi tiết review trường học';
  }
};

export const checkDetailProperty = type => {
  switch (type) {
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.PUT_GROUP:
    case ALL_NEWS_FEED_TYPE.POST_GROUP:
      return 'group';
    case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
      return 'location';
    default:
      return 'school';
  }
};

export const checkLinkProperty = type => {
  switch (type) {
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_GROUP:
    case ALL_NEWS_FEED_TYPE.PUT_GROUP:
    case ALL_NEWS_FEED_TYPE.POST_GROUP:
      return 'group';
    case ALL_NEWS_FEED_TYPE.REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION:
    case ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION:
      return 'location-detail-page';
    default:
      return 'profile-university/over-view';
  }
};

export const checkVoteType = type =>
  type.includes('LOCATION') ? 'LOCATION_REVIEW' : type.includes('SCHOOL') ? 'SCHOOL_REVIEW' : 'GROUP';

export const checkOptionsByType = (type, data) => {
  return data.map(item => {
    let checkData = {};
    switch (type) {
      case 'location':
        checkData = {
          type: 'location',
          href: NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(item._id),
          as: NAVIGATE_URL.LOCATION_DETAIL_PAGE.AS,
          label: item.name,
          icon: <SvgIcons fileName="placeholder" noHover />
        };
        break;
      case 'location_review':
        checkData = {
          type: 'location-review',
          label: item.content,
          href: NAVIGATE_URL.NEW_DETAIL_PAGE.URL(item._id, ALL_NEWS_FEED_TYPE.REVIEW_LOCATION),
          as: NAVIGATE_URL.NEW_DETAIL_PAGE.AS,
          icon: <SvgIcons fileName="testimonials" noHover />
        };
        break;
      case 'user':
        checkData = {
          type: 'user-profile',
          href: NAVIGATE_URL.USER_PROFILE_PAGE.URL(item._id),
          as: NAVIGATE_URL.USER_PROFILE_PAGE.AS(),
          label: getNestedObjectSafe(item, ['profile', 'fullName']),
          icon: <SvgIcons fileName="man" noHover />
        };
        break;
      default:
        checkData = {
          ...item,
          type: 'school',
          href: NAVIGATE_URL.SCHOOl_PROFILE_PAGE.URL(item._id),
          as: NAVIGATE_URL.SCHOOl_PROFILE_PAGE.AS(),
          label: item.name,
          icon: <SvgIcons fileName="graduation-cap" noHover />
        };
        break;
    }
    return { value: item._id, ...item, ...checkData };
  });
};

export const checkResultTitle = search_type =>
  search_type.toUpperCase() === ALL_TYPE.SCHOOL
    ? 'Danh sách tìm kiếm trường'
    : search_type.toUpperCase() === ALL_TYPE.LOCATION
    ? 'Danh sách tìm kiếm địa điểm'
    : search_type.toUpperCase() === ALL_TYPE.USER
    ? 'Danh sách tìm kiếm thành viên'
    : 'Danh sách tìm kiếm bài viết';

export const fakeArrayForPLaceHolder = round => {
  const lengthData =
    round.name_round === ALL_NAME_ROUNDS.ROUND_16
      ? 16
      : round.name_round === ALL_NAME_ROUNDS.ROUND_8
      ? 8
      : round.name_round === ALL_NAME_ROUNDS.ROUND_4
      ? 4
      : round.name_round === ALL_NAME_ROUNDS.ROUND_2
      ? 2
      : 1;
  return Array.from(Array(lengthData).keys());
};

export const isNearUntilToday = date =>
  new Date(date).getFullYear() < new Date().getFullYear() ? false : new Date(date).getTime() < new Date().getTime();

export const localStorageSet = (key, value) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, value);
  } else {
    console.log('Browser not supported Web storage...');
  }
};

export const localStorageGet = key => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key);
  } else {
    console.log('Browser not supported Web storage...');
  }
};

export const chunkArray = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

export const isProduction = process.env.NODE_ENV === 'production';

export const compressImageBeforeUpload = ({
  image,
  imageWidth = 500,
  imageHeight = 300,
  quality = 1000,
  isResize = false
}) => {
  return new Promise((resolve, reject) => {
    const fileName = image.name;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      (img.onload = () => {
        const elem = document.createElement('canvas');
        const width = isResize ? imageWidth : img.width;
        const height = isResize ? imageHeight : img.height;
        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          blob => {
            const file = new File([blob], fileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(file);
          },
          'image/jpeg',
          quality
        );
      }),
        (reader.onerror = error => reject(error));
    };
  });
};

export const checkIsDetailSchoolPage = type =>
  type &&
  (type === ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_SCHOOL ||
    type === ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL ||
    type === ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_SCHOOL ||
    type === ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_SCHOOL);

export const checkIsDetailLocationPage = type =>
  type &&
  (type === ALL_NEWS_FEED_TYPE.COMMENTED_ABOUT_REVIEW_LOCATION ||
    type === ALL_NEWS_FEED_TYPE.REVIEW_LOCATION ||
    type === ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_LOCATION ||
    type === ALL_NEWS_FEED_TYPE.VOTED_ABOUT_REVIEW_LOCATION);
