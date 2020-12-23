import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import {Container} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-community/picker';
// import {Picker} from '../../assets/newmembers.png';

const {width, height} = Dimensions.get('window');
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
// --no-jetifier"

export default class NewMembers extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    home: '',
    checked: 'yes',
    hearAboutUs: 'How did you hear about us',
    prayerRequest: '',
    focus: false,
    spinnerRemove: false,
  };

  sentDataToDb = async () => {
    this.setState({spinnerRemove: true});
    if (
      this.state.phone === '' ||
      this.state.email === '' ||
      this.state.name === '' ||
      this.state.home === ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'Please do not leave any input field empty',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      let testMail = new RegExp(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      );

      if (!testMail.test(this.state.email.trim())) {
        ToastAndroid.showWithGravityAndOffset(
          'Invalid email, try again',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        if (this.state.hearAboutUs === 'How did you hear about us') {
          alert('Please select from the dropdown, how you heard about us..');
        } else {
          var numbers = /^[0-9]+$/;
          if (this.state.phone.match(numbers)) {
            if (/^[a-z][a-z\s]*$/i.test(this.state.name.trim())) {
              try {
                const data = {
                  email: this.state.email.trim(),
                  name: this.state.name,
                  phone: this.state.phone.trim(),
                  address: this.state.home,
                  church_visit: this.state.checked.trim(),
                  hear_about_us: this.state.hearAboutUs,
                  prayer_point: this.state.prayerRequest,
                };

                const resp = await axios.post(
                  'https://church.aftjdigital.com/api/new-member',
                  data,
                  {
                    cancelToken: source.token,
                  },
                );

                // alert(resp.data.message);
                if (resp.data.status === 'success') {
                  this.setState({
                    spinnerRemove: false,
                  });
                  this.props.navigation.navigate('newMemberSuccessPage');
                }
              } catch (e) {
                console.log(e.response.data);
              }
              return true;
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'Name must be alpherbets only.',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              return false;
            }
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Phone number must be numbers only.',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );

            this.setState({focus: true});

            return false;
          }
        }
      }
    }
  };

  render() {
    return (
      <Container>
        <Spinner
          visible={this.state.spinnerRemove}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <ScrollView>
          <View style={styles.imgView}>
            <Image
              source={require('../../assets/newmembers.png')}
              style={styles.img}
            />
          </View>
          {/* ====================================================================== */}
          <View style={{padding: 20}}>
            <Text
              style={{
                fontSize: 18,
                // fontWeight: 'bold',
                fontFamily: 'Nunito-Bold',
              }}>
              Welcome To Jubilee Christian Church Int'l
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
              }}>
              We are very delighted that you are here. Our team would love to
              serve you and help you get connected.
            </Text>
          </View>
          <View style={styles.form}>
            <View>
              <Text style={{marginBottom: 12}}>Full Name</Text>
              <TextInput
                keyboardType="default"
                onChangeText={text => {
                  this.setState({name: text});
                }}
                value={this.state.name}
                style={{
                  borderBottomColor: '#000',
                  padding: 2,
                  borderBottomWidth: 1,
                }}
                placeholder="Enter Your Full Name"
              />
            </View>
            {/* ======================= */}
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  marginBottom: 12,
                  fontFamily: 'Nunito-Regular',
                }}>
                Email Address
              </Text>
              <TextInput
                keyboardType="email-address"
                multiline
                onChangeText={text => {
                  this.setState({email: text});
                }}
                value={this.state.email}
                style={{
                  borderBottomColor: '#000',
                  padding: 2,
                  borderBottomWidth: 1,
                }}
                placeholder="Enter Your Email Address"
              />
            </View>
            {/* =================================================================== */}
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  marginBottom: 12,
                  fontFamily: 'Nunito-Regular',
                }}>
                Contact Number
              </Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={text => {
                  this.setState({phone: text});
                }}
                value={this.state.phone}
                style={{
                  borderBottomColor: '#000',
                  padding: 2,
                  borderBottomWidth: 1,
                }}
                placeholder="Enter Your Phone Number"
              />
            </View>
            {/* =========================================================== */}
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  marginBottom: 12,
                  fontFamily: 'Nunito-Regular',
                }}>
                Home Address
              </Text>
              <TextInput
                keyboardType="default"
                onChangeText={text => {
                  this.setState({home: text});
                }}
                value={this.state.home}
                style={{
                  borderBottomColor: '#000',
                  paddingRight: 5,
                  paddingLeft: 2,
                  borderBottomWidth: 1,
                }}
                multiline
                placeholder="Enter Home Address"
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Nunito-Bold',
                  marginBottom: 20,
                }}>
                Have you visited our church before?
              </Text>
            </View>
            <View style={{width: width / 9}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  Yes
                </Text>
                <RadioButton
                  color="#000"
                  value="first"
                  status={
                    this.state.checked === 'yes' ? 'checked' : 'unchecked'
                  }
                  onPress={() =>
                    this.setState({
                      checked: 'yes',
                    })
                  }
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    marginRight: 4,
                    fontFamily: 'Nunito-Regular',
                  }}>
                  No
                </Text>
                <RadioButton
                  color="#000"
                  value="first"
                  status={this.state.checked === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({checked: 'no'})}
                />
              </View>
            </View>

            <Picker
              selectedValue={this.state.hearAboutUs}
              style={{height: 50, width: 300}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  hearAboutUs: itemValue,
                })
              }>
              <Picker.Item
                label="How did you hear about us?"
                value="How did you hear about us?"
              />
              <Picker.Item label="Search Engine" value="Search Engine" />
              <Picker.Item label="Google Ads" value="Google Ads" />
              <Picker.Item label="YouTube Ads" value="YouTube Ads" />
              <Picker.Item
                label="Facebook Post/Group"
                value="Facebook Post/Group"
              />
              <Picker.Item label="Twitter Post" value="Twitter Post" />
              <Picker.Item
                label="Instagram Post/Story"
                value="Instagram Post/Story"
              />
              <Picker.Item
                label="Other Social Media"
                value="Other Social Media"
              />
              <Picker.Item label="Email" value="Email" />
              <Picker.Item label="TV" value="TV" />
              <Picker.Item label="Newspaper" value="Newspaper" />
              <Picker.Item label="Word of mouth" value="Word of mouth" />
            </Picker>
            {/* =============================================================================== */}
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  marginBottom: 14,
                  fontFamily: 'Nunito-Bold',
                }}>
                Anything you would like us to pray with you about?
              </Text>
              <TextInput
                keyboardType="default"
                onChangeText={text => {
                  this.setState({
                    prayerRequest: text,
                  });
                }}
                value={this.state.prayerRequest}
                style={{
                  borderBottomColor: '#000',
                  padding: 2,
                  borderBottomWidth: 1,
                }}
                multiline
                placeholder="Enter Prayer request."
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={this.sentDataToDb}
            style={styles.Pressable}>
            <Text
              style={{
                color: '#fff',

                fontSize: 18,
                fontFamily: 'Nunito-Bold',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* </KeyboardAvoidingView> */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {backgroundColor: '#fff'},
  form: {
    // backgroundColor: "#133",

    width: width - 0,
    height: height - 25,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 20,
  },
  img: {
    width: width - 20,
    height: height / 5,
    borderRadius: 20,
  },
  imgView: {alignItems: 'center', marginTop: 10},
  Pressable: {
    alignSelf: 'flex-end',
    backgroundColor: '#c5cad2',
    width: width / 2,
    height: 50,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
