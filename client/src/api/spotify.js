// @flow

type SpotifyUser = {
  id: string,
  name: string,
  email: string,
};

/**
 * Validate a user with an access token.
 */
const validateUser = async (accessToken) => {
  console.log('Validating user...');

  const userData = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        id: data.id,
        name: data.display_name,
        email: data.email,
      };
    })
    .catch((error) => {
      return '';
    });

  return userData;
};

/**
 * Validate a user with an access token.
 */
const getPlaybackState = async (accessToken) => {
  console.log('Retrieving playback data...');

  const playbackData = await fetch('https://api.spotify.com/v1/me/player', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      return {
        timestamp: data.timestamp,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        uri: data.context.uri,
      };
    })
    .catch((error) => {
      return '';
    });

  return playbackData;
};

/**
 * Returns the track from Spotify for what a user is listening to.
 */
const startPlayback = async (accessToken, uri, position) => {
  console.log('Starting user playback...');
  return await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + accessToken },
    body: {
      context_uri: uri,
      position_ms: position,
    },
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      return '';
    });
};

/**
 * Returns the track from Spotify for what a user is listening to.
 */
const getCurrentSong = async (accessToken) => {
  console.log('Retrieving current song...');
  return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      const { timestamp, progress_ms, is_playing, item } = data;
      const { height, url, width } = item.album.images[0]; // highest resolution by default
      const artists = item.artists.map((artist) => artist.name); // for multiple artists

      return {
        timestamp,
        progress_ms,
        is_playing,
        artists,
        song_duration: item.duration_ms,
        name: item.name,
        uri: item.uri, // to be used for requests
        image: { height, width, url },
      };
    })
    .catch((error) => {
      return '';
    });
};

export { validateUser, getPlaybackState, startPlayback, getCurrentSong };
export { SpotifyUser };
