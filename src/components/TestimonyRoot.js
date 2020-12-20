import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Addtestimonies from './Addtestimony';
import Alltestimonies from './Alltestimony';
import Minetestimonies from './Minetestimony';


export default function TestimonyRoot({navigation}) {
  const [todaysDate, setToday] = useState('');
  const Tab = createMaterialTopTabNavigator();

  return (
    
        <Tab.Navigator
            initialRouteName="Alltestimony"
            tabBarOptions={{
                activeTintColor: '#000',
                 

                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: 'white',
                indicatorStyle: 
                { 
                  backgroundColor: 'black', 
                },
                inactiveTintColor: '#000',
                labelStyle: { fontSize: 14, fontWeight:"bold", fontFamily: 'frankruhllibre-Light'  },
                style: { 
                  backgroundColor: 'white', 
                  height: 50, 
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0
                },
            }}
            >
            <Tab.Screen
                name="ALL"
                component={Alltestimonies}
                options={{ tabBarLabel: 'ALL' }}
            />
            <Tab.Screen
                name="MINE"
                component={Minetestimonies}
                options={{ tabBarLabel: 'MINE' }}
            />
            <Tab.Screen
                name="ADD"
                component={Addtestimonies}
                options={{ tabBarLabel: 'ADD' }}
            />
            </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});