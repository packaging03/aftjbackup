import React from 'react';
import {View, Text, Image, ImageBackground, TouchableWithoutFeedback,ScrollView, StatusBar} from 'react-native';
import { Title } from 'react-native-paper';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const EventDetails = ({route}) => {

    var day = new Date().getDate();
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
    
    const {eventName, date, time, venue} = route.params;

    return(

        <ScrollView>
        <View style={styles.eventDetails}>

        <StatusBar backgroundColor="#fff" barStyle="light-content" />
              <ImageBackground style={styles.img} source={require('../assets/church.jpg')} />
            

            <View style={{padding:15}}>
                <View style={styles.headerContainer} >
                        <View style={{width:'70%'}}>
                            <Title style={styles.titleText}>{eventName}</Title>
                            
                            <Text style={styles.dateText}>{ ordinal(Moment(date).get("D")) +  Moment(date).format( ' MMMM, YYYY')}</Text> 
                        </View>

                        <TouchableWithoutFeedback style={{height:'100%'}}>
                            <View style={{display:'flex', width:'30%',  justifyContent:'space-between',  alignItems:'center'}}>
                                 <Image style={{width:28, height:28}} source={require('../assets/navigate.jpg')} />
               
                                    {/* <Image style={{width:30, height:30}} source={require('../assets/directions_blue.png')} /> */}
                                    <Text style={{ fontFamily:'Nunito-Light', color:'#000', fontSize:14}}>Get Direction</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{

                        
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>

                    <View>
                        
                    </View>
                    <MapView      
                        key='AIzaSyASZZ81sDOHAEeNp_kIg4rtkURzdmV5YNM'
                        provider={PROVIDER_GOOGLE}
                        style={{height:100, 
                            marginTop:20,  
                            borderRadius:6,
                            overflow:'hidden',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,}} 
                        initialRegion={{
                        latitude: 33.874719,
                        longitude: -84.639779,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}

                      
                        // region={{ latitude: 42.882004, longitude: 74.582748,
                        // latitudeDelta: 0.0922,longitudeDelta: 0.0421 }} 
                        // showsUserLocation={true}
                         >
                              <Marker
                                key={'AIzaSyASZZ81sDOHAEeNp_kIg4rtkURzdmV5YNM'}
                                coordinate={{latitude: 33.8745141, longitude: -84.6397579}}
                                title={'JCCI Glory Tabernacle'}
                                description={'Rligious Organization'}
                            />
                         </MapView>

                    </View>
                    

                    <View style={styles.otherDetails}>
                        <Text style={styles.text}>Time: 
                         {Moment(time, "hh:mm:ss").format(" HH:mm a")}</Text>
                        <Text style={styles.text}>Date:  
                        { " "+ ordinal(Moment(date).get("D")) +  Moment(date).format( ' MMMM, YYYY')}
                        </Text>
                        <Text style={styles.text}>Location: {venue}</Text>
                    </View>

                </View>

            </View>
            </ScrollView>
           
    );
}

const styles = {

    text:{
        color:'black',
        marginBottom:10,
        fontFamily:'Nunito-Light',
        fontSize:14

    },
    otherDetails:{
        marginTop:20,
        backgroundColor:'#C5CAD2',
        display:'flex',
        borderRadius:10,
        width:'100%',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingTop:15,
        
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:'20%'
    },
    eventDetails:{
        width:'100%',
        height:'100%',
    },
    img:{
        
        height: 200,
        margin:10,
        borderRadius: 10,
        overflow: "hidden",
        
       
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        
   

    },
    titleText:{
        fontSize:18,
        fontFamily:'Nunito-Regular',
        textTransform:'capitalize'


    }, dateText:{
        fontSize:14,
        fontFamily:'Nunito-Light',
    }

}

export default EventDetails;