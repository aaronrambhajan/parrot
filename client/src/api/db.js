// @flow

import firebase from '../firebase';

const db = firebase.database();

/**
 * All firebase error/success handling.
 */
const handleFirebaseResponse = (error) => {
  if (error) {
    alert('User adding failed!');
  } else {
    console.log('User saved successfully');
  }
};

/**
 * Save a user to firebase
 *
 * @param user: User object
 */
const saveUser = async (user) => {
  const users = db.ref(`users/${user.id}`);
  users.set(
    {
      name: user.name,
      email: user.email,
    },
    handleFirebaseResponse
  );
};

/**
 * Retrieve CPO for a specific user.
 *
 * Checks if the user is in the `playback` object. For a user to exist here,
 * they must be _currently_ playing; that is to say it is purely synchronous.
 *
 * @param userId: Firebase ID for a user
 */
const getUserCurrentlyPlaying = async (userId) => {
  const users = db.ref(`playback/${userId}`);

  var userId = firebase.auth().currentUser.uid;

  return users.once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  });
};

/**
 * Retrieve CPOs for all users.
 *
 * This is used to display the user list.
 *
 * @param userIds: Firebase ID for a user
 */
const getAllUsersCurrentlyPlaying = async (userIds) => {
  // If none specified, return all for now
  const IDs = !!userIds ? [] : userIds;
};

/**
 * Save a user's CPO.
 *
 * Used for update, too—it implicitly removes if already held
 *
 * @param userId: Firebase ID for user
 * @param playbackObject: Playback information
 */
const saveUserCurrentlyPlaying = async (userId, playbackObject) => {
  const playback = db.ref(`playback/${userId}`);
  playback.set(playbackObject, handleFirebaseResponse);
};

/**
 * Removes a user's CPO.
 *
 * After a track is done playing, if a user does not continue to play, we
 * remove the track from playback.
 *
 * @param userId: Firebase ID for user
 * @param playbackObject: Playback information
 */
const removeCurrentlyPlaying = async (userId) => {
  const playback = db.ref(`playback/${userId}`);
  playback.remove(handleFirebaseResponse);
};

/**
 * Save to the history object.
 *
 * @param userId: Firebase ID for user
 * @param playbackObject: Playback information
 */
const saveToPlaybackHistory = async (userId, playbackObject) => {
  // Make sure it's max 10
  const playbackHistory = db.ref(`playback_history/${userId}`);

  if (playbackHistory.size() > 10) {
    // remove one
    // replace
    return;
  }

  playback.set(playbackObject, handleFirebaseResponse);
};

const startSession = async () => {};

const addSkitcher = async () => {};

const removeSkitcher = async () => {};

const endSession = async () => {};

export {
  saveUser,
  getUserCurrentlyPlaying,
  getAllUsersCurrentlyPlaying,
  saveUserCurrentlyPlaying,
  removeCurrentlyPlaying,
  saveToPlaybackHistory,
};
