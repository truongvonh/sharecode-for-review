import { toast } from 'react-toastify';
import React from 'react';
import { history } from './../store';
import { ALL_PERMISSIONS } from 'constant';

export const checkExistItemInLocation = (arrayCheck, location) => {
  const dataNotExist = [];
  const locationIds = location.map(item => item._id);
  arrayCheck.length &&
    arrayCheck.forEach(item => {
      if (locationIds.indexOf(item._id) === -1) dataNotExist.push(item);
    });
  return dataNotExist;
};

export const callAPIMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {} } = action;

    if (!types) {
      return next(action);
    }

    if (!Array.isArray(types) || types.length !== 3 || !types.every(type => typeof type === 'string')) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return;
    }

    const [requestType, successType, failureType] = types;

    dispatch(
      Object.assign({}, payload, {
        type: requestType
      })
    );

    return callAPI().then(
      data => {
        const checkTypeResponse = Array.isArray(data) || typeof data === 'object';
        const result = checkTypeResponse ? data : payload;

        dispatch(
          Object.assign({}, payload, {
            data: result,
            type: successType,
            payload
          })
        );
      },
      error => {
        dispatch(
          Object.assign({}, payload, {
            error,
            type: failureType
          })
        );
        toast.error(error || 'Oops. Something errors!');
        if (error === 'TOKEN_INVALID') history.replace('/auth/signin');
      }
    );
  };
};

export const formatDate = (date, datetype = null) => {
  let d = date ? new Date(date) : new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (datetype) return [day, month, year].join('-');
  return [year, month, day].join('-');
};

export const getPreviewImage = e => {
  let value = [];
  if (e.target.files) {
    const files = Array.from(e.target.files);

    value = Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', ev => {
            return resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        });
      })
    );
  }
  return value;
};

export const formatAMPM = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const titleExample = 'Số 614 Lạc Long Quân, Nhật Tân, Việt Nam';

export const truncateSentences = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

export const _renderTitle = title => {
  const count = title.length > titleExample.length;
  if (count) return <>{truncateSentences(title, titleExample.length)} ...</>;
  return title;
};

export const _getPreviewImages = (allImages, index, subIndex = true) => {
  const item = allImages && allImages.length ? [allImages[index]] : [];

  return item.map(el => {
    const preview = subIndex ? (el[subIndex].length ? el[subIndex][0].origin : []) : el.origin;
    return { ...el, preview };
  });
};

export const localStorageSet = (key, value) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, value);
  } else {
    alert('Browser not supported Web storage...');
  }
};

export const localStorageGet = key => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key);
  } else {
    alert('Browser not supported Web storage...');
  }
};

export const checkUpload = file => {
  let isUpload = true;
  file.length &&
    file.map(item => {
      if (item.origin) isUpload = false;
    });
  return isUpload;
};

export const getFromNow = date => {
  const compareDate = new Date(date);
  const today = new Date();
  if (compareDate.getTime() > today.getTime()) return false;

  if (today.getYear() > compareDate.getYear()) return `${today.getYear() - compareDate.getYear()} năm trước`;
  if (today.getMonth() > compareDate.getMonth()) return `${today.getMonth() - compareDate.getMonth()} tháng trước`;
  if (today.getHours() > compareDate.getHours()) return `${today.getHours() - compareDate.getHours()} giờ trước`;
  if (today.getMinutes() > compareDate.getMinutes())
    return `${today.getMinutes() - compareDate.getMinutes()} phút trước`;
  if (today.getSeconds() > compareDate.getSeconds())
    return `${today.getSeconds() - compareDate.getSeconds()} giây trước`;
};

export const isValidRouter = (user, authorization) =>
  (user.role && user.role.permissions.length && user.role.permissions.includes(authorization)) ||
  user.role.permissions.includes(ALL_PERMISSIONS.MANAGE_ALL);

export const truncateText = (text, maxLength) => {
  if (!maxLength) maxLength = 50;
  if (text === undefined || text === null) return null;
  if (text.length > maxLength) {
    text = text.substr(0, maxLength) + '...';
  }
  return text;
};
