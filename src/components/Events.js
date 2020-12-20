/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, Image, 
  TouchableWithoutFeedback} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Moment from 'moment';


  const Item = ({date, title, onPress}) => (

    <TouchableWithoutFeedback onPress={onPress}>
        <View style={{
            display:'flex',
            width:'100%',
            paddingTop:14,
            paddingBottom:14,
            flexDirection:'row',
        }}>
            <Text style={{
                marginLeft:20,
                fontWeight:'400',
                color:'#000',
                fontSize:16,
                letterSpacing:0.5,
                marginRight:5,
                lineHeight:24,
                fontFamily: 'Nunito',
                marginRight:15,
                alignSelf:'center'
            }}>{Moment(date).format('DD MMM').toUpperCase()}</Text>
           
         <Text style={{
                marginLeft:20,
                fontWeight:'600',
                color:'#000',
                fontSize:14,
                letterSpacing:0.5,
                marginRight:5,
                lineHeight:24,
                textTransform: 'capitalize',
                fontFamily: 'Nunito',
                width:'60%',
                alignSelf:'center'
            }}>{title}</Text>

         </View>
      </TouchableWithoutFeedback>
  )

const Events = ({navigation}) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
  try {
    let response = await fetch(
      'https://church.aftjdigital.com/api/events'
    );
    let json = await response.json();
    console.log(json.data);
    setData(json.data);
    setLoading(false);
  } catch (error) {
    console.error(error);
  }
};

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#c4c4c4',
        marginLeft: '1%',
      }}
    />
  );
};
  useEffect(() => {

    getData();
  }, []);

    const renderItem = ({item}) => (

        <Item title={item.title} date ={item.event_date} 
        onPress={() =>
             navigation.navigate('EventDetails', 
              {eventName: item.title,
                 date: item.event_date,
                  time:item.event_time,
                   venue:item.venue}) } />
    );


    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.events}>

                <Image 
                  style={styles.img}
                  source={require('../assets/events.png')} >
                     
                  </Image>
              
                
                <Text style={{
                  marginLeft:20, 
                  marginTop:16, 
                  marginBottom:10,
                  fontSize:18, 
                  lineHeight:32,
                  letterSpacing:0.5,
                  fontWeight:'600', fontFamily: 'Nunito',}}>EVENTS</Text>
                {isLoading ? <ActivityIndicator/> : (
                <FlatList
                 data={data} 
                 renderItem={renderItem} 
                 ItemSeparatorComponent={renderSeparator}
                 keyExtractor={item => item.id.toString()}/>
                )}

            </View>
        </SafeAreaView>
    )
}

export default Events;
const styles = {

    events :{
       
      width:'100%',
      height:'100%',

    },
    img:{
      height: 150,
      resizeMode: 'stretch',
      width: '95%',
      marginTop: 20,
      marginLeft:20,
      marginRight:20,
      alignSelf: 'center',
    },
    imgStyle: {
      resizeMode: 'cover',
      borderRadius: 10,
    },
}