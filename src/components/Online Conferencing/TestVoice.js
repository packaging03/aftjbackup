import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const TestVoice = ({navigation})=>{

    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [selectedUser, setSelectedUser] = useState(true);

    const toggleMicrophone = ()=>{
        setMicOn(!micOn)
    }

    const toggleVideo = ()=>{
        setVideoOn(!videoOn)
    }

    const goToParticipants = ()=>{
        navigation.navigate('Participants')
    }

    const goToChats = ()=>{
        navigation.navigate('AnonymousChats')
    }

    const Button = ()=>{
        return(
            <TouchableOpacity onPress={()=>{navigation.navigate('Test')}}>
                <View style={styles.button}>
                    <Text style={{fontSize:16}}>Select Voice</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <TouchableWithoutFeedback style={styles.card} onPress={()=>{setSelectedUser(!selectedUser)}}>
                    
                        <View style={{...styles.male, backgroundColor: selectedUser? '#c5cad3':'#fff'}}>
                            <Image style= {{ width: 20, height: 20, marginLeft:20, marginRight:10}} source={require('../../assets/male-user.png')} />
                            <Text style={{fontSize:16}}>Male Voice</Text>
                            <Image style= {{ width: 20, height: 20, marginLeft:'52%'}} source={require('../../assets/play-button.png')} />
                        </View>
                        <View style={{...styles.female, backgroundColor: selectedUser? '#fff':'#c5cad3'}}>
                            <Image style= {{ width: 20, height: 20, marginLeft:20, marginRight:10}} source={require('../../assets/female.png')} />
                            <Text style={{fontSize:16}}>Female Voice</Text>
                            <Image style= {{ width: 20, height: 20, marginLeft:'47%'}} source={require('../../assets/play-button.png')} />
                        </View>
                    
                </TouchableWithoutFeedback>

                <Button/>
            </View>
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        flexDirection: 'column'
    },

    main:{
        flex:1,
    },

    card:{
        width: '80%',
        height:'40%',
        backgroundColor:'#fff',
        alignSelf:'center',
        marginTop:'45%',
        borderRadius: 10,
        elevation: 4
    },

    male:{
        width:'100%',
        height:'35%',
        marginTop: 20,
        flexDirection:'row',
        alignItems:'center'
    },

    female:{
        width:'100%',
        height:'35%',
        marginTop: 10,
        flexDirection:'row',
        alignItems:'center'
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

    items:{
        flexDirection:'column', 
        justifyContent:'space-around', 
        alignItems:'center'
    },

    button:{
        alignSelf: 'center',
        marginTop:'15%',
        width: '65%',
        height: 45,
        backgroundColor: '#c5cad3',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 0.3
    },
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(TestVoice);