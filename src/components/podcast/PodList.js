import PodL from './PodL';
import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {Container} from 'native-base';
import TrackPlayer, {Capability} from 'react-native-track-player';

import {usePlayerContext, PlayerContextProvider} from './playContext';
import {color} from 'react-native-reanimated';

const PodList = ({navigation}) => {
  const [isReady, setIsReady] = useState(false);
  const playerContext = usePlayerContext();
  useEffect(() => {
    (async () => {
      TrackPlayer.setupPlayer().then(() => {
        setIsReady(true);
      });
      await TrackPlayer.updateOptions({
        stopWithApp: false,
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
  if (isReady === true) {
    return (
      <PlayerContextProvider>
        <Container>
          <PodL navigation={navigation} />
        </Container>
      </PlayerContextProvider>
    );
  } else {
    return (
      <Container>
        <ActivityIndicator style={{marginTop: 100}} color="gray" size={40} />
      </Container>
    );
  }
};

export default PodList;
