import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function TodaysBulletin({navigation}) {
  const [todaysDate, setToday] = useState('');

  //custom title header
  function customHeaderTitle() {
    return (
      <View style={styles.headerContainer}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
          Bulletin
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 15}}>
            <Icon name="ios-share-social-outline" color="#ffffff" size={26} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="ios-download-outline" color="#ffffff" size={26} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // adding custom header title as navigation bar option
  {
    {
      navigation.setOptions({headerTitle: customHeaderTitle});
    }
  }

  // annuncement date function

  const bulletinDate = () => {
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
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();
    const today = date + ' ' + month + ', ' + year + '.';
    setToday(today);
  };
  // set date
  useEffect(() => {
    bulletinDate();
  });

  return (
    <View>
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          marginRight: 10,
          marginBottom: 5,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        Today's Bulletin
      </Text>
      <Text style={{marginLeft: 10, marginRight: 10, fontSize: 16}}>
        {todaysDate}
      </Text>

      <Text
        style={{
          alignSelf: 'center',
          marginLeft: 10,
          marginRight: 10,
          marginTop: '50%',
          fontSize: 20,
        }}>
        Today's Bulletin is on the way
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
