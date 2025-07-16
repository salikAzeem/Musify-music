import axios from 'axios';

export const searchDeezerSongs = async (query) => {
  try {
    const res = await axios.get('https://deezerdevs-deezer.p.rapidapi.com/search', {
      params: { q: query },
      headers: {
        'X-RapidAPI-Key': 'fea182a563mshf0c4036727cf6a3p17985djsn5f1164b51a5e',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });

    return res.data.data; // List of Deezer tracks
  } catch (err) {
    console.error('Deezer API Error:', err);
    return [];
  }
};

export const normalizeDeezerSong = (track) => ({
  id: `deezer-${track.id}`,
  song: track.title,
  primaryArtists: track.artist.name,
  image: track.album.cover_medium,
  media_url: track.preview, // 30 sec preview
  source: 'deezer'
});
