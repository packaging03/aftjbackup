import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Header, Left, Right, Body, Button, Title} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  return (
    <Container>
      <Header androidStatusBarColor="#000" style={{backgroundColor: '#fff'}}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color="#000" size={30} />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#000', fontSize: 23}}>Profile</Title>
        </Body>
        <Right>
          <Button transparent></Button>
        </Right>
      </Header>
      <View style={{width, height: 200, backgroundColor: '#133'}}></View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
