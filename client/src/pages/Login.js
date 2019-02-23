// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';
import logo from '../images/logo.svg';
import colors from '../colors';
import sizes from '../sizes';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${colors.BLUE_PRIMARY};
  font-family: 'Karla';
`;

const LoginPage = styled.div`
  background-color: ${colors.YELLOW_PRIMARY};
  margin: auto;
  width: 100vw;
  height: 90vh;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 50px;
  @media screen and (max-width: 400px) {
    padding: 20px;
    width: 90vw;
    border-radius: 20px;
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
`;

const ButtonCaption = styled.p`
  margin: 4px;
  margin-top: 1em;
  font-size: ${sizes.FONTS.CAPTION};
  color: ${colors.SECONDARY};
`;

const Title = styled.h1`
  font-size: ${sizes.FONTS.H1};
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
`;

export default class Login extends Component {
  render = () => {
    return (
      <LoginContainer>
        <LoginPage>
          <Image src={logo} />
          <Title
            style={{
              background: 'linear-gradient(to bottom right, #ed4545, #88e3ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            What's everyone listening to?
          </Title>

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
