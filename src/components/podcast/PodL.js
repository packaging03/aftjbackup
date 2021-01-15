import React, {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Footer,
} from 'native-base';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');

import TrackPlayer, {
  Track,
  State as TrackPlayerState,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
  STATE_BUFFERING,
  Event,
  usePlaybackState,
} from 'react-native-track-player';
import {usePlayerContext, PlayerContextProvider} from './playContext';
const data = [
  {
    title: 'Death Bed',
    artist: 'Powfu',
    artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
    id: '1',
  },
  {
    title: 'Bad Liar',
    artist: 'Imagine Dragons',
    artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
    id: '2',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
    url: 'https://samplesongs.netlify.app/Faded.mp3',
    id: '3',
  },
  {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    id: '5',
  },
  {
    title: 'Without Me',
    artist: 'Halsey',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    id: '6',
  },
];

const PodL = ({navigation}) => {
  const [songs, setSong] = useState(null);
  const [noSong, setNoSong] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [playing, setPlaying] = useState('');

  const playerContext = usePlayerContext();

  useEffect(() => {
    getSongs();
    return () => {};
  }, []);

  const getSongs = async () => {
    try {
      let res = await fetch('https://church.aftjdigital.com/api/all_podcast');
      let json = await res.json();
      if (json.status === 'success') {
        const podc = [];
        for (let index = 0; index < json.Podcasts.length; index++) {
          const pod = {};
          const element = json.Podcasts[index];
          pod['title'] = element.title;
          pod['artist'] = element.poster;
          pod['artwork'] = element.image;
          pod['url'] = element.file;
          pod['id'] = element.id;
          pod['summary'] = element.podcast_summary;
          pod['time'] = element.created_at.slice(11, -3);

          podc.push(pod);
        }

        if (podc.length != 0) {
          setSong(podc);
        } else {
          setNoSong(true);
        }
        // console.log(podc);
      }
    } catch (e) {
      console.error(e);
      if (e.message == 'Network request failed') {
        Toast.show('Internet Connection Error', Toast.LONG);
      }
    }
  };

  const getListPodcast = () => {
    if (songs !== null) {
      if (songs.length !== 0) {
        return songs.map(item => {
          return (
            <ListItem
              key={item.id}
              onPress={() =>
                playerContext.play({
                  title: item.title,
                  artwork: item.artwork,
                  id: JSON.stringify(item.id),
                  url: item.url,
                  artist: item.artist,
                  summary: item.summary,
                })
              }
              thumbnail>
              <Left>
                <Thumbnail square source={{uri: item.artwork}} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <Text
                  note
                  numberOfLines={1}
                  style={{fontFamily: 'Nunito-Bold'}}>
                  {item.artist}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>{item.time}</Text>
                </Button>
              </Right>
            </ListItem>
            // </Button>
          );
        });
      }
    }
  };

  // if (playerContext.currentTrack !== null) {
  //   return null;
  // }
  return (
    <Fragment>
      <Spinner
        visible={spinner}
        textContent={'Processing...'}
        textStyle={{color: '#fff'}}
      />
      <Content>
        {noSong === false ? (
          <List>{getListPodcast(songs)}</List>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'Nunito-Bold',
              }}>
              No podcast to display.
            </Text>
          </View>
        )}
      </Content>
      {playerContext.currentTrack !== null ? (
        <Pressable
          style={{}}
          onPress={() =>
            navigation.navigate('podcast', {
              artwork: playerContext.currentTrack.artwork,
            })
          }>
          <View
            style={{
              width,
              height: 50,
              backgroundColor: '#fff',
              elevation: 10,

              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{marginLeft: 15}}>
              <Image
                style={{width: 40, height: 40}}
                source={{uri: playerContext.currentTrack.artwork}}
              />
            </View>
            <View style={{marginRight: 90}}>
              <Text style={{fontFamily: 'Nunito-Bold'}}>
                {playerContext.currentTrack.title}
              </Text>
              <Text style={{fontFamily: 'Nunito-Regular'}}>
                {playerContext.currentTrack.artist}
              </Text>
            </View>

            {playerContext.isPlaying === true ? (
              <Icon
                name="pause"
                size={30}
                color="#000"
                style={{marginRight: 15}}
                onPress={playerContext.pause}
              />
            ) : (
              <Icon
                name="play-circle-fill"
                size={30}
                style={{marginRight: 15}}
                color="#000000"
                onPress={() => playerContext.play()}
              />
            )}

            {/* <Icon
              name="rotate-right"
              size={30}
              color="#000000"
              onPress={() => playerContext.seekTo()}
            /> */}
          </View>
        </Pressable>
      ) : null}
    </Fragment>
  );
};

export default PodL;

const styles = StyleSheet.create({});
