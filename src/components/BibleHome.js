import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Bible from '../components/Bible';
import ReadingPlan from '../components/ReadingPlan';
import TodaysReading from '../components/DaysReading';
import {createStackNavigator} from '@react-navigation/stack';

const TopTab = createMaterialTopTabNavigator();
const PlanStack = createStackNavigator();
const BibleStack = createStackNavigator();

export default function BibleHome() {
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
