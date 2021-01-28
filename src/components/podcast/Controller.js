import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {usePlayerContext} from './playContext';

export default function Controller({}) {
  const playbackState = usePlaybackState();
  const playerContext = usePlayerContext();
  // const [playerContextData, setPlayerContextData] = useState();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('fileTrack');
  //       const data = jsonValue != null ? JSON.parse(jsonValue) : null;
  //       setPlayerContextData(data);
  //       // console.log(data);
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   })();
  // }, []);

  // console.log(playerContextData);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
        <Icon color="#c5cad2" name="rotate-left" size={40} />
      </TouchableOpacity>
      {playbackState == 3 ? (
        <Icon
          name="pause-circle-filled"
          size={40}
          color="#c5cad2"
          onPress={() => TrackPlayer.pause()}
        />
      ) : (
        <Icon
          name="play-circle-fill"
          size={40}
          color="#c5cad2"
          onPress={() => TrackPlayer.play()}
        />
      )}

      <TouchableOpacity onPress={() => playerContext.seekTo()}>
        <Icon color="#c5cad2" name="rotate-right" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    marginTop: 30,
  },
});
