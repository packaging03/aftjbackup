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
    planed: [null, {x: 'week 2', y: 20}],
    actual: [{x: 'week 1', y: 50}, {x: 'week 2', y: 80}],
  };
  return (
    <Container>
      <View style={styles.ViewPad20}>
        <Text style={styles.headerTxt}>Activities on App</Text>
      </View>
      <View style={styles.card1}>
        <View>
          <Text>Time Spent on App Today</Text>
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
      <View style={[styles.ViewPad20, {marginTop: 20}]} />

      <VictoryChart /*width={350}*/ theme={VictoryTheme.material}>
        {/* <VictoryBar data={data} x="quarter" y="earnings" /> */}
        <VictoryGroup offset={20}>
          <VictoryBar data={data.actual} />
          <VictoryBar data={data.planed} style={{data: {fill: 'orange'}}} />
        </VictoryGroup>
        <VictoryLegend
          data={[
            {name: 'actual', symbol: {fill: 'tomato', type: 'star'}},
            {
              name: 'planed',
              symbol: {fill: 'orange'},
              labels: {fill: 'orange'},
            },
            // {name: 'Three', symbol: {fill: 'gold'}},
          ]}
        />
      </VictoryChart>
    </Container>
  );
};

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

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
