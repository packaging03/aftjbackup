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

import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  usePlaybackState,
  TrackPlayerEvents,
  STATE_PLAYING,
  Event,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import songs from './data';
import Controller from './Controller';
import SliderComp from './SliderComp';

const {width, height} = Dimensions.get('window');

// const events = [
//   TrackPlayerEvents.PLAYBACK_STATE,
//   TrackPlayerEvents.PLAYBACK_ERROR
// ];

const Podcast = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const isPlayerReady = useRef(false);
  const index = useRef(0);

  const [songIndex, setSongIndex] = useState(0);
  const [songs, setSong] = useState([
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
  ]);

  const isItFromUser = useRef(true);

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;
  const playbackState = usePlaybackState();

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({value}) => {
      const val = Math.round(value / width);

      setSongIndex(val);
    });

    TrackPlayer.setupPlayer().then(async () => {
      // The player is ready to be used
      console.log('Player ready');
      // add the array of songs in the playlist
      // TrackPlayer.destroy();

      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      // TrackPlayer.play();
      isPlayerReady.current = true;

      const data = 'playing';
      await AsyncStorage.setItem('isSetPlay', data, e => {
        console.log(e);
        console.log(data + ' peter');
      });

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      //add listener on track change
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async e => {
        console.log('podcast ended', e);

        const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

        console.log('track id', trackId, 'index', index.current);

        if (trackId !== index.current) {
          setSongIndex(trackId);
          isItFromUser.current = false;

          if (trackId > index.current) {
            goNext();
          } else {
            goPrv();
          }
          setTimeout(() => {
            isItFromUser.current = true;
          }, 200);
        }

        // isPlayerReady.current = true;
      });

      //monitor intterupt when other apps start playing music
      TrackPlayer.addEventListener(Event.RemoteDuck, e => {
        // console.log(e);
        if (e.paused) {
          // if pause true we need to pause the music
          TrackPlayer.pause();
        } else {
          TrackPlayer.play();
        }
      });
    });

    return () => {
      scrollX.removeAllListeners();
      // TrackPlayer.destroy();

      // exitPlayer();
    };
  }, []);

  // change the song when index changes
  useEffect(() => {
    if (isPlayerReady.current && isItFromUser.current) {
      TrackPlayer.skip(songs[songIndex].id)
        .then(_ => {
          console.log('changed track');
        })
        .catch(e => console.log('error in changing track ', e));
    }
    index.current = songIndex;
  }, [songIndex]);

  const exitPlayer = async () => {
    try {
      await TrackPlayer.stop();
    } catch (error) {
      console.error('exitPlayer', error);
    }
  };

  const goNext = async () => {
    slider.current.scrollToOffset({
      offset: (index.current + 1) * width,
    });

    await TrackPlayer.play();
  };
  const goPrv = async () => {
    slider.current.scrollToOffset({
      offset: (index.current - 1) * width,
    });

    await TrackPlayer.play();
  };

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

  return (
    <View style={{backgroundColor: '#fff', height}}>
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
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
          />
        </SafeAreaView>
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>

        <SliderComp />
        <Controller onNext={goNext} onPrv={goPrv} />
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
    </View>
  );
};

export default Podcast;
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
