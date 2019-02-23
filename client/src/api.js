// @flow

const getUser = async (accessToken) => {
  return await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        name: data.display_name,
        image: data.images[0].url,
        email: data.email,
      };
    })
    .catch((error) => {
      return '';
    });
};

const getCurrentSong = async (accessToken) => {
  return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        artist: data.item.artists[0].name,
        song: data.item.name,
        timestamp: data.timestamp,
      };
    })
    .catch((error) => {
      return '';
    });
};

export { getUser, getCurrentSong };
