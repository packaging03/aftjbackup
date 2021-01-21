import React from 'react';
import RNTrackPlayer, {
  State as TrackPlayerState,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

export const PlayerContext = React.createContext({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  toCurrent: () => null,
  seekTo: () => null,
  goTo: () => null,
});

export const PlayerContextProvider = props => {
  const [playerState, setPlayerState] = React.useState(null);

  const [currentTrack, setCurrentTrack] = React.useState(null);

  React.useEffect(() => {
    const listener = RNTrackPlayer.addEventListener('playback-state', state => {
      setPlayerState(state.state);
      console.log(state.state);
    });

    toCurrent();

    return () => {
      listener.remove();
      // (async () => {
      //   try {
      //     await AsyncStorage.removeItem('fileTrack');
      //   } catch (e) {
      //     console.error(e.message);
      //   }
      // })();
    };
  }, [playerState]);

  const play = async track => {
    // we want to make sure we stop the current one to play the next one
    await RNTrackPlayer.pause();
    if (!track) {
      if (currentTrack) {
        await RNTrackPlayer.play();
      }
      return;
    }

    if (currentTrack && track.id === currentTrack.id) {
      await RNTrackPlayer.play();
      return;
    }

    if (await RNTrackPlayer.getTrack(track.id)) {
      return;
    }
    // console.log(e.message);
    await RNTrackPlayer.reset();
    await RNTrackPlayer.add([track]);
    setCurrentTrack(track);

    await RNTrackPlayer.skip(track.id);
    await RNTrackPlayer.play();
    try {
      const jsonValue = JSON.stringify(track);
      await AsyncStorage.setItem('fileTrack', jsonValue);
    } catch (e) {
      console.error(e.message);
    }
  };

  const pause = async () => {
    await RNTrackPlayer.pause();
  };
  const toCurrent = () => {
    return currentTrack;
  };

  const seekTo = async (amount = 30) => {
    const position = await RNTrackPlayer.getPosition();
    await RNTrackPlayer.seekTo(position + amount);
  };

  const goTo = async amount => {
    await RNTrackPlayer.seekTo(amount);
  };

  const value = {
    isPlaying: playerState === 3,
    isPaused: playerState === 2,
    isStopped: playerState === 1,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    toCurrent,
    play,
    seekTo,
    goTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
