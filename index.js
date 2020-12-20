/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import TrackPlayer from 'react-native-track-player';
import { app } from 'firebase';
const Application = () =>{
    return(
        <Provider store={store}>
             <App/>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Application);
// TrackPlayer.registerEventHandler(() => {
//     return async (data) => {
//       if (data.type == 'playback-state') {
//         // Update the UI with the new state
//       } else if (data.type == 'remote-play') {
//         // The play button was pressed, we can forward this command to the player using
//         TrackPlayer.play();
//       } else if (data.type == 'remote-stop') {
//         // The stop button was pressed, we can stop the player
//         TrackPlayer.stop();
//       } else if (data.type == 'remote-pause') {
//         // The play button was pressed, we can forward this command to the player using
//         TrackPlayer.pause();
//       }
//     };
//   });
  TrackPlayer.registerPlaybackService(() => require('./service') );
