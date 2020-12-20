import React from 'react';

import {TouchableOpacity, Text, View} from 'react-native';

const WhiteButton = ({children, buttonStyle, onPress}) => (
  <View style={{buttonStyle}}>
    <TouchableOpacity onPress={onPress} style={styles.whiteButton}>
      <Text style={styles.blueText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export const BlueButton = ({children, buttonStyle, onPress}) => (
  <View style={{buttonStyle}}>
    <TouchableOpacity onPress={onPress} style={styles.BlueButton}>
      <Text style={styles.whiteText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  whiteButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 10,
    borderColor: '#c5cad2',
    borderWidth: 2,
    shadowRadius: 10,
    shadowcolor: '#c5cad2',
    elevation: 3,
    alignItems: 'center',
    alignContent: 'center',
  },
  blueText: {
    alignSelf: 'center',
    color: '#000',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  BlueButton: {
    alignSelf: 'center',
    backgroundColor: '#c5cad2',
    width: '70%',
    borderRadius: 10,
    shadowColor: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    fontWeight:'bold',
    elevation: 4,
    shadowColor: '#ffffff',
    alignItems: 'center',
  },
  whiteText: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight:'bold',
    alignContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export default WhiteButton;
