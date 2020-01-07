import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const Container = styled.div`
  padding: 2em;
  margin: 0 auto;
  font-size: calc(1em + 0.5vw);
  line-height: 1.5;
  @media only screen and (min-width: 540px) {
    padding: 3em;
  }
`;

const Main = () => (
  <Container>
    <App />
  </Container>
);

ReactDOM.render(<Main />, document.getElementById('root'));
