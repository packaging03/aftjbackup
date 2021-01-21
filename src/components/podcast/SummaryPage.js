import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {Container, Content, Thumbnail} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

// import song from './data';

const SummaryPage = ({route}) => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const art = useRef('');

  const {position, duration} = useProgress();

  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  // const [playerContextData, setPlayerContextData] = useState(null);
  const playerContextData = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('fileTrack');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        // console.log(data);

        // const value = {
        //   artwork: data.artwork,
        //   artist: data.artist,
        //   title: data.title,
        // };
        playerContextData.current = data;

        // console.log(data);
      } catch (e) {
        console.error(e.message);
      }

      // console.log(playerContextData.current.artwork);

      if (playerContextData.current !== null) {
        art.current = playerContextData.current.artwork;
        console.log(art);
        setArtist(playerContextData.current.artist);
        setTitle(playerContextData.current.title);
      }
    })();

    return () => {
      (async () => {
        try {
          await AsyncStorage.removeItem('fileTrack');
        } catch (e) {
          console.error(e.message);
        }
      })();
    };
  }, [playerContextData.current]);

  return (
    <Container>
      {playerContextData !== null ? (
        <View style={{alignItems: 'center'}}>
          <Thumbnail
            square
            style={{
              width: 160,
              marginTop: 20,
              height: 160,
              borderRadius: 10,
            }}
            source={{uri: route.params.art}}
          />
          <Text style={{fontSize: 18, fontFamily: 'Nunito-Bold', top: 10}}>
            {route.params.title}
          </Text>
          <Text style={{marginTop: 35}}>
            By: <Text>{route.params.artist}</Text>
          </Text>
          <Text style={{marginTop: 10}}>
            Length: <Text>{formatTime(duration)}</Text>
          </Text>
        </View>
      ) : null}
      <View style={{marginTop: 20, marginBottom: 10}}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 5,
          }}>
          Summary
        </Text>
      </View>
      <Content>
        <Text style={{paddingLeft: 30, paddingRight: 30}}>
          {route.params.summary}
        </Text>
      </Content>
    </Container>
  );
};

export default SummaryPage;

const styles = StyleSheet.create({});
