import axios from 'axios';
import config from '../config';

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

  requestJokeAPI = (url, method, data, timeout = 0) => {
    return this.request(config.jokeAPIBase || '', url, method, data, timeout);
  };
}
