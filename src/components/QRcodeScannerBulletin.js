import React from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default function QRcodeScannerBulletin({navigation}) {
  const onBarCodeRead = e => {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();
    const today = date + ' ' + month + ', ' + year + '.';
    var vals = ('' + e.data).split('::');
    vals[1] == today ? navigation.navigate('Bulletin') : null;
    // Alert.alert('' + e.data);
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={onBarCodeRead}
        // ref={cam => (this.camera = cam)}
      >
        <View />
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
