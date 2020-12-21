import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Title} from 'native-base';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';

const SuccessPage = ({navigation}) => {
  return (
    <Container>
      <View style={{height: height - 250, marginTop: 80}}>
        <Image
          source={require('../../assets/success_ci.png')}
          style={{width: 150, height: 150, alignSelf: 'center'}}
        />
        <View
          style={{
            width: width / 2 + 70,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontFamily: 'Nunito-Bold',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Congratulations !
          </Text>
          <View
            style={{
              width: width / 2,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: 30,
                fontFamily: 'Nunito-Regular',
              }}>
              Your registration as a new member was successfull
            </Text>
          </View>
          <Text
            style={{
              // justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'Nunito-Regular',
            }}>
            Click on the button below to have access to our
            <Text style={{fontFamily: 'Nunito-Bold'}}>
              New Member Resources
            </Text>
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate('NM-Resources')}
          style={{
            marginTop: 35,
            alignSelf: 'center',
            width: width / 2 + 70,
            backgroundColor: '#c5cad2',
            justifyContent: 'center',
            elevation: 7,
            borderRadius: 10,
            height: width / 7,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Nunito-Bold',
              fontSize: 18,
              color: '#000',
            }}>
            Continue
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{
            marginTop: 20,
            alignSelf: 'center',
            width: width / 2 + 70,
            backgroundColor: '#fff',
            justifyContent: 'center',
            elevation: 7,
            borderRadius: 10,
            boderWidth: 1,
            borderColor: '#c5cad2',
            height: width / 7,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Nunito-Bold',
              fontSize: 18,
              color: '#000',
            }}>
            Try Later
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({});
