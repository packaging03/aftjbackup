import React, {Component,useEffect} from 'react';
import TrackPlayer, {
  Track,State as TrackPlayerState,Event
} from 'react-native-track-player';

export const PlayerContext = React.createContext({
  isPlaying: false,
  isPause: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  play: () => null,
  pause: () => null,
});

export const playerContextprovider = props => {
   const [currentTrack,setCurrentTrack]=React.useState(null)
  useEffect(()=>{
      const Listener = TrackPlayer.addEventListener(Event.PlaybackState,
      (TrackPlayerState)
      =>{setPlayerState(TrackPlayerState)})

      return Listener.remove()
    },[])

  

    const play = async(track)=>{
      await TrackPlayer.add([track])
      setCurrentTrack(track)
    TrackPlayer.play( )
    }
    const pause = async()=>{
      await TrackPlayer.pause()

    } 

    
  const value = {
    isPlaying: playerState === TrackPlayerState.Playing,
    isPause: playerState === TrackPlayerState.Paused,
    isStopped: playerState === TrackPlayerState.Stopped,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
  };
  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

 export const usePlayerContext = ()=>React.useContext(PlayerContext)