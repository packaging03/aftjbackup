import AsyncStorage from '@react-native-community/async-storage';
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import {Container, Content, Thumbnail} from 'native-base';
import {} from '../../../service';

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';

// import songs from './data';
import Controller from './Controller';
import SliderComp from './SliderComp';
import {useNavigation} from '@react-navigation/native';
import {PlayerContextProvider, usePlayerContext} from './playContext';

const {width, height} = Dimensions.get('window');

const Pod = ({}) => {
  const navigation = useNavigation();

  const playerContext = usePlayerContext();
  const art = useRef('');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
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
        setSummary(playerContextData.current.summary);
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

  useEffect(() => {
    (async () => {
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        // alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
      });
    })();

    return () => {};
  }, []);

  return (
    <Content>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={{}}>
          {art.current !== '' ? (
            // <Image source={{uri: art}} style={styles.img} />
            <Thumbnail
              square
              style={{
                width: 160,
                marginTop: 20,
                height: 160,
                borderRadius: 10,
              }}
              source={{uri: art.current}}
            />
          ) : (
            // <Text>peter good</Text>
            // <Text> playerContextData not set</Text>
            <Thumbnail
              square
              style={{
                width: 160,
                marginTop: 20,
                height: 160,
                borderRadius: 10,
              }}
              source={{uri: art.current}}
            />
          )}
        </SafeAreaView>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>

        <SliderComp />
        <Controller />
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            position: 'relative',
            top: 80,
          }}>
          <Text style={styles.icon1}>1x</Text>
          <Icon
            onPress={() => {
              navigation.navigate('SummaryPage', {
                art: art.current,
                title,
                artist,
                summary,
              });
            }}
            style={styles.icon2}
            name="dots-horizontal"
            size={35}
            color="#c5cad2"
          />
        </View>
      </SafeAreaView>
    </Content>
  );
};

export default Pod;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    // textTransform: 'capitalize',
    color: '#000',
    fontFamily: 'Nunito-Regular',
  },
  artist: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Nunito-Bold',
    // textTransform: 'capitalize',
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: height,
    maxHeight: 450,
  },
  icon1: {
    marginRight: 100,
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    color: '#c5cad2',
  },
  icon2: {
    marginLeft: 120,
  },
});
