import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v4';

export const getAllLaunches = async () => {
  return axios.get(`${BASE_URL}/launches`);
};
