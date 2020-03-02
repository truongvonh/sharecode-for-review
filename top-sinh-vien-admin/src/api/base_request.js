import axios from 'axios';
import { localStorageGet } from '../utils/helper';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}` || 'https://stg-api.topsinhvien.com/'
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {
  const onSuccess = function(response) {

    if(options.upload) {
      return response;
    }

    const { data: responseData } = response;
    if (responseData.code !== 0) {
      const { errorMessage, errorCode } = responseData.data;
      throw new Error(errorMessage, errorCode);
    }
    return responseData.data;
    // return { data };
  };

  const onError = function(error) {
    if (error.response) {
    } else {
    }

    return Promise.reject(error.response || error.message || error.data && error.data.message);
  };

  try {
    const token = localStorageGet(process.env.REACT_FIREBASE_TOKEN_KEY);
    options = { ...options, 'device-id': token };
  } catch(e) {
    console.log(e);
  }

  let requestOptions = { ...options };
  
  if(!options.upload) {
    requestOptions = {  
      ...options,
      withCredentials: true,
      credentials: 'include'
     };
  }

  return client(requestOptions)
    .then(onSuccess)
    .catch(onError);
};

export default request;
