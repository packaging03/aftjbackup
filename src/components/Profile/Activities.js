import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import {Container, Content} from 'native-base';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import React, {useEffect, useState} from 'react';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import Chart from './chart/Chart';

const Activities = ({
  navigation,
  user,
  accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,
}) => {
  const [bibleTime, setBibleTime] = useState(null);
  const [sermonTime, setSermonTime] = useState(null);
  const [giveTime, setGiveTime] = useState(null);
  const [prayerR, setprayerR] = useState(null);
  const [appTime, setAppTime] = useState(null);

  useEffect(() => {
    const BiblePageTime = async () => {
      try {
        const bibleTime = await AsyncStorage.getItem('getBibleTime');
        let bible = JSON.parse(bibleTime);
        if (bible != null) {
          setBibleTime(bible);
          console.log('bible time set');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const sermonPageTime = async () => {
      try {
        const sermTime = await AsyncStorage.getItem('getSermTime');
        let sermon = JSON.parse(sermTime);
        if (sermon != null) {
          setSermonTime(sermon);
          console.log('Sermon Time set');
          console.log(sermonTime);
        }
      } catch (e) {
        console.log(e);
      }
    };
    (async () => {
      try {
        const giveTime = await AsyncStorage.getItem('giveTime');
        let sermon = JSON.parse(giveTime);
        if (sermon != null) {
          setGiveTime(sermon);
          console.log(giveTime);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    (async () => {
      try {
        const appTime = await AsyncStorage.getItem('appTime');
        let sermon = JSON.parse(appTime);
        if (sermon != null) {
          setAppTime(sermon);
          // console.log(appTime);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    (async () => {
      try {
        const appTime = await AsyncStorage.getItem('prayT');
        let pray = JSON.parse(appTime);
        if (pray != null) {
          setprayerR(pray);
          console.log(pray);
        }
      } catch (e) {
        console.log(e);
      }
    })();
    BiblePageTime();
    sermonPageTime();
    return () => {};
  }, []);

  const openCal = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('calshow:');
    } else if (Platform.OS === 'android') {
      Linking.openURL('content://com.android.calendar/time/');
    }
  };

  const getPrayerR = () => {
    if (prayerR != null) {
      if (prayerR.s > 0 && prayerR.m <= 0) {
        return <Text>{`${prayerR.s}sec`}</Text>;
      } else if (prayerR.m > 0 && prayerR.h <= 0) {
        return <Text>{`${prayerR.m}mins`}</Text>;
      } else if (prayerR.h > 0) {
        return <Text>{`${prayerR.h}hours`}</Text>;
      }
    } else {
      return <Text>0</Text>;
    }
  };

  const sermSwitch = () => {
    if (sermonTime != null) {
      if (sermonTime.s > 0 && sermonTime.m <= 0) {
        return <Text>{`${sermonTime.s}sec`}</Text>;
      } else if (sermonTime.m > 0 && sermonTime.h <= 0) {
        return <Text>{`${sermonTime.m}mins`}</Text>;
      } else if (sermonTime.h > 0) {
        return <Text>{`${sermonTime.h}hours`}</Text>;
      }
    } else {
      return <Text>0</Text>;
    }
  };
  const giveFun = () => {
    if (giveTime != null) {
      if (giveTime.s > 0 && giveTime.m <= 0) {
        return <Text>{`${giveTime.s}sec`}</Text>;
      } else if (giveTime.m > 0 && giveTime.h <= 0) {
        return <Text>{`${giveTime.m}mins`}</Text>;
      } else if (sermonTime.h > 0) {
        return <Text>{`${giveTime.h}hours`}</Text>;
      }
    } else {
      return <Text>0</Text>;
    }
  };
  const appSwitch = () => {
    if (appTime != null) {
      if (appTime.s > 0 && appTime.m <= 0) {
        return (
          <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold'}}>{`${
            appTime.s
          }sec`}</Text>
        );
      } else if (appTime.m > 0 && appTime.h <= 0) {
        return (
          <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold'}}>{`${
            appTime.m
          }mins`}</Text>
        );
      } else if (appTime.h > 0) {
        return (
          <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold'}}>{`${
            appTime.h
          }hours`}</Text>
        );
      }
    } else {
      return <Text>0</Text>;
    }
  };
  const bibleSwitch = () => {
    if (bibleTime != null) {
      if (bibleTime.s > 0 && bibleTime.m <= 0) {
        return <Text>{`${bibleTime.s}sec`}</Text>;
      } else if (bibleTime.m > 0 && bibleTime.h <= 0) {
        return <Text>{`${bibleTime.m}mins`}</Text>;
      } else if (bibleTime.h > 0) {
        return <Text>{`${bibleTime.h}hours`}</Text>;
      }
    } else {
      return <Text>0</Text>;
    }
  };
  return (
    <Container>
      <View style={styles.ViewPad20}>
        <Text style={styles.headerTxt}>Activities on App</Text>
      </View>
      <View style={styles.card1}>
        <View>
          <Text style={{fontFamily: 'Nunito-Regular'}}>
            Time Spent on App Today
          </Text>
          {appSwitch()}
        </View>

        <Pressable onPress={openCal} style={styles.press}>
          <Feather
            name="calendar"
            color="#000"
            size={40}
            style={{
              alignSelf: 'center',
            }}
          />
        </Pressable>
      </View>
      <View />

      <Chart />

      <View style={styles.card2}>
        <View>
          <Text style={{fontFamily: 'Nunito-Regular'}}>
            Updated Today at {'6:00am'}
          </Text>
          <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold', marginTop: 5}}>
            Most Pages Seen
          </Text>
        </View>
      </View>
      <Content>
        {bibleTime !== null && bibleTime.m <= 0 ? (
          <View style={{marginLeft: 20, top: 3}}>
            <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
              Bible
            </Text>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="bible" size={25} color="#8A0303" />
              <ProgressBar
                color="#8A0303"
                style={{
                  marginHorizontal: '5%',
                  width: '65%',
                  borderRadius: 10,
                }}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.5}
              />
              {bibleSwitch()}
            </View>
          </View>
        ) : null}

        {/* ======================================== */}

        {sermonTime !== null && sermonTime.m <= 0 ? (
          <View style={{marginLeft: 20, top: 3}}>
            <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
              Sermon
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Feather name="book" size={25} color="#1F78B4" />
              <ProgressBar
                color="#1F78B4"
                style={{
                  marginHorizontal: '5%',
                  width: '65%',
                  borderRadius: 20,
                }}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.3}
              />
              {sermSwitch()}
            </View>
          </View>
        ) : null}
        {giveTime !== null && giveTime.m <= 0 ? (
          <View style={{marginLeft: 20, top: 3}}>
            <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
              Giving
            </Text>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="heart" size={28} color="red" />
              <ProgressBar
                color="red"
                style={{
                  marginHorizontal: '4%',
                  width: '65%',
                  borderRadius: 20,
                }}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.6}
              />
              {giveFun()}
            </View>
          </View>
        ) : null}
        {prayerR !== null && prayerR.m <= 0 ? (
          <View style={{marginLeft: 20, top: 3}}>
            <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
              Prayer Request
            </Text>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome5 name="praying-hands" size={25} color="#FFFF00" />
              <ProgressBar
                color="#FFFF00"
                style={{
                  marginHorizontal: '3%',
                  width: '65%',
                  borderRadius: 20,
                }}
                styleAttr="Horizontal"
                indeterminate={false}
                progress={0.6}
              />
              {getPrayerR()}
            </View>
          </View>
        ) : null}
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
)(Activities);

const styles = StyleSheet.create({
  press: {
    marginHorizontal: '30%',
    backgroundColor: '#fff',
    width: '18%',
    height: '75%',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 7,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  card1: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '12%',
    backgroundColor: '#c5cad2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card2: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '10%',
    backgroundColor: '#c5cad2',

    justifyContent: 'center',
  },
  headerTxt: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  ViewPad20: {paddingLeft: 20, paddingRight: 20},
});