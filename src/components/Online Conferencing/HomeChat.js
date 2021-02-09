import React, {useState, useEffect, useRef} from 'react';
import { _ScrollView } from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';
// import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {PermissionsAndroid} from 'react-native';
import { Platform } from 'react-native';


const HomeChat = ({navigation, accessToken, user})=>{

    const [micOn, setMicOn] = useState();
    const [videoOn, setVideoOn] = useState();
    const {width} = Dimensions.get('window');
    const [swiperOn, setSwiperOn] = useState(true);
    const [swiperOn1, setSwiperOn1] = useState(false);
    const [showTestButton, setShowTestButton] = useState(false);
    const [userData, setUserData] = useState();
    const [visibility, setVisibility]  =  useState();
    const [leave, setLeave] = useState(true);

    /*const AgoraEngine = useRef();

    const init = async ()=>{
        AgoraEngine.current = await RtcEngine.create('1a85096b8bfb4156ba864148658f470d');
        AgoraEngine.current.enableVideo();
        AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
    };

    async function requestCameraAndAudioPermission(){
        try{
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);

            if(
                granted['android.permission.RECORD_AUDIO']=== PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
            ){
                console.log('you can use the camera and mic');
            }else{
                console.log('Permission Denied');
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(Platform.OS === 'android') requestCameraAndAudioPermission();
        init();
        return ()=>{
            AgoraEngine.current.destroy();
        };
    }, []);*/

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
            
                <TouchableOpacity style={styles.leave}>
                    <View style={styles.button}>
                        <Text style={{fontSize:16, color:'#fff'}}>Leave</Text>
                    </View>
                </TouchableOpacity>
        
                
            ),
        }, [navigation]);
    })

    var firebaseChats = require("firebase");

    const firebaseChatsConfig = {
    databaseURL: 'https://aftj-chats-default-rtdb.firebaseio.com/',
    projectId: 'aftj-chats'
    };

    if(!firebaseChats.apps.length){
        firebaseChats.initializeApp(firebaseChatsConfig);
    }

    useEffect(()=>{
        firebaseChats.database().ref('Conference/').once('value', function(snapshot){
            var data=[]
            snapshot.forEach(function(userSnapshot){
                var userKey = userSnapshot.key;
                var userData = userSnapshot.val();

                data.push(userData)
            })
            console.log(JSON.stringify(data))
            setUserData(data)
        })
    })

    useEffect(()=>{
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).once('value', function(snapshot){
            var data= snapshot.val();
            if(data.visibility=='1'){
                setVisibility(true)
            }else{
                setVisibility(false)
            }
        })
    }, [])

    const toggleMicrophone = ()=>{
        setMicOn(!micOn)
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).update({'audioActive': micOn? '0':'1'})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))

    }

    const toggleVideo = ()=>{
        setVideoOn(!videoOn)
        firebaseChats.database().ref('Conference/'+JSON.parse(user).id).update({'videoActive': videoOn? '0':'1'})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))

    }

    const delay = ()=>{
        setSwiperOn(!swiperOn)
        setSwiperOn1(!swiperOn1)
        setShowTestButton(false)
    }

    const swipe = ()=>{
        setTimeout(delay, 600)
    }

    const goToParticipants = ()=>{
        navigation.navigate('Participant')
    }

    const goToChats = ()=>{
        navigation.navigate('AnonymousChats')
    }

    var Width = Dimensions.get('window').width;
    var Height = Dimensions.get('window').height;

    return(
        <View style={styles.container}>
            <View style={{width:'100%', height:60, justifyContent:'flex-end', alignItems:'center', flexDirection: 'row', paddingRight:25}}>
                <View style={{...styles.scrollIndicator, marginRight: showTestButton?'22%':'39%'}}>
                    <View style={{...styles.scroll1, backgroundColor: swiperOn? 'black': 'grey'}}></View>
                    <View style={{...styles.scroll2, backgroundColor: swiperOn1? 'black':'grey'}}></View>
                </View>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={swipe}
                showsHorizontalScrollIndicator={false}>
                    <View style={{backgroundColor: '#e2e2e2', flex:1, width: width}}>
                        <View style={styles.roundImageBorder}>
                            <View style={styles.roundsecond}>
                                <View style={styles.roundThird}>
                                    {visibility?
                                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: JSON.parse(user).image}} />:
                                    <Image style= {{ width: 80, height: 80}} source={require('../../assets/user.png')} />}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#e2e2e2', flex:1, width: width, justifyContent:'center', alignItems:'center'}}>
                        <FlatList
                            data = {userData}
                            keyExtractor={(item, index) => item.id}
                            numColumns={2}
                            style={{width:'100%'}}
                            renderItem={({item}) => (
                                <View style={styles.cards}>
                                    <View style={styles.img}>
                                        {item.visibility=='1'?
                                        <Image style= {{ width: '100%', height: '100%', alignSelf:'center'}} source={{uri: item.image}} />:
                                        <Image style= {{ width: 40, height: 40, alignSelf:'center'}} source={require('../../assets/user.png')}/>}
                                        {micOn?
                                        <Image style= {{ width: 25, height: 25, alignSelf:'flex-start', position:'absolute', top:'80%', left:'2%'}} source={require('../../assets/micro-on.png')}/>:
                                        <Image style= {{ width: 25, height: 25, alignSelf:'flex-start', position:'absolute', top:'80%', left:'2%'}} source={require('../../assets/micro-off.png')}/>}
                                    </View>
                                    <Text style={{fontSize: 16, margin:5}}>{item.name}</Text>
                                </View>
                            )}   
                        />
                        
                        
                    </View>
            </ScrollView>
            <View style={styles.navigation}>
                <View style={styles.items}>
                    <TouchableOpacity onPress={toggleMicrophone}>
                        {micOn?<Image style= {{width: 23, height: 23}} source={require('../../assets/mic.png')}/>:
                        <Image style= {{width: 23, height: 23}} source={require('../../assets/mic-off.png')}/>}
                    </TouchableOpacity>
                    <Text style={{fontSize:10}}>Audio</Text>    
                </View>
                <View style={styles.items}> 
                    <TouchableOpacity onPress={toggleVideo}>
                        {videoOn?<Image style= {{width: 23, height: 23}} source={require('../../assets/video.png')}/>:
                        <Image style= {{width: 23, height: 23}} source={require('../../assets/video-off.png')}/>}
                    </TouchableOpacity>
                    <Text style={{fontSize:10}}>Video</Text>    
                </View>
                <View style={styles.items}>
                    <TouchableOpacity onPress={goToChats}>
                        <Image style= {{width: 23, height: 23}} source={require('../../assets/chats.png')}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:10}}>Chats</Text>   
                </View>
                <View style={styles.items}>
                    <TouchableOpacity onPress={goToParticipants}>
                        <Image style= {{width: 25, height: 25}} source={require('../../assets/participants.png')}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:10}}>Participants</Text>    
                </View>
            </View>
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
        marginTop:'40%',
        borderRadius: 220,
        justifyContent:'center',
        alignItems:'center'
    },

    img:{
        width: '100%',
        height: '80%',
        backgroundColor: '#c5cad3',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
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
        flex:0.5,
        margin:7,
        padding:2,
        height: 190,
        backgroundColor:'#fff',
        borderRadius: 10,
    },

    leavePage:{
        position:'absolute',
        backgroundColor:'black',
        bottom:50
    },

    roundsecond:{
        width:200,
        height:200,
        backgroundColor:'#fff',
        borderRadius:200,
        justifyContent:'center',
        alignItems:'center'
    },

    button:{
        alignSelf: 'center',
        width: '100%',
        height: 35,
        backgroundColor: 'red',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    leave:{
        width:'180%',
        height:35,
        marginRight:25
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

    pagination:{
        flex: 1,
        backgroundColor: '#e2e2e2'
    },

    pagination1:{
        width: '100%',
        height:600,
        backgroundColor: '#e2e2e2'
    },

    pagination2:{
        width: '100%',
        height:600,
        backgroundColor: '#e2e2e2'
    },

    navigation:{
        width: '100%',
        height: '10%',
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 50
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(HomeChat);