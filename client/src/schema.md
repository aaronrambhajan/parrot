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
  can just get that info through Spotify.
- When a user is

```json
  "users": {
    "arambhajan": {
      "email": "aaronrambhajan@gmail.com",
      "image": "https://profile-images.scdn.co/images/userprofile/default/a6cea6d3655f35c0e0266b4a2ebf6e76dda7288a",
      "name": "arambhajan",
      "following": ["alexandrascandolo", "irwanpoerba"],
    },
    "alexandrascandolo": {
      "email": "alexandrascandolo@gmail.com",
      "image": "https://profile-images.scdn.co/images/userprofile/default/a6cea6d3655f35c0e0266b4a2ebf6e76dda7288a",
      "name": "alexandrascandolo",
      "following": ["aaronrambhajan", "irwanpoerba"]
    }
  },
  "songs": [
    {
      "timestamp": 1551992173816,
      "user": "alexandrascandolo",
      "song": 23491023
    }
  ]
```
