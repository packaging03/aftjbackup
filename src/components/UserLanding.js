import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import WhiteButton, {BlueButton} from './common/WhiteButton';

export default function UserLanding({navigation}) {
  function renderWhiteButton() {
    return (
      <WhiteButton
        onPress={() => navigation.navigate('Login')}
        buttonStyle={{
          width: '100%',
          flex: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        Log In
      </WhiteButton>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', hight: '100%'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <Text style={styles.text}>Let's get started</Text>
        <Text style={styles.text1}>Choose an option to sign up or log in</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          width: '100%',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        <BlueButton
        onPress={() => navigation.navigate('SignUp')}
        buttonStyle={{
          width: '100%',
          flex: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        Sign Up
      </BlueButton>
      </View>
      <View style={{marginBottom: '100%'}}>{renderWhiteButton()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
    marginTop: '30%',
  },
  text: {
    alignSelf: 'center',
    color: '#000000',
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    paddingTop: 10,
  },
  text1: {
    alignSelf: 'center',
    color: '#676464',
    marginTop: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  BlueButton: {
    alignSelf: 'center',
    backgroundColor: '#c5cad2',
    width: '70%',
    borderRadius: 10,
    fontSize: 30,
    fontWeight: 'bold',
    elevation: 2,
    alignItems: 'center',
  },
  whiteText: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 22,
    alignContent: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
