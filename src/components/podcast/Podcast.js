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
  ActivityIndicator,
} from 'react-native';
import {Container, Content} from 'native-base';
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
import {PlayerContextProvider, usePlayerContext} from './playContext';
import Pod from './Pod';

const {width, height} = Dimensions.get('window');

export default function Podcast({route}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [_current, setCurrent] = useState();
  const songs = useRef(null);
  const playerContext = usePlayerContext();
  useEffect(() => {
    (async () => {
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        alwaysPauseOnInterruption: true,
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

  useEffect(() => {
    const current = route.params;
    setCurrent(current);

    return () => {};
  }, [_current]);
  // console.log(JSON.parse(_current.artist));
  console.log(_current);
  // console.log(_current.artist);
  console.log('peter top');

  // ==============================================================================

  return (
    <Container>
      <Pod prop={_current} />
    </Container>
  );
}

const styles = StyleSheet.create({});
