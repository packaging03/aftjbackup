import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function CurrentLocationButton({open, cb}) {
  const cb1 = cb
    ? cb
    : () => console.log('callback function not passed to currentLocaionButton');
  return (
    <View style={[styles.container, {top: '93%'}]}>
      <SimpleLineIcons
        name="arrow-left"
        color="#fff"
        size={20}
        onPress={open}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#000',
    left: WIDTH - 45,
    // borderRadius: 50,
    // shadowRadius: ,
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
