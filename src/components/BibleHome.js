import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Bible from '../components/Bible';
import ReadingPlan from '../components/ReadingPlan';
import TodaysReading from '../components/DaysReading';
import AsyncStorage from '@react-native-community/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import ActionSheet from 'react-native-action-sheet';
import OptionsMenu from "react-native-option-menu";

const TopTab = createMaterialTopTabNavigator();
const PlanStack = createStackNavigator();
const BibleStack = createStackNavigator();

export default function BibleHome({navigation}) {
  const [time, setTime] = useState({s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  const optionMenusIcon =(<Icon
    name="options-vertical"
    size={20}
    backgroundColor="transparent"
    color="#000"
  />);


  var updatedMs = 0,
    updatedS = time.m,
    updatedM = time.m,
    updatedH = time.h;


    var BUTTONSiOS = [
      'Favourites',
      'Notes ',
      'Comments',
      'Settings',
      'Delete',
      'Cancel',
    ];
  
    var BUTTONSandroid = [
      'Favourites',
      'Notes ',
      'Comments',
      'Settings',
    ];
  
    var DESTRUCTIVE_INDEX = 5;
    var CANCEL_INDEX = 6;

 const showFavouriteOptionsMenu =()=>{
  navigation.navigate('Favourites');
 }

 const showNotesOptionsMenu =()=>{
  navigation.navigate('NoteRoot')
}

const showCommentsOptionsMenu =()=>{
  navigation.navigate('Comments');
}

const showSettingsOptionsMenu =()=>{
  alert('Hi settings');
  
}
    {
      {
        navigation.setOptions({headerRight: () => (
          <View style={{flexDirection: 'row', margin: 15}}>
          <OptionsMenu
              style={{margin:15}}
              customButton={optionMenusIcon}
              destructiveIndex={5}
              options={["Favourites", "Notes", "Comments", "Settings"]}
              actions={[showFavouriteOptionsMenu,showNotesOptionsMenu,showCommentsOptionsMenu,showSettingsOptionsMenu]}/>
         </View>
        ),});
      }
    }
  const run = async () => {
    setTimeout(run, 10);
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
    const j = JSON.stringify({s: updatedS, m: updatedM, h: updatedH});
    // console.log(j);
    try {
      await AsyncStorage.setItem('getBibleTime', j);
    } catch (e) {
      console.log(e);
    }

    return setTime({s: updatedS, m: updatedM, h: updatedH});
  };

  useEffect(() => {
    run();
    setInterv(setTimeout(run, 10));

    return () => {
      clearTimeout(interv);
    };
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
        component={ReadingPlan}
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
