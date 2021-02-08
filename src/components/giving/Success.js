import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {Container} from 'native-base';
const {width, height} = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

const Success = ({}) => {
  const navigation = useNavigation();
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
              // fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              fontFamily: 'Nunito-Bold',
            }}>
            Transaction Successful
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
              Your Payment was successfull
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('Give whole heartedly')}
          style={{
            marginTop: 35,
            alignSelf: 'center',
            width: width / 2 + 70,
            backgroundColor: '#c5cad2',
            justifyContent: 'center',
            borderRadius: 10,
            elevation: 7,
            height: width / 7,
          }}>
          <Text
            style={{
              textAlign: 'center',
              // fontWeight: 'bold',
              fontSize: 18,
              color: '#000',
              fontFamily: 'Nunito-Bold',
            }}>
            Home
          </Text>
        </Pressable>
      </View>
    </Container>
  );
};

export default Success;

const styles = StyleSheet.create({});
