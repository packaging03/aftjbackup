import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Spinner from '../components/common/Spinner';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';

import Icon from 'react-native-vector-icons/Ionicons';

const VerifyCode = ({navigation, route}) => {
  const {userEmailAd} = route.params;
  const [ditigt1, setDigit1] = useState('');
  const [ditigt2, setDigit2] = useState('');

  const [ditigt3, setDigit3] = useState('');
  const [ditigt4, setDigit4] = useState('');
  const [loading, setLoading] = useState('');
  const [ditigt1Focus, setDigit1Focus] = useState(false);
  const [ditigt2Focus, setDigit2Focus] = useState('');
  const [ditigt3Focus, setDigit3Focus] = useState('');
  const [ditigt4Focus, setDigit4Focus] = useState('');

  function resendCode() {
    fetch('https://church.aftjdigital.com/api/forgot_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmailAd,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson['message'] == 'Successful') {
          alert(
            'A reset code has been sent to your email address ' + userEmailAd,
          );
        } else {
          console.log(responseJson);
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  function renderButton() {
    if (loading) {
      return <Spinner />;
    }

    function verifyCodeContinue() {
      setLoading(true);
      fetch('https://church.aftjdigital.com/api/church-projects', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmailAd,
          otp_token: '' + ditigt1 + ditigt2 + ditigt3 + ditigt4,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson['message'] == 'Successful') {
          } else {
            setLoading(false);
            navigation.navigate('ResetPassword', {useremailAd: userEmailAd});
          }
        })
        .catch(error => {
          alert(error);
        });
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => verifyCodeContinue()}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignSelf: 'center',
            width: '50%',
            alignContent: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              alignSelf: 'center',
              fontFamily: 'Nunito-SemiBold',
              //   fontWeight: 600,
            }}>
            Continue
          </Text>
          <Icon name="md-arrow-forward" color={'black'} size={25} />
        </View>
      </TouchableOpacity>
    );
  }

  function renderCircle() {
    return (
      <View
        style={{
          backgroundColor: '#a2a2a2',
          width: 7.5,
          height: 7.5,
          position: 'absolute',
          top: '100%',
          marginTop: -30,
          borderRadius: 3.75,
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Enter the verification code sent to your Email Address
      </Text>

      <View style={styles.inputs}>
        <View style={styles.card}>
          <TextInput
            style={{fontSize: 26}}
            maxLength={1}
            onChangeText={text => setDigit1(text)}
            value={ditigt1}
            keyboardType="number-pad"
            onFocus={() => setDigit1Focus(!ditigt1Focus)}
          />
          {ditigt1Focus ? null : renderCircle()}
        </View>
        <View style={styles.card}>
          <TextInput
            style={{fontSize: 26}}
            maxLength={1}
            onChangeText={text => setDigit2(text)}
            value={ditigt2}
            keyboardType="number-pad"
            onFocus={() => setDigit2Focus(!ditigt2Focus)}
          />
          {ditigt2Focus ? null : renderCircle()}
        </View>
        <View style={styles.card}>
          <TextInput
            style={{fontSize: 26}}
            maxLength={1}
            onChangeText={text => setDigit3(text)}
            value={ditigt3}
            keyboardType="number-pad"
            onFocus={() => setDigit3Focus(!ditigt3Focus)}
          />
          {ditigt3Focus ? null : renderCircle()}
        </View>
        <View style={styles.card}>
          <TextInput
            style={{fontSize: 26}}
            maxLength={1}
            onChangeText={text => setDigit4(text)}
            value={ditigt4}
            keyboardType="number-pad"
            onFocus={() => setDigit4Focus(!ditigt4Focus)}
          />
          {ditigt4Focus ? null : renderCircle()}
        </View>
      </View>

      {renderButton()}

      <View style={styles.resend}>
        <Text style={{fontFamily: 'Nunito-Regular', fontSize: 14}}>
          Didn’t see the code?
        </Text>
        <TouchableOpacity onPress={() => resendCode()}>
          <Text
            style={{
              color: '#000',
              fontFamily: 'Nunito-Bold',
              fontSize: 14,
              marginLeft: 5,
            }}>
            RESEND
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: 40,
    display: 'flex',
    backgroundColor: '#fff',
    height: '100%',

    // flexDirection:'column',
  },
  header: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 2,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    top: 100,
    left: 3,
  },
  resend: {
    top: 166,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    display: 'flex',
    // backgroundColor:'red',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: '20%',
    justifyContent: 'space-around',
  },
  card: {
    top: 116,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    // alignSelf: 'center',
    paddingLeft: 3,
    paddingRight: 5,
    borderRadius: 5,
    borderColor: '#C4C4C4',
    borderBottomWidth: 0,
    shadowColor: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
    // marginTop: 20,
  },
  button: {
    marginTop: '20%',
    alignSelf: 'center',
    backgroundColor: '#C5CAD2',
    width: 264,
    // height:40,
    borderRadius: 10,
    shadowColor: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    top: 136,
  },
};

export default VerifyCode;
