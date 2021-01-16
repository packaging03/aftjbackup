import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

const ChatRoom = ({accessToken, user, route})=>{

    const [activeSend, setActiveSend] = useState(true);
    const [messages, setMessages] = useState();
    const [image, setImage] = useState(route.params.image);
    const [chatMessages, setChatMessage] = useState('');

    useEffect(()=>{
        const interval = setInterval(()=>{
                fetch('https://church.aftjdigital.com/api/allchats', {
                    method: 'GET',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        //console.log(responseJson)
                        let chatHistory = new Array();
                        for(let i=0; i<responseJson.length; i++){
                            if(responseJson[i].agent_id==route.params.agent_id||responseJson[i].user_id==route.params.agent_id){
                                chatHistory[i]=responseJson[i]
                            }
                            
                        }
                        console.log(chatHistory)
                        setMessages(JSON.stringify(chatHistory.reverse()))
                    })
                    .catch(error => {
                    alert(error);
                    });
        }, 3000);
        return ()=> clearInterval(interval);
    }, [])

    const sendButton = ()=>{
        let today = new Date();
        let time = today.getHours()+" : "+ today.getMinutes();

        if(messages){
            let chats = messages=>[...JSON.parse(messages), {'message':chatMessages, 'currentTime': '02/11/20 '+time}]
            setMessages(JSON.stringify(chats))
            
            fetch('https://church.aftjdigital.com/api/receivemessage', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                        body: JSON.stringify({
                            user_id: JSON.parse(user).id,
                            agent_id: route.params.agent_id,
                            message: chatMessages,
                        }),
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson.message)
                        
                    })
                        .catch(error => {
                        alert(error);
                    });
            
        }
        setChatMessage("")
        setActiveSend(true);
        Keyboard.dismiss();
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

    return(
        <View style={styles.container}>
            <View style={styles.chatFlow}>
                <FlatList
                    data={messages? JSON.parse(messages):()=>{}}
                    keyExtractor={(item, index) => item.user_id}
                    renderItem={({item}) => (
                        item.agent_id==JSON.parse(user).id?
                        <ChatCardSender message={item.message} time={item.currentime.substr(10)}/>:
                        <ChatCardReciever message={item.message} time={item.currentime.substr(10)}/> 
                        
                    )}   
                />
            </View>
            <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-167}>
                <View style={styles.controls}>
                    <View style={styles.input}>
                        <TouchableOpacity>
                            {/* happy.png file does not exist */}
                            {/* <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../assets/happy.png')}/> */}
                        </TouchableOpacity>
                        <TextInput
                            multiline={true}
                            style={{flex:1}}
                            onFocus={()=>{setActiveSend(false)}}
                            onChangeText={text=>setChatMessage(text)}
                            value={chatMessages}
                        />
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../image/file.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:5, marginRight:15}} source={require('../assets/camera.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.audio}>
                        {activeSend? 
                        <TouchableOpacity>
                            {/* <Image style= {{width: 18, height: 18}} source={require('../assets/microphone.png')}/> */}
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={sendButton}>
                            {/* <Image style= {{width: 15, height: 15}} source={require('../assets/send.png')}/> */}
                        </TouchableOpacity>}
                    </View>
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

    chatFlow:{
        flex: 1,
        backgroundColor:'#fff',
        paddingTop:10
    },

    controls:{
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop:10,
        marginBottom:10
        
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

    audio:{
        width: 45,
        height: 45,
        backgroundColor:'#fff',
        borderRadius: 30,
        elevation: 4,
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