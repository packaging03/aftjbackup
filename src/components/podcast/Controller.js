import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {usePlayerContext} from './playContext';

export default function Controller({}) {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused'); //paused play loading
  const playerContext = usePlayerContext();
  useEffect(() => {
    if (playerContext.isPlaying || playbackState === 3) {
      console.log(playbackState);
      setIsPlaying('playing');
    } else if (playerContext.isPause || playbackState === 2) {
      console.log(playbackState);
      setIsPlaying('paused');
    } else {
      setIsPlaying('loading');
    }
  }, [playbackState]);

  // useEffect(() => {
  //   console.log(params.current.artwork);
  //   return () => {};
  // }, []);

  const returnPlayBtn = () => {
    switch (isPlaying) {
      case 'playing':
        return <Icon color="#c5cad2" name="pause" size={30} />;
      case 'paused':
        return <Icon color="#c5cad2" name="play-circle-fill" size={30} />;
      default:
        return <ActivityIndicator size={30} color="#c5cad2" />;
    }
  };

  const onPlayPause = () => {
    if (isPlaying === 'playing') {
      playerContext.play();
    } else if (isPlaying === 'paused') {
      playerContext.pause;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => playerContext.seekTo(-10)}>
        <Icon color="#c5cad2" name="rotate-left" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {returnPlayBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => playerContext.seekTo()}>
        <Icon color="#c5cad2" name="rotate-right" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
    // bottom: 2
  },
});
