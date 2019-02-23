// @flow

import React from 'react';
import firebase from '../firebase';
import { getCurrentSong } from '../api';
import colors from '../colors';
import Gabriella from '../images/person.png';
import sizes from '../sizes';

import plus from '../images/plus.svg';
import spotify from '../images/spotify.svg';

const FAKE_DATA = [
  {
    user: 'Ally Scandolo',
    pic: 'something.png',
    song: {
      artist: 'Beyoncé',
      song: 'Mine',
    },
  },
  {
    user: 'Charlène Hn',
    pic: 'something.png',
    song: {
      artist: 'Kid Francesoli',
      song: 'Moon',
    },
  },
  {
    user: 'Sidney Blais',
    pic: 'something.png',
    song: {
      artist: 'Empress Of',
      song: "I Don't Even Smoke",
    },
  },
  {
    user: 'Irwan Poerba',
    pic: 'something.png',
    song: {
      artist: 'Frank Ocean',
      song: 'White Ferrari',
    },
  },
];

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
    // Add this user to the database
    this.addUser(this.props.user);

    const { artist, song, timestamp } = await getCurrentSong(this.props.token);
    this.setState({ artist, song });
  };

  addUser = (user) => {
    const usersRef = firebase.database().ref('users');
    usersRef.push({ user });
  };

  update = () => {
    const usersRef = firebase.database().ref('users');

    usersRef.on('value', (snapshot) => {
      const items = snapshot.val();

      console.log(items);
      const newState = [];

      for (var item in items) {
        newState.push({
          id: item,
          title: items[item].username,
          user: items[item].currentSong.artist,
        });
      }

      // this.setState({
      //   items: newState,
      // });
    });
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
      <div>
        <button onClick={this.update}>ok</button>

        <div
          style={{
            backgroundColor: colors.YELLOW_PRIMARY,
            width: '100%',
            height: 102,
            borderRadius: 20,
            padding: 20,
          }}
        >
          <div
            style={{
              fontSize: sizes.CAPTION,
              letterSpacing: '2px',
              color: 'black',
              opacity: 0.6,
            }}
          >
            AREND PELLEWEVER
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}
          >
            <div>
              <img src={Gabriella} style={{ width: 41, height: 41 }} />
            </div>

            <div>
              <h2 style={{ letterSpacing: '0.25px', fontSize: sizes.FONTS.H2 }}>
                Whiter Shade of Pale
              </h2>
              <p
                style={{
                  letterSpacing: '0.4px',
                  fontSize: sizes.FONTS.CAPTION,
                }}
              >
                Procol Harem
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'space-between',
              }}
            >
              <img src={plus} style={{ height: 21, width: 21 }} />

              <img src={spotify} style={{ height: 21, width: 21 }} />
            </div>
          </div>
        </div>

        {/* {this.state.artist && (
          <p>
            {this.state.artist} - {this.state.song}
          </p>
        )} */}

        <ol>
          {
            <ul>
              {this.state.items.map((item) => {
                return (
                  <li key={item.id}>
                    <h3>{item.title}</h3>
                    <p>brought by: {item.user}</p>
                  </li>
                );
              })}
            </ul>
          }
        </ol>
      </div>
    );
  };
}
