import React, {useState} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import {PasswordField} from '../components/common/Congratulation';
import Spinner from './common/Spinner';

export default function ResetPassword({navigation, route}) {
  const {useremailAd} = route.params;
  const [userPassword, setValue] = useState('');
  const [confirmPassword, setValueConfirm] = useState('');
  const [secretField, setSecretField] = useState(true);
  const [matches, setMatch] = useState(true);
  const [shortPassword, setShortPassword] = useState(false);
  var regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const [loading, setLoading] = useState('');

  function checkMatch() {
    userPassword == confirmPassword ? setMatch(!matches) : setMatch(!matches);
  }

  function checkPasswordLenght() {
    regularExpression.test(userPassword)
      ? setShortPassword(false)
      : setShortPassword(true);
  }
  function renderButton() {
    if (loading) {
      return <Spinner />;
    }

    return (
      <CustomButton
        onPress={() => {
          if (matches) {
            if (shortPassword) {
            } else {
              setLoading(true);
              fetch('https://church.aftjdigital.com/api/password_reset', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: useremailAd,
                  password: userPassword,
                  password_confirmation: confirmPassword,
                }),
              })
                .then(response => response.json())
                .then(responseJson => {
                  if (
                    responseJson['message'] ==
                    'Successful, Pasword reset completed.'
                  ) {
                    setLoading(false);
                    navigation.navigate('ResetSuccessful', {
                      userEmail: useremailAd,
                      password: userPassword,
                    });
                  } else {
                    alert(response['message']);
                  }
                })
                .catch(error => {
                  alert(error);
                });
            }
          } else {
            setMatch(true);
          }
        }}>
        Done
      </CustomButton>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter a new password to continue</Text>
      <View style={styles.input}>
        <PasswordField
          onChangeText={value => setValue(value)}
          value={userPassword}
          title="New Password"
          togleSecrete={secretField}
          onPress={() => {
            setSecretField(!secretField);
          }}
          onBlur={() => checkPasswordLenght()}
        />
        {shortPassword ? (
          <Text style={styles.noMatch}>
            Password should be at least six (6) characters long.
          </Text>
        ) : null}
      </View>

      <View style={styles.inputConfirm}>
        <PasswordField
          onChangeText={valueConfirm => setValueConfirm(valueConfirm)}
          value={confirmPassword}
          title="Confirm Password"
          togleSecrete={secretField}
          onPress={() => {
            setSecretField(!secretField);
          }}
          // onBlur={() => checkMatch()}
        />
        {matches ? null : (
          <Text style={styles.noMatch}>Passwords don't match.</Text>
        )}
      </View>

      {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: 'Nunito-Regular',
    marginTop: '10%',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 19,
    alignSelf: 'center',
  },
  input: {
    marginTop: '30%',
    marginBottom: '5%',
  },
  inputConfirm: {
    marginBottom: '20%',
  },
  noMatch: {
    color: 'red',
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 11,
    alignSelf: 'flex-start',
    marginLeft: '4%',
  },
});
