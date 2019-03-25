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
          name: 'arambhajan',
          following: ['alexandrascandolo', 'irwanpoerba'],
        },
        alexandrascandolo: {
          email: 'alexandrascandolo@gmail.com',
          image: 'https://profile-images.scdn.co/images/userprofile/default/a6cea6d3655f35c0e0266b4a2ebf6e76dda7288a',
          name: 'alexandrascandolo',
          following: ['aaronrambhajan', 'irwanpoerba']
        }
      },
      songs: [ // most recent first
        {
          timestamp: 1551992173816,
          user: alexandrascandolo,
          song: 23491023
        }
      ]
    ```
  */


const sortSongs = (songData, method) => {
  // method === 'user' --> arambhajan: [{timestamp, song}] // user history
  // method === 'song' --> 120538192: [{user, timestamp}] // song heatmap

  const bySongs = {};
  const now = Date.now();

  songData.map((songPlayed) => {
    const specifier = method === 'user' ? 'song' : 'user';
    const data = {timeSince: now - songPlayed.timestamp};
    data[specifier] = songPlayed[specifier];
    const key = songPlayed[method];
    bySongs[key] = !!bySongs[key] ? [data] : bySongs[key].push(data);
  })
  return bySongs;
}

const getUserHistory = (user) => {
  // query native DB for our history of it
  return;
}


/**
 * Validate a user with an access token.
 * This has to be done first, before any other actions can happen.
 */
const validateUser = async (accessToken) => {
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

/**
 * After validation, add a user to our database.
 */
const addUser = async (spotifyUserObject) => {
  const usersRef = firebase.database().ref('users');
  // Doesn't add user if they're already there!
  await usersRef.child(spotifyUserObject.name).set(spotifyUserObject);

  // return {
  //   type: 'success',
  // }
};

// @todo
const preloadUserHistory = async (accessToken) => {
  // When a user logs in and we don't have any data, we take their
  // last 50 tracks
  // https://api.spotify.com/v1/me/player/recently-played [last 50 track]

  return;
}

const getCurrentSong = async (accessToken) => {
  // This endpoint returns all the song data, too
  // @todo Retrieve position in track to fill out progress button

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

const updateUser = async () => {
  // Retrieve from Spotify API if a user has listened to a new song, then
  // add it to our database, then send the data from our databas
  // Parrot -> requests -> Spotify
  // Parrot -> updates -> Firebase
  // Parrot -> queries -> Firebase

  const usersRef = firebase.database().ref('users'); // Listener that updates data
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
