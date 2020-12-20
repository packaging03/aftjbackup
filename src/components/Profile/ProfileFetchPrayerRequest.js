import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Title,
  Content,
} from 'native-base';
import {connect} from 'react-redux';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../../redux/user/user.actions';
// const data = [
//   {
//     id: 1,
//     prayer: 'Pray for the sick.',
//     date: '20/12/2020',
//   },
//   {
//     id: 2,
//     prayer: 'Pray for journey mercies and his divine satisfaction ',
//     date: '20/12/2020',
//   },
//   {
//     id: 3,
//     prayer: 'Pray for Promition',
//     date: '20/12/2020',
//   },
//   {
//     id: 4,
//     prayer: 'Pray for divine santification',
//     date: '20/12/2020',
//   },
// ];

const Profile = ({navigation, user, accessToken}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = `https://church.aftjdigital.com/api/viewprayer`;

      try {
        const result = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (result.status === 200) {
          setData(result.data);

          console.log(result.data);
        } else {
          console.log(result.data + `n/ error message`);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

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
          PRAYER REQUEST HISTORY
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
            width: width / 2 - 68,
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
            width: width / 2 + 30,
            paddingLeft: 5,
            paddingLeft: 20,
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              fontSize: 16,
              fontFamily: 'Nunito-Bold',
            }}>
            Prayer Request
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
                    width: width / 2 - 68,
                    paddingRight: 5,
                  }}>
                  <Text
                    style={{
                      flexWrap: 'wrap',
                      // fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.created_at}
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: 'skyblue',
                    width: width / 2 + 30,
                    // paddingLeft: 5,
                    paddingLeft: 20,
                  }}>
                  <Text
                    style={{
                      flexWrap: 'wrap',
                      // fontSize: 16,
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.body}
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
)(Profile);

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
