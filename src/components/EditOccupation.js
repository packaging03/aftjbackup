import React, {useState} from 'react';
import {View, Text, ImageBackground, Image, TextInput, Alert} from 'react-native';
import {BoldCustomButtonBig} from './common/CustomButton';
import auth from '@react-native-firebase/auth';
import Spinner from './common/Spinner';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import CustomInput from './common/CustomInput';

import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../redux/user/user.actions';
import { Button } from 'react-native-paper';

function EditOccupation({navigation, user, accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,}) {
    
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [occupation, setOccupation] = useState('');
 
  
  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <BoldCustomButtonBig
        onPress={() => {

          if (occupation != '') {
                setLoading(true);

                    return auth()
                      .currentUser.updateProfile({
                          occupation: occupation,
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
                              occupation: occupation,
                              token: accessToken,
                            }),
                          })
                            .then(response => response.json())
                            .then(responseJson => {
                              
                              try {
                                  setCurrentUser(auth().currentUser);
                                  setOccupation('');

                                Toast.show('Occupation successfully updated!', Toast.LONG);
                                setLoading(false);

                              } catch (e) {
                                alert(e);
                                setLoading(false);
                              }
                            })
                            .catch((error) => {
                              setLoading(false);
                          })
                       
                      })
                      .catch(error => {
                        setLoading(false);
                        return alert(" Error Occurred: " + error.code);
                      });
                
                } else { 
                  setLoading(false);
                  alert('All fields are required');
                }
        
        }}
        >
        SAVE
      </BoldCustomButtonBig>
    );
  }

  return (
    <View style={styles.container}>

              <ImageBackground
                
                style={styles.image}
                source={require('../assets/employee.png')}
              />

              <Text
                style={styles.text}>
                Enter New Occupation
              </Text>
              <View style={styles.SectionStyle}>
              <TextInput
                  style={styles.text}
                  value={occupation}
                  onChangeText={value => setOccupation(value)}
                  style={{ flex: 1 }}
                  placeholder="Enter New Occupation"
                  underlineColorAndroid="transparent"
              />
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

export default connect(mapStateToProps, mapDispatchToProps,)(EditOccupation);
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    height: 45,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderRadius: 5,
    margin: 10,
},
ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
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
    fontSize: 16,
    fontFamily: 'Poppins',
    alignSelf: 'center',
  }
};

