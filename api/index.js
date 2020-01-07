// @flow

const express = require('express');
const request = require('request');
const querystring = require('query-string');
const setup = require('../setup');

const app = express();

const port = process.env.PORT || 8888;
const client_id = setup.SPOTIFY_CLIENT_ID;
const client_secret = setup.SPOTIFY_CLIENT_SECRET;
const redirect_uri = setup.SPOTIFY_REDIRECT_URI;
const frontend_uri = setup.FRONTEND_URI;

app.get('/login', function(req, res) {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope:
          'user-read-private user-read-email user-read-recently-played user-read-playback-state user-modify-playback-state',
        redirect_uri,
      })
  );
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64'),
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    // @todo this is where `refresh_token` lives
    res.redirect(frontend_uri + '?access_token=' + body.access_token);
  });
});

app.listen(port, () => {
  console.log(
    `Listening on port ${port}. Go /login to initiate authentication flow.`
  );
});
