import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import {Linking} from 'react-native';


const ContactDetails = ({route}) => {
  const {name, email, phone} = route.params;

  const openEmail = () => {
    Communications.email([{email}], null, null, '', '');
  };

  const openCallLog = () => {
    Linking.openURL(`tel:${phone}`)
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <Text
        style={{
          fontSize: 15,
          textTransform: 'capitalize',
          paddingLeft: 20,
          fontFamily: 'Nunito-SemiBold',
        }}>
        {name}
      </Text>
      <View style={styles.line} />
      <View style={styles.info}>
        <Image
          source={require('../assets/phone.png')}
          size={25}
          color={'#a1a1a1'}
        />
        <TouchableOpacity style={styles.effect} onPress={openCallLog}>
          <Text style={styles.text}>{phone}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Image
          source={require('../assets/mailpics.png')}
          name="email"
          size={25}
          color={'#a1a1a1'}
        />
        <TouchableOpacity style={styles.effect} onPress={openEmail}>
          <Text style={styles.text}>{email}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Image
          source={require('../assets/addressbook.png')}
          size={25}
          color={'#a1a1a1'}
        />
        <TouchableOpacity style={styles.effect} onPress={openCallLog}>
          <Text style={styles.text}>{phone}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    marginTop: 20,
  },
  text: {
    marginLeft: 15,
    fontFamily: 'Nunito-ExtraLight',
    color: '#555555',
  },

  container: {
    paddingTop: 20,

    backgroundColor: '#fff',
    height: '100%',
  },
  line: {
    width: '100%',
    height: 0.4,
    opacity: 0.3,
    backgroundColor: 'black',
    marginTop: 10,
  },

  effect: {
    alignItems: 'center',
    passding: 10,
  },
};

export default ContactDetails;
