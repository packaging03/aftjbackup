import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import ToggleSwitch from 'toggle-switch-react-native';

export default function NotificationSettings() {
  const [isAnnouncementEnabled, setisAnnouncementEnabled] = useState(false);
  const [isBulletinEnabled, setisBulletinEnabled] = useState(false);
  const [isReminderEnabled, setisReminderEnabled] = useState(false);
  const toggleReminder = () => {
    setisReminderEnabled(previousState => !previousState);

    try {
      AsyncStorage.setItem('isReminderEnabled', '' + isReminderEnabled);
    } catch (e) {
      alert(e);
    }
  };
  const toggleBulletin = () => {
    setisBulletinEnabled(previousState => !previousState);

    try {
      AsyncStorage.setItem('isBulletinEnabled', '' + isBulletinEnabled);
    } catch (e) {
      alert(e);
    }
  };
  const toggleAnnouncement = () => {
    setisAnnouncementEnabled(previousState => !previousState);

    try {
      AsyncStorage.setItem('isAnnouncementEnabled', '' + isAnnouncementEnabled);
      console.log(isAnnouncementEnabled);
    } catch (e) {
      alert(e);
    }
  };
  const getSettings = () => {
    try {
      AsyncStorage.getItem('isAnnouncementEnabled').then(value => {
        value === 'true'
          ? setisAnnouncementEnabled(!true)
          : setisAnnouncementEnabled(!false);
      });

      AsyncStorage.getItem('isBulletinEnabled').then(value => {
        value === 'true'
          ? setisBulletinEnabled(!true)
          : setisBulletinEnabled(!false);
      });

      AsyncStorage.getItem('isReminderEnabled').then(value => {
        value === 'true'
          ? setisReminderEnabled(!true)
          : setisReminderEnabled(!false);
      });
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getSettings();
  }, [1]);
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.notification}>
        <Text style={styles.text}>Notification settings </Text>
      </View>
      
      <View style={styles.notification}>

        <Text style={styles.text}>Announcements</Text>

        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
          <ToggleSwitch
            onColor = "#219653"
            offColor = "#C4C4C4"
            onToggle={toggleAnnouncement}
            isOn={isAnnouncementEnabled}
          />
        </View>
      </View>
      
      <View style={styles.notification}>
        
        <Text style={styles.text}>Bulletins</Text>

        <View
          style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <ToggleSwitch
            onColor = "#219653"
            offColor = "#C4C4C4"
            onToggle={toggleBulletin}
            isOn={isBulletinEnabled}
          />
        </View>
      </View>
      
      <View style={styles.notification}>
        
        <Text style={styles.text}>Reminders</Text>

        <View
          style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <ToggleSwitch
            onColor = "#219653"
            offColor = "#C4C4C4"
            onToggle={toggleReminder}
            isOn={isReminderEnabled}
          />
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  notification: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc'
  },
  icon: {
    marginRight: 20,
    opacity: 0.6,
  },
  text: {
    fontSize: 14,
    width: '58%',
    fontFamily: 'Nunito',
  },
});
