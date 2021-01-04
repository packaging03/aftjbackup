import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Bible from '../components/Bible';
import ReadingPlan from '../components/ReadingPlan';
import TodaysReading from '../components/DaysReading';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';

const TopTab = createMaterialTopTabNavigator();
const PlanStack = createStackNavigator();
const BibleStack = createStackNavigator();

export default function BibleHome() {
  const [time, setTime] = useState({s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  var updatedMs = 0,
    updatedS = time.m,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;

    return setTime({s: updatedS, m: updatedM, h: updatedH});
  };

  async function _asyncTime() {
    // console.log(time.s);
    if (time.m > 0) {
      console.log(time.m);

      let obj = {
        seconds: time.s,
        minutes: time.m,
        hours: time.h,
      };
      const j = JSON.stringify(obj);
      console.log(j);
      try {
        await AsyncStorage.setItem('bibleTime', j);
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    run();
    setInterv(setInterval(run, 10));

    return () => {
      clearInterval(interv);
    };
  }, []);
  useEffect(() => {
    _asyncTime();
  }, []);
  return (
    <TopTab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#fff', textColor: '#000'},
        activeTintColor: '#000',
        inactiveTintColor: '#000',
        indicatorStyle: {backgroundColor: '#000', width: '50%'},
        labelStyle: {
          fontSize: 18,
          fontWeight: '700',
          textTransform: 'capitalize',
        },
      }}
      initialLayout={{width: Dimensions.get('window').width}}>
      <TopTab.Screen
        name="Reading Plan"
        component={PLanStackScreen}
        options={{
          headerStyle: {fontFamily: 'Nunito'},
          tabBarLabel: 'Reading Plan',
        }}
      />
      <TopTab.Screen
        name="Bible"
        component={Bible}
        options={{
          tabBarLabel: 'Bible',
        }}
      />
    </TopTab.Navigator>
  );
}

const PLanStackScreen = ({navigation}) => (
  <PlanStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {},
    }}>
    <PlanStack.Screen
      name="Reading Plan"
      component={ReadingPlan}
      options={{
        title: 'Reading PLan',
        headerStyle: {
          backgroundColor: '#333560',
        },
      }}
    />
  </PlanStack.Navigator>
);

const styles = StyleSheet.create({});
