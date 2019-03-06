// @flow

import firebase from './firebase';

/**
 * Firebase Data Structure
 *
 * @todo write out the schema
 *
 * [Firebase Rules](https://firebase.google.com/docs/database/security/)
 * [Firebase Structuring Data](https://firebase.google.com/docs/database/web/structure-data)
 */

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
        timestamp: new Date().toISOString(),
      };
    })
    .catch((error) => {
      return '';
    });
};

const addUser = async (spotifyUserObject) => {
  const usersRef = firebase.database().ref('users');
  await usersRef.child(spotifyUserObject.name).set(spotifyUserObject);
};

const updateUser = async () => {
  // Instigates a listener that updates data whenever
  //  something has changed
  const usersRef = firebase.database().ref('users');

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

export { getUser, getCurrentSong, addUser };
