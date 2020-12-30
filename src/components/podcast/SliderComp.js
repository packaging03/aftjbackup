import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

import TrackPlayer, {useProgress} from 'react-native-track-player';

export default function SliderComp() {
  const {position, duration} = useProgress();

  const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handleChange = val => {
    TrackPlayer.seekTo(val);
  };

  //components
  return (
    <View style={styles.container}>
      <Slider
        style={{
          width: 230,
          height: 40,
          position: 'relative',
          top: 35,
          left: 30,
        }}
        minimumValue={0}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="gray"
        onSlidingComplete={handleChange}
        maximumTrackTintColor="#c5cad2"
        thumbTintColor="#c5cad2"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timers1}>{formatTime(position)}</Text>
        <Text style={styles.timers2}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  timers1: {
    color: '#c5cad2',
    marginEnd: 118,
    fontSize: 16,
  },
  timers2: {
    color: '#c5cad2',
    marginStart: 118,
    fontSize: 16,
  },
  timeContainer: {
    top: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});
