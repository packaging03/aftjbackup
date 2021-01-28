import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';
// import {RadioButton} from 'react-native-paper';
import CustomInput from '../components/common/CustomInput';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomButton from '../components/common/CustomButton';

radio_props = [{label: 'Yes', value: 0}, {label: 'No', value: 1}];

function PrayerRequest({accessToken, user}) {
  const [checked, setChecked] = useState('Yes');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [request, setRequest] = useState('');

  const sendPrayerRequest = () => {
    if (accessToken === null) {
      alert('Please Login first');
      return;
    }
    if (request === '' || name === '' || email === '' || phone === '') {
      alert('All fields are required');
    } else {
      fetch('https://church.aftjdigital.com/api/prayerrequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // 'Authorization': `bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: JSON.parse(user).id,
          name: name,

          email: email,
          phone: phone,
          address: 'address',
          body: request,
          token: accessToken,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('peter');
          console.log(responseJson);
          console.log('peter');
          var errorMsg = '';

          if (responseJson.message !== 'Prayer Request Created succesfully') {
            alert('Error: ' + responseJson);
            return;
          } else {
            alert('Your prayer request has been successfully sent!');
            setName('');
            setEmail('');
            setRequest('');

            setPhone('');
          }
          console.log('user:' + errorMsg);
        })
        .catch(error => {
          console.log('user:' + user);

          alert(error);
        });
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../assets/prayer-request.png')}
          style={styles.img}
        />

        <Text style={styles.title}>PRAYER REQUEST</Text>
        <Text style={styles.description}>
          Our Prayer team at Jubilee Christian Church Int’l would be honored to
          pray for you or someone you know. We pray for all the prayer request
          we recieve on a regular basis.
        </Text>
        <Text style={styles.otherText}>FILL THE FORM BELOW</Text>

        <View style={styles.card}>
          <Text
            style={{
              fontFamily: 'Nunito',
              alignSelf: 'baseline',
              fontWeight: '400',
              letterSpacing: 0.5,
              lineHeight: 24,
            }}>
            How can we pray for you?
          </Text>
          <CustomInput
            value={request}
            onChangeText={value => setRequest(value)}
            title="Enter Your prayer request"
            style={{marginRight: 20, fontSize: 18}}
            multiline={true}
          />

          <Text style={styles.inputLabel}>
            Would you like someone to follow up with you?
          </Text>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={false}
            labelHorizontal={true}
            buttonSize={10}
            buttonColor={'#000'}
            buttonInnerColor={'#000'}
            backgroundColor={'#191C52'}
            borderColor={'#000'}
            shadowColor={'#191C52'}
            buttonOuterColor={'#191C52'}
            selectedButtonColor={'#191C52'}
            buttonOuterSize={19}
            onPress={() => {}}
            style={{marginTop: 10}}
            animation={true}
          />

          <Text style={styles.inputLabel}>Name</Text>
          <CustomInput
            onChangeText={value => setName(value)}
            value={name}
            title="Enter Full Name"
          />

          <Text style={styles.inputLabel}>Email Address</Text>
          <CustomInput
            value={email}
            onChangeText={value => setEmail(value)}
            keyboardType="email-address"
            title="Your Email Address "
          />

          <Text style={styles.inputLabel}>Contact Number</Text>
          <CustomInput
            value={phone}
            onChangeText={value => setPhone(value)}
            keyboardType="phone-pad"
            title="Type your phone number here"
          />

          {/* 
        <View
          style={{
            alignSelf: 'flex-end',
            width: 220,
            flex: 1,
            marginRight:-20,
            marginTop: 20,
            marginBottom: 20,
            display: 'flex',
          }}> */}
          <CustomButton
            onPress={() => sendPrayerRequest()}
            buttonStyle={{
              width: '60%',
              marginRight: -20,
              marginTop: 40,
              alignSelf: 'flex-end',
              marginBottom: 20,
            }}>
            SUBMIT
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});

export default connect(mapStateToProps)(PrayerRequest);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    display: 'flex',
    marginLeft: 20,
    marginTop: 15,
    padding: 24,
    marginRight: 20,
    flexDirection: 'column',
    padding: 24,
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#191C52',
    borderWidth: 0.4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'Nunito',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'justify',
  },
  img: {
    height: 150,
    resizeMode: 'stretch',
    width: '95%',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
  },
  inputLabel: {
    fontFamily: 'Nunito',
    alignSelf: 'baseline',
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 24,
    marginTop: 40,
  },
  otherText: {
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'Nunito',
    alignSelf: 'baseline',
    fontWeight: '400',
    lineHeight: 32,
    fontSize: 18,
  },
  title: {
    marginTop: 16,
    marginLeft: 20,
    marginBottom: 16,
    marginRight: 20,
    fontFamily: 'Nunito',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    alignSelf: 'baseline',
  },
});
