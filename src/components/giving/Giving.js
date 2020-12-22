import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {Container} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Picker} from '@react-native-community/picker';
// import Side from '../../image/';

export default class Giving extends Component {
  state = {checked: 'Select category', oneOff: 'One-Off'};
  closeDrawer = () => {
    this.drawer._root.close();
    this.setState({btnTopRight: false});
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <StatusBar
          barStyle={
            Platform.OS === 'android' ? 'dark-content' : 'light-content'
          }
        />
        <View style={{height}}>
          <View style={{margin: 18}}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                fontFamily: 'Nunito-Regular',
              }}>
              For your convenience, donate to AFTj Church via the below link to
              our secure donation site. God bless you as you do so.
            </Text>
          </View>
          <View style={styles.secPicker}>
            <Picker
              selectedValue={this.state.checked}
              style={{height: 50, width: 280}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({checked: itemValue})
              }>
              <Picker.Item label="Select Category" value="Select Category" />
              <Picker.Item label="Offering" value="Offering" />
              <Picker.Item label="Tithe" value="Tithe" />
              <Picker.Item label="Mission Support" value="Mission Support" />
              <Picker.Item label="Church Project" value="Church Project" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>
          {/* ============================================================ */}

          <View style={[styles.secPicker, {marginTop: 35}]}>
            <Picker
              selectedValue={this.state.oneOff}
              style={{height: 50, width: 280}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({oneOff: itemValue})
              }>
              <Picker.Item label="One-Off" value="0ne-Off" />
              <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 95,
            }}>
            <Pressable
              style={styles.pay}
              onPress={() => navigation.navigate('amount')}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Nunito-Bold',
                }}>
                Pay
              </Text>
            </Pressable>
            <Text
              style={{
                fontSize: 23,
                marginTop: 40,
                marginBottom: 40,
                fontFamily: 'Nunito-Regular',
              }}>
              OR
            </Text>
            <Pressable
              onPress={() => console.log('pay with cash app pressed')}
              style={[
                styles.pay,
                {
                  backgroundColor: '#fff',
                  elevation: 7,
                  flexDirection: 'row',
                },
              ]}>
              <Image
                source={require('../../image/cash.png')}
                style={{width: 30, height: 30, marginRight: 15}}
              />
              <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold'}}>
                Cash App
              </Text>
            </Pressable>
          </View>
        </View>
      </Container>
    );
  }
}
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  secPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    // backgroundColor: '#133',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  pay: {
    backgroundColor: '#c5cad2',
    width: 280,
    height: 50,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
