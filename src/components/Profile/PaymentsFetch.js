import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../../redux/user/user.actions';
const data = [
  {
    id: 1,
    project: 'Tithe',
    date: '20/12/2020',
    amount: '$2,000',
  },
  {
    id: 2,
    project: 'Offering',
    date: '20/12/2020',
    amount: '$1,000',
  },
  {
    id: 3,
    project: 'Mission support',
    date: '20/12/2020',
    amount: '$500',
  },
  {
    id: 4,
    project: 'Church Project',
    date: '20/12/2020',
    amount: '$2,000,000',
  },
];

const PaymentsFetch = () => {
  return (
    <Container>
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            fontSize: 18,
            marginTop: 20,
            marginBottom: 15,
          }}>
          PAYMENT HISTORY
        </Text>
      </View>

      <View style={styles.line} />
      {/* ================================================== */}
      <View
        style={{
          flexDirection: 'row',
          // backgroundColor: '#133',
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 20,
          marginBottom: 15,
        }}>
        <View
          style={{
            // backgroundColor: '#f1f1f1',
            width: width / 2 - 80,
            paddingRight: 5,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              fontSize: 16,
              fontFamily: 'Nunito-Bold',
            }}>
            Date
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'skyblue',
            width: width / 2 - 40,
            paddingLeft: 10,
            // paddingRight: 5,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              fontSize: 16,
              fontFamily: 'Nunito-Bold',
            }}>
            Category
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'skyblue',
            width: width / 2 + 30,
            paddingLeft: 5,
            // paddingRight: 5,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              fontSize: 16,
              fontFamily: 'Nunito-Bold',
            }}>
            Amount
          </Text>
        </View>
      </View>

      {/* ============================================================================ */}

      {/* ScrollView */}
      <Content>
        {data.map(item => {
          return (
            <View key={item.id}>
              <View style={styles.lineFade} />
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: '#133',
                  paddingRight: 20,
                  paddingLeft: 20,
                  marginTop: 20,
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    // backgroundColor: '#f1f1f1',
                    width: width / 2 - 80,
                    paddingRight: 5,
                  }}>
                  <Text
                    style={{
                      flexWrap: 'wrap',
                      // fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.date}
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: 'skyblue',
                    width: width / 2 - 40,
                    paddingLeft: 10,
                    // paddingRight: 5,
                  }}>
                  <Text
                    style={{
                      flexWrap: 'wrap',
                      // fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.project}
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: 'skyblue',
                    width: width / 2 + 30,
                    paddingLeft: 5,
                    // paddingRight: 5,
                  }}>
                  <Text
                    style={{
                      flexWrap: 'wrap',
                      // fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.amount}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
        {/* <View style={styles.lineFade} /> */}
      </Content>
    </Container>
  );
};

export default PaymentsFetch;

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  lineFade: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    opacity: 0.2,
  },
});
