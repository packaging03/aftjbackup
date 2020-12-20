/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  TouchableOpacity, // Pressable container
  View              // Container component
} from 'react-native';

export default class CustumButton extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5cad2',
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    borderRadius: 6,
    shadowColor: '#c5cad2',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'row'
  },
  // Button text
  text: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
  },
});
