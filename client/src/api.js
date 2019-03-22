// @flow

import firebase from './firebase';

/*

    # Data flow
    ## Login
    - USER logs in
    - Store USER in FIREBASE

    ## Getting songs
    - We want to pull songs only from FIREBASE
    - Update all users

    ## Resources.
    - [Firebase Rules](https://firebase.google.com/docs/database/security/)
    - [Firebase Structuring Data](https://firebase.google.com/docs/database/web/structure-data)


    # Firebase Schema
    - We're not storing the songs, just the id's to songs for now because we
    can just get that info through Spotify. It is TBD whether or not this is
    a good strategy, but we'll try it out for now. Might be too many API req-
    uests to be useful, lol.

    ```json
      users: {
        arambhajan: {
          email: 'aaronrambhajan@gmail.com',
          image: 'https://profile-images.scdn.co/images/userprofile/default/a6cea6d3655f35c0e0266b4a2ebf6e76dda7288a',
          name: 'arambhajan'
        },
        alexandrascandolo: {
          email: 'alexandrascandolo@gmail.com',
          image: 'https://profile-images.scdn.co/images/userprofile/default/a6cea6d3655f35c0e0266b4a2ebf6e76dda7288a',
          name: 'alexandrascandolo'
        }
      },
      songs: {
        1: {
          timestamp: 1551992173816,
          user: alexandrascandolo
          song: 1 <uuid>
        }
      }
    ```
  */


// @todo: Implement functionality for 'heating' tracks up if they are played
//  by > 1 of your friends
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
  // Doesn't add user if they're already there!
  await usersRef.child(spotifyUserObject.name).set(spotifyUserObject);
};

const getCurrentSong = async (accessToken) => {
  // This endpoint returns all the song data, too
  // @todo Retrieve position in track to fill out progress button
  // @todo https://api.spotify.com/v1/me/player/recently-played [last 50 track]


  // We should probably start by getting their last 50 songs.

  return await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: 'Bearer ' + accessToken },
  })
    .then((response) => response.json())
    .then((data) => {
      const { item } = data; // ES6-like destructuring

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
        user: // user data
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

export { getUser, getCurrentSong, addUser };
