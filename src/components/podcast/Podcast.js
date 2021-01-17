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

import TrackPlayer, {Capability} from 'react-native-track-player';
import Pod from './Pod';
import {PlayerContextProvider} from './playContext';

const {width, height} = Dimensions.get('window');

export default function Podcast({route}) {
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

  const curr = useRef();

  // useEffect(() => {
  //   (async () => {
  //     if (route.params) {
  //       const {artwork} = await route.params;
  //       curr.current = artwork;
  //     }
  //   })();
  //   console.log(curr.current);
  //   return () => {};
  // }, [2]);

  return (
    <PlayerContextProvider>
      <Container>
        <Pod />
      </Container>
    </PlayerContextProvider>
  );
}

const styles = StyleSheet.create({});
