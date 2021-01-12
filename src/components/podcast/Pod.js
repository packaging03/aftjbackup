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
import {useNavigation} from '@react-navigation/native';
import {PlayerContextProvider, usePlayerContext} from './playContext';

const {width, height} = Dimensions.get('window');

const Pod = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const slider = useRef(null);
  const isPlayerReady = useRef(false);
  const index = useRef(0);

  const [songs, setSong] = useState(null);
  const [noSong, setNoSong] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const playerContext = usePlayerContext();

  const isItFromUser = useRef(true);

  // for tranlating the album art

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

  const renderItem = ({index, item}) => {
    return (
      <Animated.View
        style={{
          alignItems: 'center',
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100,
              ),
            },
          ],
        }}>
        <Animated.Image
          source={{uri: item.artwork}}
          style={{width: 200, height: 200, borderRadius: 5}}
        />
      </Animated.View>
    );
  };

  const track = playerContext.currentTrack;

  return (
    <Content>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={{height: 205}}>
          <Animated.FlatList
            ref={slider}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={songs}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
          />
        </SafeAreaView>
        <View>
          <Text style={styles.title}>{playerContext.title}</Text>
          <Text style={styles.artist}>{playerContext.artist}</Text>
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
              navigation.navigate('SummaryPage');
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
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    // textTransform: 'capitalize',
    color: '#000',
    fontFamily: 'Nunito-Regular',
  },
  artist: {
    fontSize: 18,
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
