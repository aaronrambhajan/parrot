// @flow

/**
 * All API requests and utility sorting functions.
 *
 * @todo move this all into the backend.
 * @todo create a return type default for better error-handling.
 * @todo add functionality for messaging so if we see a friend listening to
 *  a song we can interact with it in some way
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
  const userSongHistory =
   await fetch('https://api.spotify.com/v1/me/player/recently-played', {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then((response) => response.json())
  .then((data) => {
    return false;
  }).catch((error) => {
    return false;
  })

  return userSongHistory;
}

/**
 * Returns the track from `Spotify` for what a user is listening to. Then
 * adds it to `Firebase`. Returns this data and displays.
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
      const { item } = data;

      const displayData = {
        songUrl: item.external_urls.spotify,
        songName: item.name,
        artistList: item.artists.map((artist) => {
          return artist.name; // artist *names* only
        }),
        imageLink: item.album.images[0], // largest image only
      };

      // We're not going to store entire song data, just the `id` such that
      //  when we want a song, we just query Spotify (for now)
      const storedData = {
        songId: item.id,
        timestamp: data.timestamp,
        user:
      };


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
 * Query `Firebase` for a user's listening history.
 *
 * @todo implement
 */
export const getUserHistory = (user) => {
  return;
};
