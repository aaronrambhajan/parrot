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
 * Validate a user with an access token. This has to be done first, before
 * any other actions can happen.
 */
export const validateUser = async (accessToken) => {
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
      // @todo do something
      return '';
    });

  return userData;
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

/**
 * When a _new_ user logs in, this route grabs the user's last 50 tracks.
 * We request this data from `Spotify`, then take that data and store it
 * in `Firebase`. We then return that data to the client.
 *
 * @todo implement
 */
export const preloadUserHistory = async (accessToken) => {
  const userSongHistory = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played',
    {
      headers: { Authorization: 'Bearer ' + accessToken },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return false;
    })
    .catch((error) => {
      return false;
    });

  return userSongHistory;
};

/**
 * Returns the track from Spotify for what a user is listening to. Then
 * adds it to Firebase. Returns this data and displays.
 *
 * @todo schedule this to pull every 5 minutes or something
 * @todo retrieve position in track to fill out progress button
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
 * `Firebase` listener that updates when something has been added to our DB.
 * Retrieve from `Spotify` if a user has listened to a new song, then
 * add it to our database, then send the data from our database.
 */
export const updateUser = async () => {
  const usersRef = firebase.database().ref('users'); // Listener
  const newState = [];

  usersRef.on('value', (snapshot) => {
    const items = snapshot.val();

    for (var item in items) {
      newState.push({
        id: item,
        title: items[item].username,
        user: items[item].currentSong.artist,
      });
    }
  });

  return newState;
};

/**
 * Query `Firebase` for all users.
 *
 * @todo implement
 *
 * @param {Array} userList
 *    List of users that the current user is following whose history we are
 *    retrieving. If `userList.length === 0`, it will return all users in
 *    `Firebase`.
 */
export const updateSongsForDisplay = async (userList) => {
  return;
};

/**
 * Query `Spotify` to get song data.
 *
 * @param {*} songId
 */
export const getSong = async (songId) => {
  return;
};

/**
 * Query `Firebase` for a user's listening history.
 *
 * @todo implement
 */
export const getUserHistory = (user) => {
  return;
};

/**
 * Query `Firebase` for a user's listening history.
 *
 * @todo implement
 */
export const getPlaylist = (playlistId, accessToken) => {
  // await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
  //   headers: { Authorization: 'Bearer ' + accessToken },
  // })

  // Check Firebase whether there's been an entry within 24 hours.
  // If there has, don't update—return the most recent copy from DB

  // If (1) there hasn't been a recent entry or (2) it doesn't exist yet in DB...
  // Call the Spotify API
  // Retrieve the data
  // Clean the data according to what we need
  // @todo
  // Take cleaned data and...
  // Save to Firebase
  // Return to code for display

  return playlistId;
};
