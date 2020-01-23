// @flow

import { validateUser, getCurrentSong } from './spotify';
import { saveUser, saveUserCurrentlyPlaying } from './db';

/**
 * Validate a user with an access token.
 */
const addUser = async (accessToken) => {
  const user = await validateUser(accessToken);
  // @todo check if they already exist?
  // @todo add is_playing check?
  return await saveUser(user);
};

/**
 * Validate a user with an access token.
 */
const saveThisUsersPlayObject = async (accessToken, userId) => {
  // @todo Make this run every second?
  const currentSong = await getCurrentSong(accessToken);
  await saveUserCurrentlyPlaying(userId, currentSong);
};

export { addUser };
