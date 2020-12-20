import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export default function NewBulletin({navigation}) {
  const [todayDate, setToday] = useState('');

  const bulletindate = () => {
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
    bulletindate();
  });
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.announcements}>
      <Image
        style={styles.img}
        source={require('../assets/bulletin.png')}/>

      <Text
        style={{
          marginLeft: 20,
          marginBottom: 2,
          fontSize: 20,
          marginTop:16,
          fontFamily:'Nunito',
          letterSpacing:0.5,
          lineHeight:24
        }}>
        Bulletin
      </Text>
      <Text style={{
        marginLeft: 20, 
        lineHeight:16, 
        letterSpacing:0.5, 
        fontFamily:'Nunito', 
        marginRight: 20, fontSize: 12}}>
        {todayDate}
      </Text>
      <CustomButton buttonStyle={{width:500, alignSelf:'center', marginTop:'40%'}}
          onPress={() => navigation.navigate('Bulletin')}>
             CLICK HERE FOR TODAY'S BULLETIN
        
        </CustomButton>
    </View>
  </SafeAreaView>

    );
}

const styles = StyleSheet.create({
  announcements: {
    flex:1
    // backgroundColor:'red'
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
    width: 260,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#c5cad2',
  },
  text: {
    color: '#000',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    fontWeight: '300',
    paddingBottom: 4,
    fontSize: 14,
    alignSelf: 'center',
  },
  img: {
    width: '95%',
    height: 150,
    resizeMode: 'stretch',
    marginRight: 10,
    marginLeft:10,
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
