import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/AntDesign';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Schedulecalendar({navigation}) {
  const [activeDate, setActiveDate] = useState(new Date());

  const months = [
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

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const changeMonth = n => {
    var calend = new Date();
    // calend = activeDate;
    // console.log(calend.getFullYear());
    // console.setFullYear(activeDate.getFullYear());
    calend.setFullYear(activeDate.getFullYear());
    calend.setMonth(activeDate.getMonth() + n);
    setActiveDate(calend);
  };

  const generateMatrix = () => {
    var matrix = [];
    // Create header
    matrix[0] = weekDays;

    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = nDays[month];

    //check for february
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  };

  var matrix = generateMatrix();
  var rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <Text
          style={{
            flex: 1,
            // height: 18,
            fontFamily: 'Nunito-Regular',
            fontSize: 14,
            lineHeight: 22,
            // textAlign: 'center',
            // Highlight header
            // Highlight Sundays
            color: colIndex == 0 ? '#a00' : '#fff',
            // Highlight current date
            fontWeight: item == activeDate.getDate() ? 'bold' : '',
          }}>
          {item != -1 ? item : ''}
        </Text>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {rowItems}
      </View>
    );
  });

  {
    {
      navigation.setOptions({
        headerRight: () => (
          <Iconn
            name="plussquareo"
            size={25}
            backgroundColor="#fff"
            color="#000"
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('Bookappointment')}
          />
        ),
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cal}>Calendar</Text>
      <View style={styles.cal_container}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Icon
            name="navigate-before"
            size={25}
            color={'#87C289'}
            style={styles.iconright}
            onPress={() => changeMonth(-1)}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              color: 'white',
            }}>
            {months[activeDate.getMonth()]} &nbsp;
            {activeDate.getFullYear()}
          </Text>
          <Icon
            name="navigate-next"
            size={25}
            color={'#87C289'}
            style={styles.iconLeft}
            onPress={() => {
              changeMonth(1);
            }}
          />
        </View>
        {rows}
      </View>
      <TouchableOpacity
        style={styles.book}
        onPress={() => navigation.navigate('Bookappointment')}>
        <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  cal: {
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '3%',
    fontFamily: 'Nunito-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
  cal_container: {
    flex: 0.5,
    backgroundColor: '#000',
    paddingTop: '5%',
    borderRadius: 10,
    marginLeft: '5%',
    marginRight: '5%',
  },
  iconLeft: {
    alignSelf: 'center',
    marginLeft: '2%',
    marginBottom: 5,
  },
  iconright: {
    alignSelf: 'center',
    marginRight: '2%',
    marginBottom: 5,
  },
  book: {
    position: 'absolute',
    top: 400,
    left: 48,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#C5CAD2',
    width: 264,
    height: 44,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
});
