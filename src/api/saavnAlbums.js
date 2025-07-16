import axios from 'axios';

const BASE_URL = 'https://saavn.dev/api';

export const fetchTopAlbums = async () => {
  const res = await axios.get(`${BASE_URL}/albums`);
  return res.data.data.albums;
};

export const fetchAlbumsByLanguage = async (language) => {
  const res = await axios.get(`${BASE_URL}/albums`, {
    params: { language },
  });
  return res.data.data.albums;
};

export const fetchAlbumsByYear = async (year) => {
  const res = await axios.get(`${BASE_URL}/search/albums`, {
    params: { query: year },
  });
  return res.data.data.results;
};
