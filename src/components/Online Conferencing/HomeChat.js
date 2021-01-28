import React, {useState, useEffect} from 'react';
import { _ScrollView } from 'react-native';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, FlatList} from 'react-native';
import {connect} from 'react-redux';

const HomeChat = ({navigation, accessToken, user})=>{

    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const {width} = Dimensions.get('window');
    const [swiperOn, setSwiperOn] = useState(true);
    const [swiperOn1, setSwiperOn1] = useState(false);
    const [showTestButton, setShowTestButton] = useState(false);
    const [userData, setUserData] = useState();
    const [turnOnVisibility, setTurnOnVisibility] = useState(true)

    useEffect(()=>{
        if(accessToken==null){
            alert('Please Login to access this page')
        }else{
            
            fetch('https://church.aftjdigital.com/api/users', {
                method: 'GET',
                headers: {
                Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                },
                        
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    //console.log(responseJson)
                    setUserData(JSON.stringify(responseJson))
                })
                .catch((error) => {
                alert(error)}
            );
        }
        
    })

    const toggleMicrophone = ()=>{
        setMicOn(!micOn)
    }

    const toggleVideo = ()=>{
        setVideoOn(!videoOn)
    }

    const delay = ()=>{
        setSwiperOn(!swiperOn)
        setSwiperOn1(!swiperOn1)
        setShowTestButton(false)
    }

    const swipe = ()=>{
        setTimeout(delay, 600)
    }

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
                    <Text style={{fontSize:16}}>Turn Off Visibility</Text>:
                    <Text style={{fontSize:16}}>Turn On Visibility</Text>}
                </View>
            </TouchableOpacity>
        )
    }

    const tuneVoice =()=>{
        setShowTestButton(!showTestButton)
        
    }

    const offVisibility = ()=>{
        setTurnOnVisibility(!turnOnVisibility)
    }

    const gotToTestVoice = ()=>{
        navigation.navigate('TestVoice')
    }

    const Button2 = ()=>{
        return(
            <TouchableOpacity onPress={gotToTestVoice}>
                <View style={styles.button3}>
                    <Text style={{fontSize:16}}>Test Voice</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const FakeButton = ()=>{
        return(
            <TouchableOpacity>
                <View style={styles.fakeButton}></View>
            </TouchableOpacity>
        )
    }

    const goToParticipants = ()=>{
        navigation.navigate('Participants')
    }

    const goToChats = ()=>{
        navigation.navigate('AnonymousChats')
    }

    return(
        <View style={styles.container}>
            <View style={{width:'100%', height:60, justifyContent:'flex-end', alignItems:'center', flexDirection: 'row', paddingRight:25}}>
                <View style={{...styles.scrollIndicator, marginRight: showTestButton?'22%':'39%'}}>
                    <View style={{...styles.scroll1, backgroundColor: swiperOn? 'black': 'grey'}}></View>
                    <View style={{...styles.scroll2, backgroundColor: swiperOn1? 'black':'grey'}}></View>
                </View>
                {showTestButton?<Button2/>:<FakeButton/>}
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
                                    {turnOnVisibility?
                                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: JSON.parse(user).image}} />:
                                    <Image style= {{ width: 80, height: 80}} source={require('../../assets/user.png')} />}
                                </View>
                            </View>
                        </View>
                        <Button/>
                        <Button1/>
                    </View>
                    <View style={{backgroundColor: '#e2e2e2', flex:1, width: width, justifyContent:'center', alignItems:'center'}}>
                        <FlatList
                            data = {userData?JSON.parse(userData):()=>{alert('Network error')}}
                            keyExtractor={(item, index) => item.id}
                            numColumns={2}
                            renderItem={({item}) => (
                                <View style={styles.cards}>
                                    <View style={styles.img}>
                                        <Image style= {{flex:1, width: '100%', height: '100%', alignSelf:'center'}} source={{uri: item.image}} />
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
        marginTop:'20%',
        borderRadius: 220,
        justifyContent:'center',
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