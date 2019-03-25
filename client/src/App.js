// @flow

import React, { Component } from 'react';
import queryString from 'query-string';

import { validateUser } from './api';
import firebase from './firebase';

import Social from './pages/Social';
import Login from './pages/Login';

export default class App extends Component {
  state: {
    user: {
      name: string,
    },
    items: Array,
  };

  state = {
    accessToken: '',
    user: undefined,
    isLoggedIn: false,
  };

  componentDidMount = async () => {
    this.getSpotifyUserToken();
  };

  getSpotifyUserToken = async () => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    if (!accessToken) return;

    const { name, image, email } = await validateUser(accessToken);

    this.setState({
      accessToken,
      isLoggedIn: true,
      user: {
        name,
        image,
        email,
      },
    });
  };

  render = () => {
    if (this.state.isLoggedIn) {
      return <Social token={this.state.accessToken} user={this.state.user} />;
    }

    return <Login />;
  };
}
