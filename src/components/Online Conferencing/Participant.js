import { useLinkProps } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';

const Participant = ({user})=>{

    const [toggleMic, setToggleMic] = useState(false);
    const [toggleVideo, setToggleVideo] = useState(false);
    const [participants, setParticipants] = useState();

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
            setParticipants(data)
        })
    })

    const ChatActive = ()=>{
        return(
            <View style={styles.activeContainer}>
                <View style={styles.chatActivity}></View>
            </View>                   
        )
    }

    const Card = (props)=>{
        return(
            <View style={styles.card}>
                <View style={styles.image}>
                    {props.visibility=='1'?
                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: props.images}} />:
                    <Image style= {{width: 30, height: 30, alignSelf:'center'}} source={require('../../assets/user.png')}/>}
                </View>
                <ChatActive/>
                <View style={{flex:1, paddingLeft:10}}>
                    <Text style={{fontSize:16}}>{props.name}</Text>
                    <Text style={{fontSize:12}}>Active now</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity>
                        {props.audio=='1'?
                        <Image style= {{width: 20, height: 20}} source={require('../../assets/micro-on.png')}/>:
                        <Image style= {{width: 20, height: 20}} source={require('../../assets/micro-off.png')}/>}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {props.video=='1'?
                        <Image style= {{width: 20, height: 20}} source={require('../../assets/vid-on.png')}/>:
                        <Image style= {{width: 20, height: 20}} source={require('../../assets/vid-off.png')}/>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>

            <FlatList
                data = {participants}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    <Card name = {item.name} images={item.image} audio={item.audioActive} video={item.videoActive} visibility={item.visibility}/>      
                )}   
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },

    card:{
        width:'100%',
        height: 75,
        backgroundColor:'#fff',
        marginTop: 10,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },

    icons:{
        width: '14%',
        height:40,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginRight: 25
    },

    image:{
        width: 60,
        height:60,
        backgroundColor:'#ccc',
        borderRadius: 70,
        marginLeft: 10,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    },

    chatActivity:{
        width: 10,
        height: 10,
        backgroundColor: 'green',
        borderRadius:10

    },

    activeContainer:{
        width: 15,
        height: 15,
        backgroundColor: 'white',
        position: 'absolute',
        right: '82%',
        top: '65%',
        borderRadius:15,
        justifyContent: 'center',
        alignItems:'center'
    },

    chatActivity2:{
        width: 10,
        height: 10,
        backgroundColor: '#d7d7d7',
        borderRadius:10

    },
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(Participant);