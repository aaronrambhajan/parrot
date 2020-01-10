// @flow

/**
 * All API requests and utility sorting functions.
 *
 * @todo move this all into the backend.
 * @todo create a return type default for better error-handling.
 * @todo add functionality for messaging so if we see a friend listening to
 *  a song we can interact with it in some way
 * @todo add a Spotify button so people can go to the app/songs
 * @todo split this into a FIREBASE API and a SPOTIFY API
 */

import firebase from './firebase';

/**
 * Validate a user with an access token.
 */
export const validateUser = async (accessToken) => {
  console.log('Validating user...');

  const userData = await fetch('https://api.spotify.com/v1/me', {
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

  return userData;
};

/**
 * Validate a user with an access token.
 */
export const getPlaybackState = async (accessToken) => {
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
export const startPlayback = async (accessToken, uri, position) => {
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
export const getCurrentSong = async (accessToken) => {
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

/**
 * After getting a `SpotifyUserObject` && `accessToken`, we take that data
 * and add it to `Firebase` so we have record of that user. This will not
 * add a user if they're already there.
 *
 * @todo return a boolean if the user is already there.
 */
export const addUser = async (spotifyUserObject) => {
  const usersRef = firebase.database().ref('users');
  await usersRef.child(spotifyUserObject.name).set(spotifyUserObject);
  return true;
};
