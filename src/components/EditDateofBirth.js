import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground, Image, TextInput, Alert} from 'react-native';
import {BoldCustomButtonBig} from './common/CustomButton';
import auth from '@react-native-firebase/auth';
import Spinner from './common/Spinner';
import CustomInput from './common/CustomInput';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../redux/user/user.actions';
import { Button } from 'react-native-paper';
import Moment from 'moment';

function EditDateofBirth({navigation, user, accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,}) {
    
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [dob, setDob] = useState(Moment().format('L'));
  const [repp, setRepp] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = (date) => {
    //console.warn("A date has been picked: ", date);
    setDob(date)
    hideDatePicker();
    setDob(date)
    //alert(dob)
  };

  function update() {
    setName('');
    alert('Date of Birth was successfully updated!');
  }

  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <BoldCustomButtonBig
        onPress={() => {

          if (dob != '') {
                setLoading(true);

                    return auth()
                      .currentUser.updateProfile({
                          dateofbirth: dob,
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
                              dob: dob,
                              token: accessToken,
                            }),
                          })
                            .then(response => response.json())
                            .then(responseJson => {
                              
                              try {
                                  setCurrentUser(auth().currentUser);
                                  //setDob('');

                                Toast.show('Date of Birth successfully changed!', Toast.LONG);
                                setLoading(false);
                                navigation.navigate("Profile");

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
          source={require('../assets/calendar2.png')}
        />

        <Text
        style={styles.text}>
        Change Date of Birth
      </Text>

          <TouchableOpacity style={{marginBottom: 20, marginRight: 20, marginLeft: 20,}}  onPress={() => showDatePicker()}>
        <View style={styles.SectionStyle} onPress={() => showDatePicker()}>
        
                <TextInput
                onFocus={showDatePicker}
                    style={styles.text}
                    value={ Moment(dob).format('L')}
                    onChangeText={value => setDob(value)}
                    style={{ flex: 1 }}
                    placeholder="Select Date of Birth"
                    underlineColorAndroid="transparent"
                />
                
                
                <Image
                    onPress={() => showDatePicker()}
                    source={require('../assets/Line.png')}
                    style={styles.ImageStyle2}
                />
                <Image
                    onPress={() => showDatePicker()}
                    source={require('../assets/calendar.png')} 
                    style={styles.ImageStyle}
                />
        </View>

              
        </TouchableOpacity>
              <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              value={dob}
              onChangeText={handleConfirm}
              onDateChange={handleConfirm} 
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
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

export default connect(mapStateToProps, mapDispatchToProps,)(EditDateofBirth);
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
    borderRadius: 5,
    marginBottom:15,
    margin: 1,
},
ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
},
ImageStyle2: {
  height: 43,
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
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  }
};

// export default ForgotPassword;
