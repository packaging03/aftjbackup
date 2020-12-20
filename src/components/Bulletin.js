import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Share,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
import Iconn from 'react-native-vector-icons/AntDesign';
import { color } from 'react-native-reanimated';

export default function Bulletin({navigation}) {
  const [todaysDate, setToday] = useState('');
  const [selected, setSelected] = useState(false);
  const [shareValue, setShareValue] = useState('First Anniversary Celebration');

  function ordinal(number) {
    switch (number) {
      case 1:
      case 21:
        return number + 'st';
        break;
      case 2:
      case 22:
        return number + 'nd';
        break;
      case 3:
      case 23:
        return number + 'rd';
        break;
      default:
        return number + 'th';
    }
  }

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
    const today = ordinal(date) +  ' ' + month + ', ' + year;
    setToday(today);
  };

  React.useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.iconContainer}>
          <Icon
            onPress={()=>{
              if(selected){
                result = Share.share({message: shareValue})
              }else{
                alert('Please click the text to select it')
              }
            }}
            size={28}
            name="share-social-outline"
          />
          <Iconn
            onPress={() => alert('Sharing bulletin to..')}
            size={28}
            name="upload"
          />
        </View>
      ),
    }, [navigation]);
  })

  const shareHandle = ()=>{
    selected? setSelected(false):setSelected(true);
  }

  useEffect(() => {
    bulletindate();
  });
  return (
    // <SafeAreaView style={{flex: 1}}>
      <View style={styles.bulletin}>
      {/* <View style={{backgroundColor: '#000', margin: 20, height: 150, borderRadius: 10}}>
          <ImageBackground
            style={styles.img}
            source={require('../assets/join_us.jpg')}
          />
        </View> */}
        <StatusBar backgroundColor="transparent" translucent />

        <Text
          style={{
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 5,
            fontSize: 20,
            fontFamily:'Nunito-Regular'
          }}>
          Today's Bulletin
        </Text>
        <Text style={{marginLeft: 10, marginRight: 20, fontSize: 12,fontFamily:'Nunito-Light', borderRadius: 10}}>
          {todaysDate}
        </Text>
        {/* <View style={styles.bcontainer}> */}
          <TouchableOpacity>
        <Text onPress={shareHandle} style={{...styles.text, color: selected? 'red': 'black'}}>{shareValue}</Text>
          </TouchableOpacity>
          
        {/* </View> */}
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bulletin: {
    flex:1,
    backgroundColor:'white'
  },
  bcontainer: {
    // marginTop: '35%',
    alignItems: 'center',
    alignSelf:'center',
    display:'flex',
    // alignContent:'center',
    justifyContent:'center'
   
  },
  button: {
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#c5cad2',
    borderRadius: 10,
  },
  text: {
    // marginLeft: 20,
    // marginRight: 20,
    color: '#000',
    fontSize: 18,
    marginTop: 25,
    marginLeft: 10,
    fontFamily:'Nunito-Light'
    
  },

  iconContainer: {
    width: 90,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },

  img: {
    height: 150,
    opacity: 0.4,
  },
});
