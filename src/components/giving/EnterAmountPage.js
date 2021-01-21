import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import {Container, Header, Body, Title, Right, Left, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

const EnterAmountPage = ({navigation}) => {
  return (
    <Container>
      <View style={styles.secPicker}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            fontFamily: 'Nunito-Regular',
          }}>
          Enter Amount
        </Text>
        {/* ============================================================= */}

        <TextInput
          placeholder="Enter amount"
          style={styles.textInput}
          keyboardType="number-pad"
        />

        {/* ======================================== */}
        <Pressable
          style={styles.pay}
          onPress={() => navigation.navigate('paymentGateway')}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
              textAlign: 'center',
            }}>
            Continue
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};
// church.aftjdigital.com\/api\/prayerrequest

export default EnterAmountPage;

const styles = StyleSheet.create({
  secPicker: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#133',
    borderRadius: 6,
  },
  pay: {
    backgroundColor: '#c5cad2',
    width: 300,
    height: 50,
    elevation: 7,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 5,
  },
  textInput: {
    fontSize: 18,
    // backgroundColor: '#133',
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#c5cad2',
    borderRadius: 8,
  },
});
