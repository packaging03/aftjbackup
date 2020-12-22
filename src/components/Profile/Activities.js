import React from 'react';
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryStack,
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
  const data = {
    mon: [{x: 'Mon', y: 2}],
    tue: [{x: 'Tue', y: 10}],
    wed: [{x: 'Wed', y: 3}],

    thus: [{x: 'Thus', y: 2}],
    fri: [{x: 'Fri', y: 1}],
    sat: [{x: 'Sat', y: 4}],
    sun: [{x: 'Sun', y: 7}],
  };
  const barW = 25;
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
            size={40}
            style={{
              alignSelf: 'center',
            }}
          />
        </Pressable>
      </View>
      <View />

      <VictoryChart height={height / 3} theme={VictoryTheme.material}>
        {/* <VictoryBar data={data} x="quarter" y="earnings" /> */}
        <VictoryGroup offset={10}>
          <VictoryBar
            barWidth={barW}
            data={data.mon}
            style={{data: {fill: 'red'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.tue}
            style={{data: {fill: 'gray'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.wed}
            style={{data: {fill: 'blue'}}}
          />
          <VictoryBar
            data={data.thus}
            barWidth={barW}
            style={{data: {fill: 'orange'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.fri}
            style={{data: {fill: 'black'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.sat}
            style={{data: {fill: 'green'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.sun}
            style={{data: {fill: 'pink'}}}
          />
        </VictoryGroup>
      </VictoryChart>

      {/* =============================================================group chart============================== */}
      <VictoryChart height={height / 3} theme={VictoryTheme.material}>
        {/* <VictoryBar data={data} x="quarter" y="earnings" /> */}
        <VictoryGroup offset={2}>
          <VictoryBar
            barWidth={barW}
            data={data.mon}
            style={{data: {fill: 'red'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.tue}
            style={{data: {fill: 'gray'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.wed}
            style={{data: {fill: 'blue'}}}
          />
          <VictoryBar
            data={data.thus}
            barWidth={barW}
            style={{data: {fill: 'orange'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.fri}
            style={{data: {fill: 'black'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.sat}
            style={{data: {fill: 'green'}}}
          />
          <VictoryBar
            barWidth={barW}
            data={data.sun}
            style={{data: {fill: 'pink'}}}
          />
        </VictoryGroup>
        {/* <VictoryStack Offset={5}>
          <VictoryBar data={data.mon} style={{data: {fill: 'red'}}} />
          <VictoryBar data={data.tue} style={{data: {fill: 'gray'}}} />
          <VictoryBar data={data.wed} style={{data: {fill: 'blue'}}} />
          <VictoryBar data={data.thus} style={{data: {fill: 'orange'}}} />
          <VictoryBar data={data.fri} style={{data: {fill: 'black'}}} />
          <VictoryBar data={data.sat} style={{data: {fill: 'green'}}} />
          <VictoryBar data={data.sun} style={{data: {fill: 'pink'}}} />
        </VictoryStack> */}
      </VictoryChart>
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
  headerTxt: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  ViewPad20: {paddingLeft: 20, paddingRight: 20},
});
