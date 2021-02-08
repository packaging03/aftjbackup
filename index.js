/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import TrackPlayer from 'react-native-track-player';
import {app} from 'firebase';
const Application = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Application);
// TrackPlayer.registerPlaybackService(() => require('./service'));
