// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../colors';
import sizes from '../sizes';
import images from '../images';

const LoginContainer = styled.div`
  background-color: ${colors.BLUE_PRIMARY};
  font-family: 'Karla';
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginPage = styled.div`
  background-color: ${colors.YELLOW_PRIMARY};
  margin: auto;
  width: 100vw;
  height: 90vh;
  padding: 2em;
  margin: 0 auto;
`;

const PageSpacer = styled.div`
  height: 3rem;
  @media screen and (max-width: 400px) {
    height: 4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 333px;
  @media screen and (max-width: 400px) {
    max-width: 187px;
  }
`;

const ConnectButton = styled.button`
  text-align: center;
  letter-spacing: 2px;
  background-color: ${colors.BLUE_PRIMARY};
  border-radius: 20px;
  padding-right: 40px;
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.75em;

  &:hover {
    opacity: 0.7;
  }
`;

const ButtonCaption = styled.p`
  margin: 4px;
  margin-top: 1em;
  font-size: 0.5em;
  color: ${colors.SECONDARY};
`;

const Title = styled.h1`
  font-size: 2.5em;
`;

const Image = styled.img`
  height: 5em;
  width: auto;
`;

export default class Login extends Component {
  render = () => {
    return (
      <LoginContainer>
        <LoginPage>
          <Image src={images.parrot_logo} />

          <PageSpacer />

          <Title
            style={{
              background: 'linear-gradient(to bottom right, #ed4545, #88e3ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            What's everyone listening to?
          </Title>

          <PageSpacer />

          <ButtonContainer>
            <ConnectButton
              onClick={() => {
                window.location = 'http://localhost:8888/login';
              }}
            >
              CONNECT
            </ConnectButton>

            <ButtonCaption>
              We connect to Spotify, then connect you to your friends.
            </ButtonCaption>
          </ButtonContainer>
        </LoginPage>
      </LoginContainer>
    );
  };
}
