import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, FlatList, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Icono from 'react-native-vector-icons/FontAwesome';

const ChatRoom = ({accessToken, user, route, navigation})=>{

    const [chat, setChat] = useState();
    const [activeSend, setActiveSend] = useState(true);
    const [image, setImage] = useState(route.params.image);
    const [chatData, setChatData] = useState('');
    

    var firebaseChats = require("firebase");

    const firebaseChatsConfig = {
    databaseURL: 'https://aftj-chats-default-rtdb.firebaseio.com/',
    projectId: 'aftj-chats'
    };

    if(!firebaseChats.apps.length){
        firebaseChats.initializeApp(firebaseChatsConfig);
    }

    useEffect(()=>{
        firebaseChats.database().ref('NormalChats/'+JSON.parse(user).id).once('value', function(snapshot){
            var data=[]
            snapshot.forEach(function(userSnapshot){
                var userKey = userSnapshot.key;
                var userData = userSnapshot.val();

                data.push(userData)
            })
            console.log(JSON.stringify(data))
            setChatData(data)
        })
    })

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft: () => (
                <View style={styles.iconContainer3}>
                   <TouchableOpacity onPress={()=>navigation.navigate('Chats')}>
                        <Image style= {{width: 23, height: 23}} source={require('../assets/backandroid.png')}/>    
                  </TouchableOpacity>
                  <View style={styles.headerImage}>
                        <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: route.params.image}} />
                  </View>
                  <View style={{marginLeft:'10%', width:'150%' }}>
                      <Text style={{fontSize:15}}>{route.params.name}</Text>
                      <Text style={{fontSize:10}}>Typing...</Text>
                  </View>
                </View>
            ),
            headerRight: () => (
                <View style={styles.iconContainer2}>
                  <TouchableOpacity>
                    <Image style= {{width: 23, height: 23}} source={require('../assets/video.png')}/>    
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image style= {{width: 18, height: 18}} source={require('../assets/call.png')}/>    
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image style= {{width: 18, height: 18}} source={require('../assets/menu.png')}/>    
                  </TouchableOpacity>
                </View>
            ),
        }, [navigation]);
    })

    const sendButton = ()=>{
        let today = new Date();
        let time = today.getHours()+":"+ today.getMinutes();
    
        /*let chats = chatMessages=>[...JSON.parse(chatMessages), {'message':text, 'time': time, 'date':date}]
        setChatMessage(JSON.stringify(chats))*/
    
        firebaseChats.database().ref('NormalChats/'+JSON.parse(user).id).push({'messages': chat, 'time': time, 'id':JSON.parse(user).id})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))

        firebaseChats.database().ref('NormalChats/'+route.params.agent_id).push({'messages': chat, 'time': time, 'id':JSON.parse(user).id})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))
    
        setChat("")
        Keyboard.dismiss()
    }

    const ChatCardSender = (props)=>{
        return(
            <View style={styles.chatCardContainer}>
                <View style= {styles.profileImage}>  
                    {image==null?
                        <Image style= {{flex: 1, width: '100%', height: '100%'}} source={require('../assets/profile-user.png')}/>:
                        <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: route.params.image }}/>}
                    
                </View>
                <View style={styles.chatCardMessage}>
                    <Text style={{color:'#fff', fontFamily: 'Nunito'}}>{props.message}</Text>
                    <View style={styles.credentials}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{route.params.name}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{props.time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const ChatCardReciever = (props)=>{
        return(
            <View style={styles.chatCardContainer2}>
                <View style={styles.chatCardMessage2}>
                    <Text style={{color:'#000', fontFamily: 'Nunito'}}>{props.message}</Text>
                    <View style={styles.credentials2}>
                        <Text style={{color: '#000', fontSize: 10, fontFamily: 'Nunito'}}>{JSON.parse(user).name}</Text>
                        <Text style={{color: '#000', fontSize: 10, fontFamily: 'Nunito'}}>{props.time}</Text>
                    </View>
                </View>
                <View style= {styles.profileImage}>
                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source = {{uri: JSON.parse(user).image}}/>
                </View>
            </View>
        )
    }

   
    const ChatBoxInactive = ()=>{
        return(
            <View style={styles.controls}>
                    <View style={styles.input2}>
                        <View style={{width:38, height:38, borderRadius:38, backgroundColor:'black', marginLeft:5, marginRight:5, justifyContent:'center', alignItems:'center'}}>
                            <Image style= {{width: 18, height: 18}} source={require('../assets/main.png')}/>
                        </View>
                        <TextInput
                            multiline={true}
                            placeholder={'Type a message here'}
                            style={{flex:1}}
                            onFocus={()=>{setActiveSend(false)}}
                            onChangeText={()=>{}}
                        />
                        <TouchableOpacity>
                            <Image style= {{width: 16, height: 25, marginRight:20}} source={require('../assets/sharp.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.chatFlow}>
                <FlatList
                    data={chatData}
                    keyExtractor={(item, index) => item.user_id}
                    renderItem={({item}) => (
                        item.agent_id==JSON.parse(user).id?
                        <ChatCardSender message={item.message} time={item.time}/>:
                        <ChatCardReciever message={item.message} time={item.time}/> 
                        
                    )}   
                />
            </View>
            <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-167}>
                <View style={styles.main}>
                    <View style={styles.box}>
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../assets/happy.png')}/>
                        </TouchableOpacity>
                        <TextInput
                            style={{flex:1}}
                            multiline={true}
                            onChangeText={text=>setChat(text)}
                            defaultValue={chat}
                        />
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../image/file.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:5, marginRight:15}} source={require('../assets/camera.png')}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.send} onPress={sendButton}>
                        <Image style= {{width: 20, height: 20}} source={require('../assets/send.png')}/>
                    </TouchableOpacity>
                    
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },

    headerImage:{
        width: 45, 
        height: 45, 
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
        marginLeft: 15,
        backgroundColor:'#ccc'
    },

    chatFlow:{
        flex: 1,
        backgroundColor:'#fff',
        paddingTop:10
    },

    iconContainer2: {
        width: 105,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight:10
    },

    iconContainer3: {
        width: 105,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:10
    },

    input:{
        width: '83%',
        height: '100%',
        borderRadius: 30,
        backgroundColor:'#fff',
        elevation: 4,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center'
    },

    input2:{
        width: '98%',
        height: '100%',
        borderRadius: 30,
        backgroundColor:'#fff',
        elevation: 4,
        overflow:'hidden',
        flexDirection:'row',
        alignItems:'center',
    },

    main:{
        width:'100%',
        height:50,
        marginBottom:10,
        flexDirection:'row'
    },

    box:{
        flex:1,
        borderRadius:50,
        backgroundColor:'#fff',
        marginLeft:4,
        marginRight:6,
        elevation:4,
        flexDirection:'row',
        alignItems:'center'
    },

    send:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#fff',
        elevation:4,
        marginRight:5,
        justifyContent:'center',
        alignItems:'center'
    },

    chatCardContainer:{
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 4,
        marginBottom:5,
        flexDirection:'row',
    },

    chatCardContainer2:{
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 4,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    profileImage: {
        width: 32, 
        height: 32, 
        borderRadius: 32/2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft:5
    },

    chatCardMessage:{
        width:'65%',
        backgroundColor:'#0475ed',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        padding:10
    },

    chatCardMessage2:{
        width:'65%',
        backgroundColor:'#aaaaaa',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        padding:10,
        justifyContent: 'flex-start'
    },

    credentials:{width:'100%', 
        backgroundColor:'#0475ed', 
        height:15, 
        marginTop:10, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    },

    credentials2:{width:'100%', 
        backgroundColor:'#aaaaaa', 
        height:15, 
        marginTop:13, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    }
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(ChatRoom);