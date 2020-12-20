import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './common/Spinner';
import CustomInput from '../components/common/CustomInput';
import {connect} from 'react-redux';
import {BlurView} from '@react-native-community/blur';

function ForgotPassword({navigation, user}) {
  const [userEmail, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const closeIcon = '../assets/closebtn.png';
  function renderButton() {
    if (loading) {
      return <Spinner />;
    }

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            if (userEmail == '') {
              setError('You did not enter your email address');
              setSuccess(false);
              setShowModal(!showModal);
              setLoading(false);
            } else {
              fetch('https://church.aftjdigital.com/api/forgot_password', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userEmail,
                }),
              })
                .then(response => response.json())
                .then(responseJson => {
                  if (responseJson['message'] == 'Successful') {
                    setLoading(false);
                    setSuccess(true);
                    setShowModal(!showModal);
                  } else {
                    setLoading(false);
                    setSuccess(false);
                    setShowModal(!showModal);
                  }
                })
                .catch(errors => {
                  setError(errors);
                  setSuccess(false);
                  setLoading(false);
                  setShowModal(!showModal);
                });
            }
          }}
          style={styles.button}>
          <Text style={styles.text}>Continue</Text>
          <Icon
            name="arrow-forward-outline"
            size={25}
            color="#000"
            backgroundColor="#fff"
            style={{marginTop: 5, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Enter the Email Address you used to sign up to receieve a password reset
        link.
      </Text>

      <CustomInput
        onChangeText={value => setEmail(value)}
        value={userEmail}
        title="Email Address"
        otherStyles={styles.input}
      />
      {renderButton()}

      <Modal animationType={'slide'} transparent={true} visible={showModal}>
        <BlurView
          style={{
            width: '82%',
            marginLeft: '10%',
            marginRight: '10%',
            marginTop: '60%',
            backgroundColor: '#0f0f0f',
            opacity: 0.9,
            height: '30%',
          }}>
          <View
            style={{
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#b7b7b799',
              padding: '5%',
              opacity: 0.9,
              height: '100%',
            }}>
            <Icon
              name="close"
              onPress={() => {
                setShowModal(false);
                success
                  ? navigation.navigate('VerifyCode', {
                      userEmailAd: userEmail,
                    })
                  : null;
              }}
              color={'#fff'}
              style={{position: 'absolute', top: '3%', right: '3%'}}
              size={28}
            />
            <Text style={styles.text1}>
              {success
                ? 'A Verification Code has been sent to your email address'
                : error
                ? error
                : 'The email you entered is incorrect.'}
            </Text>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(ForgotPassword);
const styles = {
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 25,
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '400',
    margin: 5,
    marginTop: '20%',
    padding: 20,
  },
  input: {
    marginTop: '20%',
    marginBottom: '15%',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '8%',
    marginRight: '8%',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },

  next: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 50,
    borderRadius: 10,
    shadowColor: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5cad2',
    width: '70%',
    height: 40,
    borderRadius: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginLeft: '15%',
    marginRight: '15%',
  },

  text: {
    color: '#000',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text1: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    marginTop: '15%',
    alignSelf: 'center',

    textAlign: 'left',
    paddingTop: '10%',
  },
};

//export default ForgotPassword;
