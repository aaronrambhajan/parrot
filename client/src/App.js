// @flow

import React, { Component } from 'react';
import { Input, Label, Form, Button } from 'reactstrap';
import queryString from 'query-string';
import styled from 'styled-components';
import { validateUser, addUser, getCurrentSong } from './api';
import Social from './pages/Social';
import Login from './pages/Login';
import colors from 'colors';

const Container = styled.div``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: yellow;
  margin-bottom: 1em;
`;

const InputLabel = styled.h3`
  color: #e5e5e5;
  text-align: center;
  font-size: 0.75em;
  font-weight: bold;
`;

const ConnectButton = styled.button`
  background-color: #e4e4e4;
  box-shadow: 0px 3px 10px 0px green;

  height: 50px;
  width: 50px;
  border-radius: 50%;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px;
  }
`;

export default class App extends Component {
  state: {
    user: SpotifyUserObject,
    isLoggedIn: boolean,
    accessToken: string,
    inputText: String,
    playlistId: String,
  };

  state = {
    user: undefined,
    isLoggedIn: false,
    accessToken: '',
    inputText: '',
    data: {},
  };

  componentDidMount = async () => {
    this.getSpotifyUserToken();
  };

  doThis = async () => {
    const data = await getCurrentSong(this.state.accessToken);
    console.log(data);
    this.setState({ data });
  };

  getSpotifyUserToken = async () => {
    const parsed = queryString.parse(window.location.search);

    console.log('from token retrieval');
    console.log(parsed);

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
      this.doThis();
      return (
        <Container>
          <FormContainer>
            <p style={{ color: 'white', fontSize: '0.5em' }}>
              {this.state.accessToken}
              <br />
              {JSON.stringify(this.state.user)}
              <br />
              {this.state.data}
            </p>
          </FormContainer>
        </Container>
      );
    }
    // return <Login />;

    return (
      <Container>
        <FormContainer>
          <ConnectButton
            onClick={() => {
              // Go to the Spotify API login
              window.location = 'http://localhost:8888/login';
            }}
            type="submit"
            value="Submit"
            form="spotify"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" />
            </svg>
          </ConnectButton>
        </FormContainer>
        <InputLabel>sk¡tch</InputLabel>
        <p style={{ color: 'white' }}> hi</p>
      </Container>
    );
  };
}
