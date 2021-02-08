import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Picker,
  TextInput,
  Alert,
} from 'react-native';
import {BoldCustomButtonBigBig} from './common/CustomButton';
import auth from '@react-native-firebase/auth';
import Spinner from './common/Spinner';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
// import {Picker} from '@react-native-community/picker';

import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../redux/user/user.actions';
import {Button} from 'react-native-paper';

function EditDepartment({
  navigation,
  user,
  accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,
}) {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const [department, setDepartment] = useState('');

  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <BoldCustomButtonBigBig
        onPress={() => {
          if (department != '') {
            setLoading(true);

            return auth()
              .currentUser.updateProfile({
                department: department,
              })
              .then(() => {
                fetch(
                  'https://church.aftjdigital.com/api/users/' +
                    JSON.parse(user).id,
                  {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      department: department,
                      token: accessToken,
                    }),
                  },
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    try {
                      setCurrentUser(auth().currentUser);
                      setDepartment('');

                      Toast.show(
                        'Department successfully updated!',
                        Toast.LONG,
                      );
                      setLoading(false);
                      navigation.navigate('Profile');
                    } catch (e) {
                      alert(e);
                      setLoading(false);
                    }
                  })
                  .catch(error => {
                    setLoading(false);
                  });
              })
              .catch(error => {
                setLoading(false);
                return alert(' Error Occurred: ' + error.code);
              });
          } else {
            setLoading(false);
            alert('All fields are required');
          }
        }}>
        SAVE
      </BoldCustomButtonBigBig>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require('../assets/department.png')}
      />

      <Text style={styles.text}>Select Church Department</Text>

      <View style={styles.SectionStyle}>
        <Picker
          placeholder="Start Year"
          mode="dropdown"
          selectedValue={department}
          style={{
            height: 50,
            width: '95%',
            marginLeft: 10,
            fontSize: 12,
            fontFamily: 'Nunito-Regular',
            color: '#646464',
          }}
          onValueChange={itemValue => {
            if (itemValue != '0') setDepartment(itemValue);
          }}>
          <Picker.Item label="Select Church Department" value="0" />
          <Picker.Item label="Choir" value="Choir" />
          <Picker.Item label="Usering" value="Usering" />
          <Picker.Item label="Protocol" value="Protocol" />
          <Picker.Item label="Security" value="Security" />
        </Picker>
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
)(EditDepartment);
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
    borderColor: '#191C52',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 30,
    height: 45,
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
  },
};
