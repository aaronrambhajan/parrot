# sk¡tch

`sk¡tch v0.1.0` gives Spotify users the ability to follow their friends' listening queue in real time.

## Technologies

This web application is (currently) built using React, Node, and Firebase. Currently, all API calls are in the front-end, and Spotify API polling is done with `setTimeout()`. This, of course, is not great practise, so as I continue to build it out I'm hoping to develop a more extensive Node backend. I have designed this system for the use of a few friends—this solution, in its current state, is not remotely scalable.

## Schema

This database schema is modelled for the [Firebase Realtime database](https://firebase.google.com/docs/database/web/start).

### `users`

All users registered for `sk¡tch`.

```json
{
  "users": {
    "arambhajan": {
      "id": 1,
      "name": "Aaron Rambhajan",
      "email": "aaronrambhajan@gmail.com"
    },
    "kateviloria": {
      "id": 2,
      "name": "Kate Viloria",
      "email": "kateviloria@outlook.com"
    },
    "allyfrancesca": {
      "id": 3,
      "name": "Alexandra Scandolo",
      "email": "alexandrascandolo@gmail.com"
    }
  }
}
```

### `playback`

Users currently playing a song can be found here.

```json
{
  "playback": {
    "arambhajan": {
      "uri": "spotify:track:3I0FBDc1c1BLNtXWKVjmFg",
      "progress_ms": 92304,
      "timestamp": 1930493058204
    }
  }
}
```

### `sessions`

All active `sk¡tch` sessions.

```json
{
  "sessions": [
    {
      "id": 1,
      "driver": 1,
      "duration": 560,
      "start": 192583945839,
      "skitchers": [
        {
          "id": 2,
          "start": 135,
          "end": null
        },
        {
          "id": 3,
          "start": 2,
          "end": 500
        }
      ]
    }
  ]
}
```

### `playback_history`

After a user has finished playback on a song, a 10-song backlog is kept.

```json
{
  "playback_history": {
    "arambhajan": [
      {
        "uri": "spotify:track:3I0FBDc1c1BLNtXWKVjmFg",
        "timestamp": 1930493058204
      }
    ]
  }
}
```
