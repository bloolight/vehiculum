import BaseAPIService from './baseAPIService';

class JokeService extends BaseAPIService {
  pullCategories = () => {
    return this.requestJokeAPI('/categories', 'GET');
  };

  searchByQuery = ({ query }) => {
    return this.requestJokeAPI(`/search?query=${query}`, 'GET');
  };
}
export default JokeService;
