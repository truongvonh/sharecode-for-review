import axios from 'axios';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: `${process.env.API_URL}/api`
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {

  const onSuccess = function(response) {

    // console.debug('Request Successful!', response);
    const { data: responseData } = response;
    if (responseData.code !== 0) {
      const { errorMessage, errorCode } = responseData.data;
      throw new Error(errorMessage, errorCode);
    }
    return responseData.data;
  };

  const onError = function(error) {
    // console.debug('Request Failed:', error.config);

    if (error.response) {
      // console.debug('Status:', error.response.status);
      // console.debug('Data:', error.response.data);
      // console.debug('Headers:', error.response.headers);
    } else {
      // console.debug('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client({
    ...options,
    withCredentials: true,
    credentials: 'include'
  })
    .then(onSuccess)
    .catch(onError);
};

export default request;
