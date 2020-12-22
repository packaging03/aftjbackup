import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, StatusBar, Image, Alert} from 'react-native';
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
import CustomInput from './common/CustomInput';
import Button from './common/CustomButton';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';

const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;
};

const Login = ({navigation, setUser, setUserToken, setAccessToken}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   setEmail('');
  //   setPassword('');
  //   setError('');

  // });
  async function onGoogleButtonPress() {
    // Get the users ID token
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .catch(error => alert('1.' + error));
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  function renderButton(loading, email, password, setError, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <Button
        onPress={() => loginUser(email, password, setError, setLoading)}
        buttonStyle={{marginTop: 50, width: '100%', alignSelf: 'center'}}>
        Login
      </Button>
    );
  }

  const setData = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
      await AsyncStorage.setItem('accessToken', responseJson.access_token);
    } catch (e) {
      alert(e);
    }
  };

  function loginUser(email, password, setError, setLoading) {
    // const {signIn} = React.useContext(AuthContext);

    setLoading(true);
    setError('');
    if (email == '' || password == '') {
      setError('All Fields are required');
      setLoading(false);
    } else {
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
          console.log('USER:' + JSON.stringify(responseJson.user.id));
          setAccessToken(JSON.stringify(responseJson.access_token));
          setUser(JSON.stringify(responseJson.user));
          try {
            AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
            AsyncStorage.setItem('accessToken', responseJson.access_token);
          } catch (e) {
            alert(e);
          }
          onLoginSuccess(setLoading);
        })
        .catch(error => {
          alert(error);
          setError('Failed to Login');
          setLoading(false);
        });
    }
  }

  function onLoginSuccess(setLoading) {
    setLoading(false);
    setUserToken(2);
    Toast.show('Login Successful', Toast.LONG);
  }

  return (
    <View style={styles.login}>
      <StatusBar backgroundColor="transparent" translucent />
      <Text
        style={{
          fontWeight: 'bold',
          alignSelf: 'flex-start',
          fontSize: 20,
        }}>
        {' '}
        Welcome Back,
      </Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 13,
          letterSpacing: 1,
          alignSelf: 'flex-start',
        }}>
        Login to your account
      </Text>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            onFacebookButtonPress()
              .then(() => {
                setUserToken(2);
                // alert('Signed in with Facebook!')
                // alert(auth().currentUser.photoURL+'1');
              })
              .catch(error => {
                switch (error.code) {
                  case 'auth/account-exists-with-different-credential':
                    setError('An account already exists with this email');
                    break;

                  case 'net::ERR_NAME_NOT_RESOLVED':
                    alert('Poor Internet Connection');
                    break;
                  default:
                    alert('1. ' + error);
                    break;
                }
              })
          }>
          <Image 
                style={{
                    width:30, height:30,
                    marginLeft:20,
                    marginRight:20,
                    marginTop:5, 
                    
                marginBottom:5}} source={require('../assets/fb-logo.png')}/>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#c8c8c8',
            height: '100%',
            width: 1,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress()
              .then(() => setUserToken(2))
              .catch(error => alert(error))
          }>
           <Image
                 style={{width:20, height:20,marginTop:8, 
                    marginLeft:20,
                    marginRight:20,
                    marginTop:5, marginBottom:5}} source={require('../assets/google-logo.png')}/>
        </TouchableOpacity>
      </View>

      <CustomInput
        onChangeText={value => setEmail(value)}
        value={email}
        title="Email Address"
        otherStyles={styles.input}
      />
      <CustomInput
        onChangeText={value => setPassword(value)}
        value={password}
        title="Password"
        otherStyles={styles.input}
        secureTextEntry
      />

      <Text
        style={{
          alignSelf: 'flex-end',
          color: '#000',
          fontSize: 15,
        }}
        onPress={() => navigation.navigate('Forgot Password')}>
        Forgot Password?
      </Text>
      {renderButton(loading, email, password, setError, setLoading)}
      <Text style={styles.error}>{error}</Text>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Text style={{color: '#000'}}>Not a User? </Text>
        <Text
          onPress={() => {
            setEmail('');
            setError('');
            setLoading(false);
            setPassword('');
            navigation.navigate('SignUp');
          }}
          style={{
            color: '#000',
            fontWeight: 'bold',
          }}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = {
  error: {
    color: 'red',
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 5,
    alignSelf: 'center',
  },
  login: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    height: '100%',
    alignItems: 'center',
  },
  input: {
    marginTop: 20,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    marginTop: 20,
  },
};

const mapDispatchToProps = dispatch => ({
  setUserToken: token => dispatch(setUserToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
