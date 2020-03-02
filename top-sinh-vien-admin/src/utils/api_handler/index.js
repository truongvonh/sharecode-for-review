import request from 'utils/api_handler/base_request';
import qs from 'utils/querystring';

class RequestUtils {
  constructor({ endpoint, customHeaders }) {
    this.endpoint = endpoint;
    this.requestOptions = {
      url: endpoint
    };

    if (customHeaders) {
      this.requestOptions = {
        ...this.requestOptions,
        headers: customHeaders
      };
    }
  }

  get({ query = {} }) {
    const queryString = qs.stringify(JSON.parse(JSON.stringify(query)));

    return request({
      ...this.requestOptions,
      url: `${this.endpoint}?${queryString}`,
      method: 'GET'
    });
  }

  post(payload) {
    return request({
      ...this.requestOptions,
      method: 'POST',
      data: payload
    });
  }
}

export default RequestUtils;
