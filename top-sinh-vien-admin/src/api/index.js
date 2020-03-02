import request from './base_request';
import qs from './../utils/querystring';

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

  put(payload) {
    return request({
      ...this.requestOptions,
      method: 'PUT',
      data: payload
    });
  }

  delete(payload) {
    return request({
      ...this.requestOptions,
      method: 'DELETE',
      data: payload
    });
  }

  async upload(files, type) {
    const presignFiles = files.map(file => ({
      file_type: file.type
    }));

    const getPresignedUrl = async () => {
      return await request({
        url: 'apiV1/common/presigned-url',
        method: 'POST',
        data: {
          photos: presignFiles,
          type
        }
      });
    };

    const preSignedUrls = await getPresignedUrl();

    const promises = preSignedUrls.map((preSignedUrl, index) => new Promise(async (resolve, reject) => {
      try {
        const file = files[index];
        const uploader = async (uploadUrl) => {
          await request({
            url: uploadUrl,
            method: 'PUT',
            headers: {
              'content-type': file.type
            },
            data: file,
            withCredentials: undefined,
            credentials: undefined,
            upload: true
          });

          return uploadUrl.split('?')[0];
        };

        const [thumb, origin] = await Promise.all([
          uploader(preSignedUrl.thumb),
          uploader(preSignedUrl.origin)
        ]);

        resolve({ thumb, origin });
      } catch (e) {
        reject(e);
      }
    }));

    const result = await Promise.all(promises);
    return result;
  }
}

export default RequestUtils;
