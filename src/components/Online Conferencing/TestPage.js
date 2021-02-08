import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useEffect} from 'react';
import { _ScrollView } from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';

const TestPage = ({navigation, accessToken, user})=>{

    const {width} = Dimensions.get('window');
    const [showTestButton, setShowTestButton] = useState(false);
    const [turnOnVisibility, setTurnOnVisibility] = useState();

    var firebaseChats = require("firebase");

    const firebaseChatsConfig = {
    databaseURL: 'https://aftj-chats-default-rtdb.firebaseio.com/',
    projectId: 'aftj-chats'
    };

    if(!firebaseChats.apps.length){
        firebaseChats.initializeApp(firebaseChatsConfig);
    }

    useEffect(()=>{
        if(accessToken==null){
            alert('Please Login to access this page')
        }else{
            
            firebaseChats.database().ref('Conference/'+JSON.parse(user).id).set({'name': JSON.parse(user).name, 'activity':'0', 'visibility':'0', 'tuneVoice':'0', 'audioActive': '0', 'videoActive':'0', 'image':JSON.parse(user).image, 'host':'0'})
            .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))
        }
        
    }, [])

    useEffect(()=>{
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).once('value', function(snapshot){
            var data= snapshot.val();
            if(data.tuneVoice=='1'){
                setShowTestButton(true)
            }else{
                setShowTestButton(false)
            }
        })

        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).once('value', function(snapshot){
            var data= snapshot.val();
            if(data.visibility=='1'){
                setTurnOnVisibility(true)
            }else{
                setTurnOnVisibility(false)
            }
        })

    }, [])

    useEffect(()=>{
        return ()=>{
            firebaseChats.database().ref('Conference/'+JSON.parse(user).id).remove()
            .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))
        }
    }, [])

    const Button = ()=>{
        return(
            <TouchableOpacity onPress={tuneVoice}>
                <View style={styles.button}>
                    {showTestButton?<Text style={{fontSize:16}}>Untune Voice</Text>:
                    <Text style={{fontSize:16}}>Tune Voice</Text>}
                </View>
            </TouchableOpacity>
        )
    }

    const Button1 = ()=>{
        return(
            <TouchableOpacity onPress={offVisibility}>
                <View style={styles.button2}>
                    {turnOnVisibility?
                    <Text style={{fontSize:16}}>Turn On Visibility</Text>:
                    <Text style={{fontSize:16}}>Turn Off Visibility</Text>}
                </View>
            </TouchableOpacity>
        )
    }

    const JoinButton = ()=>{
        return(
            <TouchableOpacity onPress={()=>{navigation.navigate('OnlineConference')}}>
                <View style={styles.join}>
                    <Text style={{fontSize:16, color:'#fff'}}>Join Meeting</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const tuneVoice =()=>{
        setShowTestButton(!showTestButton)
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).update({'tuneVoice': showTestButton? '0':'1'})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))

        navigation.navigate('TestVoice')
    }

    const offVisibility = ()=>{
        setTurnOnVisibility(!turnOnVisibility)
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).update({'visibility': turnOnVisibility? '0':'1'})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))
    }

    return(
        <View style={styles.container}>
            
            <ScrollView
                showsHorizontalScrollIndicator={false}>
                    <View style={{backgroundColor: '#e2e2e2', flex:1, width: width}}>
                        <View style={styles.roundImageBorder}>
                            <View style={styles.roundsecond}>
                                <View style={styles.roundThird}>
                                    {turnOnVisibility?
                                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: JSON.parse(user).image}} />:
                                    <Image style= {{ width: 80, height: 80}} source={require('../../assets/user.png')} />}
                                </View>
                            </View>
                        </View>
                        <Button/>
                        <Button1/>
                        <JoinButton/>
                    </View>
                    
            </ScrollView>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#e2e2e2',
        flexDirection: 'column'
    },

    roundImageBorder:{
        width:220, 
        height:220, 
        backgroundColor:'#f7f7f7', 
        alignSelf:'center', 
        marginTop:'30%',
        borderRadius: 220,
        justifyContent:'center',
        alignItems:'center'
    },

    button:{
        alignSelf: 'center',
        marginTop:'10%',
        width: '65%',
        height: 45,
        backgroundColor: '#c5cad3',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 0.3
    },

    button2:{
        alignSelf: 'center',
        marginTop:'5%',
        width: '65%',
        height: 45,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },

    join:{
        alignSelf: 'center',
        marginTop:'30%',
        width: '65%',
        height: 45,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 0.2,
        backgroundColor: '#1F78B4'
    },

    button3:{
        alignSelf: 'center',
        marginTop:'5%',
        width: '140%',
        height: 40,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 4,
        backgroundColor: '#c5cad3',
        
    },

    img:{
        width: '100%',
        height: '80%',
        backgroundColor: '#c5cad3',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        overflow: 'hidden'
    },

    fakeButton:{
        alignSelf: 'center',
        marginTop:'5%',
        width: '140%',
        height: 40,
        borderRadius: 5,
        elevation: 4,
    },

    cards:{
        width: '43%',
        height: 180,
        backgroundColor:'#fff',
        borderRadius: 10,
        marginLeft: '5%',
        marginTop: '5%'
    },

    roundsecond:{
        width:200,
        height:200,
        backgroundColor:'#fff',
        borderRadius:200,
        justifyContent:'center',
        alignItems:'center'
    },

    roundThird:{
        width:180,
        height:180,
        backgroundColor:'#c5cad3',
        borderRadius:180,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },

    scrollIndicator:{
        width: '15%',
        height:20,
        alignSelf: 'center',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end',
        marginTop:20,
    },

    scroll1:{
        width:10,
        height:10,
        borderRadius:10
    },

    scroll2:{
        width:10,
        height:10,
        borderRadius:10
    },

    items:{
        flexDirection:'column', 
        justifyContent:'space-around', 
        alignItems:'center'
    }
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(TestPage);