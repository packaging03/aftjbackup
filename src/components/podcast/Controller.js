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

export default function Controller({onNext, onPrv}) {
  const playbackState = usePlaybackState();
  const [isPlaying, setIsPlaying] = useState('paused'); //paused play loading

  useEffect(() => {
    // console.log('Player State', playbackState);

    //set the player state
    if (playbackState === 'playing' || playbackState === 3) {
      setIsPlaying('playing');
    } else if (playbackState === 'paused' || playbackState === 2) {
      setIsPlaying('paused');
    } else {
      setIsPlaying('loading');
    }
  }, [playbackState]);

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
      TrackPlayer.pause();
    } else if (isPlaying === 'paused') {
      TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <Icon color="#c5cad2" name="skip-previous" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
        {returnPlayBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icon color="#c5cad2" name="skip-next" size={30} />
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
