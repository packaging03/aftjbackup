import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {ReadingData} from '../components/common/RedingData';
import {TouchableOpacity} from 'react-native-gesture-handler';

const getTtheDaysReading = dayToSearch => {
  for (var i = 0; i < ReadingData.length; i++) {
    if (ReadingData[i]['day'] === dayToSearch) {
      return ReadingData[i]['plan'];
    }
  }
  return null;
};

const planDates = () => {
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;

  var monthName = monthNames[new Date().getMonth()];
  var year = new Date().getFullYear();
  const today = date + ' ' + monthName;

  const montCount = new Date(year, month, 0).getDate();
  var planData = [];
  // change 1 to 'date' in the loop control to start from the day of the month
  for (var i = 1; i <= montCount; i = i + 1) {
    var theDay = new Date(monthName + ' ' + i + ', ' + year + ' 23:15:30');
    var first = new Date(theDay.getFullYear(), 0, 1);
    var theDays = Math.round((theDay - first) / 1000 / 60 / 60 / 24 + 0.5, 0);
    var reading = getTtheDaysReading(theDays);

    var weekdays = days[theDay.getDay()];
    planData.push({
      id: i,
      day: i,
      monthval: monthName,
      weekday: weekdays,
      plan: reading,
    });
  }

  return planData;
};

const Data = planDates();

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );
};

export default function ReadingPlan({navigation}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 1,

          marginTop: 10,
        }}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TodaysReading', {biblePassage: item.plan})
              }>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 15,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    width: 80,
                    color: '#000',
                    fontWeight: '400',
                    fontFamily: 'Nunito',
                  }}>
                  {item.day} {item.monthval.substring(0, 3).toUpperCase()}
                </Text>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: '#000',
                      fontWeight: '700',
                      fontFamily: 'Nunito-Regular',
                    }}>
                    {item.weekday}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 10,
                      color: '#000',
                      fontFamily: 'Nunito',
                    }}>
                    {item.plan}
                  </Text>
                </View>

                {/* </View> */}
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
