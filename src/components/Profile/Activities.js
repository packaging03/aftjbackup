import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
// import {ProgressBar, Colors} from 'react-native-paper';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryStack,
  VictoryAxis,
} from 'victory-native';
const {width, height} = Dimensions.get('window');

const Activities = ({
  navigation,
  user,
  accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,
}) => {
  const data1 = [
    {day: 'Mon', time: 1},
    {day: 'Tus', time: 3},
    {day: 'Wed', time: 2},
    {day: 'Thus', time: 10},
    {day: 'Fri', time: 1},
    {day: 'Sat', time: 5},
    {day: 'Sun', time: 4},
  ];
  const barW = 25;
  const red = 'red';

  useEffect(() => {
    const BiblePageTime = async () => {
      const passJson = await AsyncStorage.getItem('getTime', (e, res) => {
        if (!e) {
          console.log(JSON.parse(res));
        } else {
          console.log(e);
        }
      });
    };
    BiblePageTime();
    return () => {};
  }, []);
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
          <Text style={{fontSize: 20, fontFamily: 'Nunito-Bold'}}>35mins</Text>
        </View>

        <Pressable style={styles.press}>
          <Feather
            name="calendar"
            color="#000"
            size={25}
            style={{
              alignSelf: 'center',
            }}
          />
        </Pressable>
      </View>

      <VictoryChart
        height={height / 4}
        theme={VictoryTheme.material}
        domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Mon', 'Tus', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}hr`} />
        <VictoryBar
          data={data1}
          x="day"
          y="time"
          barWidth={barW}
          style={{data: {fill: red}}}
        />
      </VictoryChart>

      {/* ================================================================= */}

      <VictoryChart height={height / 4} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['6pm', '12pm', '6pm', '12pm']}
        />
        <VictoryAxis dependentAxis tickFormat={x => `${x}m`} />
        <VictoryGroup animate={true} offset={4} colorScale="red">
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 4, y: 2},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 1},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 4, y: 2},
              {x: 3, y: 4},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 2},
              {x: 2, y: 1},
              {x: 3, y: 2},
              {x: 4, y: 5},
              {x: 3, y: 2},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 6},
              {x: 4, y: 4},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 3, y: 2},
              {x: 4, y: 4},
              {x: 3, y: 6},
            ]}
          />
          <VictoryBar
            data={[
              {x: 1, y: 3},
              {x: 2, y: 4},
              {x: 2, y: 2},
              {x: 3, y: 5},
              {x: 3, y: 6},
            ]}
          />
        </VictoryGroup>
      </VictoryChart>
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
      <View style={{paddingLeft: 20, marginTop: 10}}>
        <View>
          <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
            Bible
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="bible" size={25} color="#8A0303" />
            <ProgressBar
              color="#8A0303"
              style={{marginHorizontal: '5%', width: '65%', borderRadius: 10}}
              styleAttr="Horizontal"
              indeterminate={false}
              progress={0.5}
            />
            <Text>{'45m'}</Text>
          </View>
        </View>
        {/* ======================================== */}
        <View style={{marginTop: 10}}>
          <Text style={{fontFamily: 'Nunito-Regular', marginLeft: 22}}>
            Sermon
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="bible" size={25} color="#1F78B4" />
            <ProgressBar
              color="#1F78B4"
              style={{marginHorizontal: '5%', width: '65%', borderRadius: 10}}
              styleAttr="Horizontal"
              indeterminate={false}
              progress={0.5}
            />
            <Text>{'30m'}</Text>
          </View>
        </View>
      </View>
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
    marginHorizontal: '35%',
    backgroundColor: '#fff',
    width: 35,
    height: 35,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 7,
  },
  // #8A0303
  // #1F78B4;

  card1: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 56,
    backgroundColor: 'rgba(224, 232, 243, 0.4);',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card2: {
    paddingLeft: 20,
    // paddingRight: 20,
    height: 56,
    backgroundColor: 'rgba(224, 232, 243, 0.4);',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  headerTxt: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
  },
  ViewPad20: {paddingLeft: 20, paddingRight: 20},
});
