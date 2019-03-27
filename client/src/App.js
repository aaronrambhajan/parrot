// @flow

import React, { Component } from 'react';
import queryString from 'query-string';
import { validateUser, addUser } from './api';
import Social from './pages/Social';
import Login from './pages/Login';

export default class App extends Component {
  state: {
    accessToken: string,
    user: SpotifyUserObject,
    isLoggedIn: boolean,
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
    // @todo develop better way of passing accessToken around

    const user: SpotifyUserObject = await validateUser(accessToken);
    const isLoggedIn: boolean = await addUser(user);
    // @todo validate success

    this.setState({
      accessToken,
      user,
      isLoggedIn,
    });
  };

  render = () => {
    if (this.state.isLoggedIn) {
      return <Social token={this.state.accessToken} user={this.state.user} />;
    }
    return <Login />;
  };
}
