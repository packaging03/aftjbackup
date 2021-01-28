import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import {Congratulations} from '../components/common/Congratulation';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {
  setUserToken,
  setUser,
  setAccessToken,
} from '../redux/user/user.actions';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import Spinner from './common/Spinner';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../components/common/context';

function Resetsuccesful({navigation, route}) {
  const {userEmail, password} = route.params;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { goHome } = React.useContext(AuthContext);
  function loginUser(email, password, setError, setLoading) {
    setLoading(true);
    setError('');
    fetch('https://church.aftjdigital.com/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // console.log('USER:' + JSON.stringify(responseJson.user.id));
        setAccessToken(JSON.stringify(responseJson.access_token));
        setUser(JSON.stringify(responseJson.user));
        try {
          AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
          AsyncStorage.setItem('accessToken', responseJson.access_token);
        } catch (e) {
          alert(e);
        }
        onLoginSuccess(setLoading);
        setUserToken(2);
        goHome();
        
      })
      .catch(error => {
        alert(error);
        setError('Failed to Login');
        setLoading(false);
      });
  }

  function renderButton(loading, email, password, setError, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <CustomButton
        onPress={() => loginUser(email, password, setError, setLoading)}>
        Continue
      </CustomButton>
    );
  }
  function onLoginSuccess(setLoading) {
    setLoading(false);
    setUserToken(2);
    Toast.show('Login Successful', Toast.LONG);
  }

  return (
    <View style={styles.container}>
      <Congratulations info={'\nYour password has been\n successfully reset'} />
      {renderButton(loading, userEmail, password, setError, setLoading)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#fff',
  },
});

const mapDispatchToProps = dispatch => ({
  setUserToken: token => dispatch(setUserToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Resetsuccesful);
