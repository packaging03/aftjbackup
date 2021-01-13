import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('remote-next', () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener('remote-previous', () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
  });
  TrackPlayer.addEventListener(Event.RemoteDuck, e => {
    // console.log(e);
    if (e.paused) {
      // if pause true we need to pause the music
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  });
  TrackPlayer.addEventListener('remote-jump-forward', async interval => {
    const postion = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(postion + interval);
  });
  TrackPlayer.addEventListener('remote-jump-backward', async interval => {
    const postion = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(postion - interval);
  });
};
