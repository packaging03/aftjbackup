import React, {Component} from 'react';
import CountDown from 'react-native-countdown-component';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
export default class SliderBase extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          source={require('../../assets/base.png')}
          style={styles.bimg}>
          <View style={styles.container}>
            <View style={styles.buttonContainer2}>
              <Text style={styles.counthead4}>NEXT SERVICE</Text>
              <Text style={styles.counthead3}>COUNTDOWN</Text>
            </View>
            <CountDown
              digitStyle={{
                marginLeft: 15,
              }}
              until={1000000}
              style={{
                padding: 0,
                height: '100%',
                justifyContent: 'space-around',
                width: '60%',
              }}
              digitTxtStyle={{
                color: '#FFF',
                fontFamily: 'Nunito-SemiBold',
                fontSize: 16,
                marginTop: -15,
                marginRight: 10,
              }}
              timeLabelStyle={{
                color: 'white',
                fontFamily: 'Nunito-SemiBold',
                marginBottom: 8,
                marginRight: 0,
                marginTop: -20,
                fontSize: 8,
              }}
              size={17}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};

const styles = StyleSheet.create({
  // bottom: {
  //   width: '100%',
  //   height: '7%',
  //   bottom: 0,
  //   position: 'absolute',
  // },
  bimg: {
    width: '100%',
    height: 45,
    marginLeft: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counthead: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  counthead2: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: 20,

    textAlign: 'center',
  },
  counthead3: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: 10,
    marginLeft: 10,
    textAlign: 'justify',
  },
  counthead4: {
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: 10,
    marginLeft: 10,
    marginTop: 8,
    textAlign: 'justify',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  buttonContainer: {
    flex: 1,
    marginTop: -10,
  },
  buttonContainer2: {
    flex: 2,
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: -12,
  },
});
