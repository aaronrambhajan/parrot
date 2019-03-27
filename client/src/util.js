// @flow

/**
 * Utility functions for parsing data.
 */

export const sortSongs = (songData, method) => {
  // method === 'user' --> arambhajan: [{timestamp, song}] // user history
  // method === 'song' --> 120538192: [{user, timestamp}] // song heatmap

  const bySongs = {};
  const now = Date.now();

  songData.map((songPlayed) => {
    const specifier = method === 'user' ? 'song' : 'user';
    const data = { timeSince: now - songPlayed.timestamp };
    data[specifier] = songPlayed[specifier];
    const key = songPlayed[method];
    bySongs[key] = !!bySongs[key] ? [data] : bySongs[key].push(data);
  });
  return bySongs;
};
