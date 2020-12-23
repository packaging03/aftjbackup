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
  const data = {
    planed: [null, {x: '6pm', y: 20}, {x: '12pm', y: 20}, {x: '6pm', y: 20}],
    actual: [
      {x: '6pm', y: 50},
      {x: '12pm', y: 80},
      {x: '6pm', y: 50},
      {x: 'week 2', y: 80},
    ],
  };
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
        <VictoryGroup animate={true} offset={10} colorScale="red">
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
        </VictoryGroup>
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

  card1: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '12%',
    backgroundColor: 'rgba(224, 232, 243, 0.4);',
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
