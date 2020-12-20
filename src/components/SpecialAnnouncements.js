import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export default function SpecialAnnouncements({navigation}) {
  const [todayDate, setToday] = useState('');

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

  useEffect(() => {
    announcementdate();
  });
  return (
    <SafeAreaView style={{flex: 1}}>
    <StatusBar backgroundColor="transparent" translucent />
      <View style={styles.announcements}>
        
        <ImageBackground
          style={styles.img}
          imageStyle={styles.imgStyle}
          source={require('../assets/join_us.jpg')}>
          <View style={styles.overlay} />
      </ImageBackground>

        <Text
          style={{
            marginLeft: 20,
            marginTop: 0,
            marginRight: 10,
            marginBottom: 10,
            fontFamily: 'Nunito-Regular',
            fontSize: 20,
          }}>
          Special Annoucement from Our Pastor
        </Text>
        <Text style={{marginLeft: 20, marginRight: 20, fontSize: 12}}>
          {todayDate}
        </Text>
        <View style={styles.bcontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Announcements')}>
            <Text style={styles.text}>
               CLICK HERE FOR SPECIAL ANNOUNCEMENTS
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  announcements: {
    width: '100%',
    height: '100%',
  },
  bcontainer: {
    marginTop: '35%',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    height: 70,
  },
  button: {
    paddingTop: 10,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 5,
    backgroundColor: '#c5cad2',
  },
  text: {
    color: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    fontWeight: '300',
    paddingBottom: 4,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
  img: {
    width: '97.3%',
    height: 150,
    margin: 10,
    marginTop: -10,
  },
  imgStyle: {
    resizeMode: 'cover',
    borderRadius: 12,
  },
  overlay: {
    width: '97.3%',
    height: 150,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    borderRadius: 12,
  },
});
