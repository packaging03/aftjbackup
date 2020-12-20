import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ImageBackground} from 'react-native';
import BoldCustomButtonBigBig from './common/CustomButton';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from './common/Spinner';
import CustomInput from './common/CustomInput';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../redux/user/user.actions';

function EditPassword({navigation, user, accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,}) {

  const [loading, setLoading] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newcPassword, setCNewPassword] = useState('');
  const [hidepassword, setHidePassword] = useState(true);
  const [hidenewpassword, setHideNewPassword] = useState(true);
  const [hideconfirmpassword, setHideConfirmPassword] = useState(true);

  const setPasswordVisibility = () => {
    setHidePassword(previousState => !previousState);
  };
  const setNewPasswordVisibility = () => {
    setHideNewPassword(previousState => !previousState);
  };
  const setConfirmPasswordVisibility = () => {
    setHideConfirmPassword(previousState => !previousState);
  };


  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <BoldCustomButtonBigBig
        onPress={() => {
          if (password != '' && newPassword != '' && (newPassword === newcPassword)) {
                setLoading(true);
                // const emailCred = auth.EmailAuthProvider.credential(
                //   auth().currentUser.email,
                //   password,
                // );

                  // auth()
                  // .currentUser.reauthenticateWithCredential(emailCred)
                  // .then(() => {
                  //   return auth()
                  //     .currentUser.updatePassword(newcPassword)
                  //     .then(() => {


                        fetch('https://church.aftjdigital.com/api/users/' +
                            JSON.parse(user).id,
                          {
                            method: 'PUT',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              password: newPassword,
                              token: accessToken,
                            }),
                          })
                            .then(response => response.json())
                            .then(responseJson => {
                              
                              try {
                                setCurrentUser(auth().currentUser);
                                setPassword('');
                                setNewPassword('');
                                setCNewPassword('');
                                Toast.show('Your new password has been changed', Toast.LONG);
                                setLoading(false);
                                navigation.navigate("Profile");

                              } catch (e) {
                                alert(e);
                                setLoading(false);
                              }
                            })
                            .catch((error) => {
                              Toast.show(error)
                              setLoading(false);
                          })


                  //     })
                  //     .catch(error => {
                  //       setLoading(false);
                  //       Toast.show(error.code)
                  //       switch (error.code) {
                          
                  //         case 'auth/wrong-password':
                  //           return alert('Your Password is incorrect');

                  //         case 'auth/weak-password':
                  //           return alert(
                  //             'Your Password should be at least 6 characters',
                  //           );
                  //       }
                  //     });
                  // })
                  // .catch(error => {
                  //   setLoading(false);
                  //   Toast.show(error.code)
                  //   switch (error.code) {
                      
                  //     case 'auth/wrong-password':
                  //       return alert('Your Password is incorrect');

                  //     case 'auth/weak-password':
                  //       return alert(
                  //         'Your Password should be at least 6 characters',
                  //       );
                  //   }
                  // });
                } else {
                  setLoading(false);
                  alert('Ensure all fields are properly filled and your password matched!');
                }
        
        } 
      
      }
        >
          
          CHANGE
      </BoldCustomButtonBigBig>
    );
  }

  return (
    <View style={styles.container}>

          <ImageBackground
            style={styles.image}
            source={require('../assets/password_icon.png')}
          />

          <Text
            style={styles.text}>
            Change Your Password
          </Text> 

          <View style={styles.textBoxContainer, {marginBottom: 1, marginLeft: 30, marginRight: 50, marginBottom: 10}}>
            <CustomInput
              onChangeText={value => setPassword(value)}
              value={password}
              secureTextEntry={hidepassword}
              title="Enter Current Password"
              otherStyles={styles.input}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setPasswordVisibility}>
              <Image source={(hidepassword) ? require('../assets/eyehide.png') : require('../assets/eyeopen.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.textBoxContainer, {marginBottom: 1, marginLeft: 30, marginRight: 50, marginBottom: 10}}>
            <CustomInput
              onChangeText={value => setNewPassword(value)}
              value={newPassword}
              secureTextEntry={hidenewpassword}
              title="Enter New Password"
              otherStyles={styles.input}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setNewPasswordVisibility}>
              <Image source={(hidenewpassword) ? require('../assets/eyehide.png') : require('../assets/eyeopen.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>

          <View style={styles.textBoxContainer, {marginBottom: 1, marginLeft: 30, marginRight: 50, marginBottom: 20}}>
            <CustomInput
              onChangeText={value => setCNewPassword(value)}
              value={newcPassword}
              secureTextEntry={hideconfirmpassword}
              title="Confirm New Password"
              otherStyles={styles.input}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setConfirmPasswordVisibility}>
              <Image source={(hideconfirmpassword) ? require('../assets/eyehide.png') : require('../assets/eyeopen.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>

          
      {renderButton(loading, setLoading)}

    </View>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  accessToken: state.user.accessToken,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserToken: token => dispatch(setUserToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPassword);
const styles = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    fontFamily: 'Nunito-Regular',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginTop: '10%',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 25,
    fontFamily: 'Nunito-Regular',
    fontWeight: '400',
  },
  input: {
    marginTop: '1%',
    marginBottom: '1%',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 39,
    marginRight: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 9,
  },
  button: {
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#191C52',
    width: '90%',
    borderRadius: 10,
    shadowColor: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
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
  image: {
    width: 55,
    height: 55,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 70,
    marginBottom: 8,
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    color: 'black',
    fontWeight: "bold"
  },
  textBoxContainer: {
    marginLeft: 30,
    marginRight: 60,
    marginBottom: 10,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textBox: {
    fontSize: 20,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
    borderColor: 'grey',
    borderRadius: 5,
  },
  touachableButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    width: 35,
    top:10,
    padding: 2
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '50%',
    width: '50%',
    paddingLeft:40,
  },
};