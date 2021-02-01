import axios from 'axios';

export default class BaseAPIService {
  request = (baseURL, url, method, data, timeout) => {
    return axios
      .request({
        url: baseURL + url,
        method,
        data,
        timeout,
      })
      .then((res) => res.data);
  };
}
