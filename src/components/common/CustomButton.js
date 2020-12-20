import React from 'react';

import {TouchableOpacity, Text, View} from 'react-native';

export const  CustomButton = ({children, buttonStyle, onPress}) => (
  <View style={buttonStyle}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export const BoldCustomButton = ({children, buttonStyle, onPress}) => (
  <View style={buttonStyle}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.boldText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export const BoldCustomButtonBig = ({children, buttonStyle, onPress}) => (
  <View style={buttonStyle}>
    <TouchableOpacity onPress={onPress} style={styles.buttonbig2}>
      <Text style={styles.boldText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

export const BoldCustomButtonBigBig = ({children, buttonStyle, onPress}) => (
  <View style={buttonStyle}>
    <TouchableOpacity onPress={onPress} style={styles.buttonbig2}>
      <Text style={styles.boldText}>{children}</Text>
    </TouchableOpacity>
  </View>
);

const styles = {
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5cad2',
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    borderRadius: 6,
    shadowColor: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'row'
  },
  buttonbig: {
    alignSelf: 'center',
    backgroundColor: '#c5cad2',
    width: '81%',
    borderRadius: 6,
    shadowColor: '#c5cad2',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonbig2: {
    alignSelf: 'center',
    backgroundColor: '#c5cad2',
    width: '88%',
    borderRadius: 6,
    shadowColor: '#c5cad2',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  text: {
    alignSelf: 'center',
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  boldText: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
};

export default CustomButton;