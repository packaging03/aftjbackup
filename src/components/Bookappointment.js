import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Bookappointment() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const getToday = () => {
    var date = new Date();

    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    // console.log(months[date.getMonth] + ' ' + months.getDate);
    // return months[date.getMonth] + ' ' + months.getDate;
    return 'Today';
  };
  const handleConfirm = date => {
    var apdate = String(date).split(' ');

    setAppointmentDate('  ' + apdate[1] + ' ' + apdate[2]);
    hideDatePicker();
  };
  useEffect(() => {
    var date = new Date();

    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    setAppointmentDate(' ' + months[date.getMonth()] + ' ' + date.getDate());
  }, [1]);
  return (
    <ScrollView style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.title}>Book an Appointment</Text>
      <Text style={styles.caption}>Name</Text>
      <TextInput style={styles.input} />
      <Text style={styles.caption}>Marital Status</Text>
      <TextInput style={styles.input} />
      <Text style={styles.caption}>Departmen (Optional)</Text>
      <TextInput style={styles.input} />
      <Text style={styles.caption}>Reason in Summary</Text>
      <TextInput multiline={true} style={styles.inputBox} />
      <Text style={styles.caption}>Pick a Date</Text>
      <View style={styles.datepicker}>
        <TextInput
          style={styles.inputPicker}
          value={appointmentDate}
          //   editable={false}
          onPress={showDatePicker}
        />
        <View style={styles.pickerBox}>
          <IconM
            name="calendar-blank-outline"
            size={32}
            backgroundColor="#fff"
            color="#000"
            style={styles.icon}
            onPress={showDatePicker}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.book}
        onPress={() => navigation.navigate('Bookappointment')}>
        <Text style={{color: '#000', fontSize: 18, alignSelf: 'center'}}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    lineHeight: 16,
    margin: 10,
    fontWeight: '600',
  },
  input: {
    marginBottom: 15,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 4,
    height: 38,
  },
  inputPicker: {
    fontSize: 14,
    width: '89%',
    fontFamily: 'Nunito-Regular',
    height: 38,
  },
  caption: {
    marginTop: 5,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 2,
    fontFamily: 'Nunito-Regular',
  },
  inputBox: {
    marginBottom: 15,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 4,
    height: 98,
  },
  book: {
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
    marginTop: '10%',
    marginBottom: '10%',
  },
  datepicker: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    height: 38,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    marginBottom: 15,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 4,
  },
  pickerBox: {
    alignContent: 'center',
    width: '11%',
    height: 37,
    borderLeftColor: '#C4C4C4',
    borderLeftWidth: 1,
  },
  icon: {
    alignSelf: 'center',
    margin: '1%',
  },
});
