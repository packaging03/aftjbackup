 import React from 'react'

 import TrackPlayer, {
  Track,State as TrackPlayerState,Event
} from 'react-native-track-player';
 interface playerContextType {
isPlaying: boolean,
    isPause: boolean,
    isStopped: boolean,
     isEmpty: boolean,
    currentTrack:Track|null,
    play:(tarck:Track)=>void,
    pause:()=>void
 }

 export const PlayerContext = React.createContext<playerContextType>( 
 {
    isPlaying: false,
    isPause: false,
    isStopped: false,
    isEmpty: true,
    currentTrack: null,
    play: () => null,
    pause: () => null,
  });
  export const PlayerContextProvider:React.FC=(props)=>{
    const [playerState,setPlayerState]=React.useState<null|TrackPlayerState >(null)

    const [currentTrack,setCurrentTrack]=React.useState<null|Track>(null)
    React.useEffect(()=>{
      const Listener = TrackPlayer.addEventListener(Event.PlaybackState,
      ({state}:{state:TrackPlayerState})
      =>{setPlayerState(state)})

      return Listener.remove()
    },[])

    const play = async(track:Track)=>{
      await TrackPlayer.add([track])
      setCurrentTrack(track)
    TrackPlayer.play( )
    }
    const pause = async()=>{
      await TrackPlayer.pause()

    }


    const value :playerContextType={
      isPlaying:playerState=== TrackPlayerState.Playing,
      isPause:playerState=== TrackPlayerState.Paused,
      isStopped:playerState===TrackPlayerState.Stopped,
      isEmpty:playerState===null,
      currentTrack,
      pause,
      play
    }
    return(
      <PlayerContext.Provider value={value}>
      {props.children}
      </PlayerContext.Provider>
    );
  }

  export const usePlayerContext = ()=>React.useContext(PlayerContext)
