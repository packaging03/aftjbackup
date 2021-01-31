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

export class Button extends Component {
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

export class Button2 extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{borderRadius: 5,         // Rounded border
          borderWidth: 1,           // 2 point border widht
          borderColor: '#FFFFFF',   // White colored border
          // height:40,
          paddingVertical:8,
          width: 200,
          alignSelf:'center',
          alignItems: 'center',}}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export class Button3 extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{borderRadius: 5,         // Rounded border
          borderWidth: 1,           // 2 point border widht
          borderColor: '#FFFFFF',   // White colored border
           height:80,
          paddingVertical: 8,
          width: 500,
          alignSelf:'center',
          alignItems: 'center',}}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 5,         // Rounded border
    borderWidth: 1,           // 2 point border widht
    borderColor: '#FFFFFF',   // White colored border
    //paddingHorizontal: 1,    // Horizontal padding
    paddingVertical: 5,      // Vertical padding
    width: 100,
    marginTop: 10,
    marginLeft: 70,
    margin: 5,
    alignItems: 'center',
  },

  // Button text
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    textTransform: 'capitalize'
  },
});
