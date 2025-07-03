import axios from 'axios';

const BASE_URL = 'https://saavn.dev/api';

export const searchSongs = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/songs`, {
    params: { query }
  });
  return res.data.data.results;
};

export const getSongById = async (id) => {
  const res = await axios.get(`${BASE_URL}/songs`, {
    params: { ids: id }
  });
  return res.data.data[0];
};
