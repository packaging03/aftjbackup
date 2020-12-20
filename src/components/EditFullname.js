import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import CustomButton from './common/CustomButton';
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

function EditFullname({navigation, user, accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,}) {
    
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  function update() {
    setName('');
    alert('Name update was successful!');
  }

  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <CustomButton
        onPress={() => {

          if (name != '') {
                setLoading(true);


                    return auth()
                      .currentUser.updateProfile({
                          displayName: name,
                        })
                      .then(() => {
                        fetch('https://church.aftjdigital.com/api/users/' +
                            JSON.parse(user).id,
                          {
                            method: 'PUT',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              name: name,
                              token: accessToken,
                            }),
                          })
                            .then(response => response.json())
                            .then(responseJson => {
                              
                              try {
                                  setCurrentUser(auth().currentUser);
                                  setName('');
                                  //update();

                                Toast.show('Your new name has been changed', Toast.LONG);
                                setLoading(false);
                                navigation.navigate("Profile");

                              } catch (e) {
                                alert(e);
                                setLoading(false);
                              }
                              //onLoginSuccess(setLoading);
                            })
                            .catch((error) => {
                              setLoading(false);
                          })
                       
                      })
                      .catch(error => {
                        setLoading(false);
                        switch (error.code) {
                          case 'auth/wrong-password':
                            return alert('Your Password is incorrect');

                          case 'auth/weak-password':
                            return alert(
                              'Your Password should be at least 6 characters',
                            );
                        }
                      });


                //  })
                
                } else {
                  setLoading(false);
                  alert('All fields are required');
                }
        
        }}
        >
        SAVE
      </CustomButton>
    );
  }

  return (
    <View style={styles.container}>

      
      
      
        <ImageBackground
          style={styles.image}
          source={require('../assets/user_icon.png')}
        />

        <Text
        style={styles.text}>
        Change Personal Information
      </Text>

      

      <CustomInput
            onChangeText={value => setName(value)}
            value={name}
            title="Full Name"
            otherStyles={styles.input}
          />
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

export default connect(mapStateToProps, mapDispatchToProps,)(EditFullname);
const styles = {
  container: {
    padding: 20,
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
    marginTop: '10%',
    marginBottom: '1%',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
    marginRight: 40,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  button: {
    marginTop: '10%',
    alignSelf: 'center',
    backgroundColor: '#191C52',
    width: '70%',
    // height:40,
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
    width: 50,
    height: 50,
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
  }
};

// export default ForgotPassword;
