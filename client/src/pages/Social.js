// @flow

import React from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { getCurrentSong, addUser } from '../api';
import colors from '../colors';
import sizes from '../sizes';
import images from '../images';

/**
 * Database Processing
 *
 * (1) When the user has initially logged-in, *add user to DB*.
 *      We want to check first if the user has been added to the database, and
 *      if they have, we don't add anything.
 * (2) We query the database for all users (eventually, with permissions)
 *      and return the most recent song listened to by each user.
 * (3) Every time a song updates, we add that to the user's entry in the DB.
 *
 */

const FAKE_DATA = [
  {
    user: 'Ally Scandolo',
    pic: images.person,
    song: {
      artist: 'Beyoncé',
      song: 'Mine',
    },
  },
  {
    user: 'Charlène Hn',
    pic: images.person,
    song: {
      artist: 'Kid Francesoli',
      song: 'Moon',
    },
  },
  {
    user: 'Sidney Blais',
    pic: images.person,
    song: {
      artist: 'Empress Of',
      song: "I Don't Even Smoke",
    },
  },
  {
    user: 'Irwan Poerba',
    pic: images.person,
    song: {
      artist: 'Frank Ocean',
      song: 'White Ferrari',
    },
  },
];

const Container = styled.div`
  background-color: ${colors.BLUE_PRIMARY};
`;

const Card = styled.div`
  border-radius: 20px;
  padding: 1em;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${colors.YELLOW_PRIMARY};
  max-width: 50%;
  font-size: 0.5em;
`;

export default class Social extends React.Component {
  props: {
    token: string,
    user: object,
  };

  state: {
    items: object,
  };

  state = {
    items: [],
  };

  componentDidMount = async () => {
    // Add the user to the database
    await addUser(this.props.user);

    // Spotify API request to figure out current song
    const { artist, song, timestamp } = await getCurrentSong(this.props.token);

    // Update the component
    this.setState({ artist, song });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref('users');

    const item = {
      username: 'arambhajan',
      currentSong: {
        artist: 'Kanye West',
        song: 'POWER',
      },
    };

    itemsRef.push(item);

    this.setState({
      currentItem: '',
      username: '',
    });
  };

  render = () => {
    return (
      <Container>
        {FAKE_DATA.map((data) => {
          return <UserCard data={data} />;
        })}
      </Container>
    );
  };
}

const UserCard = ({ data }) => {
  return (
    <Card>
      <p>{data.user}</p>
      <img src={data.pic} />
      <p>
        {data.song.artist}: {data.song.song}
      </p>
    </Card>
  );
};
