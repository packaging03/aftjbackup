import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Iconn from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Announcements({navigation}) {
  const [todayDate, setToday] = useState('');

  //custom title header
  function customHeaderTitle() {
    return (
      <View style={styles.headerContainer}>
        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
          Announcements
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 15}}>
            <Icon name="share-social-outline" color="#ffffff" size={26} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Iconn name="upload" color="#ffffff" size={26} />
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

  const announcementdate = () => {
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
    announcementdate();
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
        }}>
        Special Annoucement
      </Text>
      <Text style={{marginLeft: 10, marginRight: 10, fontSize: 12}}>
        {todayDate}
      </Text>

      <View style={styles.bcontainer}>
          
            <Text style={styles.text}>View Pdf File</Text>
          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bcontainer: {
    marginTop: '53%',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    height: 70,
  },
  text: {
    marginLeft: 20,
    marginRight: 20,
    color: '#000',
    fontSize: 20,
    fontFamily:'Nunito-Light',
    alignSelf: 'center',
  },
});
