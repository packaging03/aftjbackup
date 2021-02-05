import React, {useState, useEffect, createRef} from 'react';
import {View,StyleSheet, TextInput, KeyboardAvoidingView, Image, Text, TouchableOpacity, FlatList, Keyboard} from 'react-native';
import {connect} from 'react-redux';

const AnonymousChats = ({accessToken, user, route, navigation})=>{

    const [text, setText] = useState('');
    const [chatMessages, setChatMessage] = useState();

    var data = ['#000','#219653', '#4340DA', '#FBBD00', '#1F78B4', '#FD3E40', '#8A0303', '#0475ed', '#aaaaaa']

    var firebaseChats = require("firebase");

    const firebaseChatsConfig = {
    databaseURL: 'https://aftj-chats-default-rtdb.firebaseio.com/',
    projectId: 'aftj-chats'
    };

    if(!firebaseChats.apps.length){
        firebaseChats.initializeApp(firebaseChatsConfig);
    }

    useEffect(()=>{
        firebaseChats.database().ref('Chats/').once('value', function(snapshot){
            var data=[]
            snapshot.forEach(function(userSnapshot){
                var userKey = userSnapshot.key;
                var userData = userSnapshot.val();

                data.push(userData)
            })
            console.log(JSON.stringify(data))
            setChatMessage(data)
        })
    })

    const ChatCardSender = (props)=>{
        return(
            <View style={styles.chatCardContainer}>
                <View style={{...styles.chatCardMessage, backgroundColor:props.color}}>
                    <Text style={{color:'#fff', fontFamily: 'Nunito'}}>{props.message}</Text>
                    <View style={styles.credentials}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{props.date}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito', marginRight:10}}>{props.time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const ChatCardReciever = (props)=>{
        return(
            <View style={styles.chatCardContainer2}>
                <View style={{...styles.chatCardMessage2, backgroundColor:props.color}}>
                    <Text style={{color:'#fff', fontFamily: 'Nunito'}}>{props.message}</Text>
                    <View style={styles.credentials2}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{props.date}</Text>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{props.time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const sendMessage = ()=>{
        let today = new Date();
        let time = today.getHours()+":"+ today.getMinutes();
        let date = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()
        var random = Math.floor(Math.random()*8)+1;
        console.log(date)

        /*let chats = chatMessages=>[...JSON.parse(chatMessages), {'message':text, 'time': time, 'date':date}]
        setChatMessage(JSON.stringify(chats))*/

        firebaseChats.database().ref('Chats/').push({'messages': text, 'date':date, 'time': time, 'id':JSON.parse(user).id, 'color': data[random]})
        .then((data)=>{console.log('data', data)}).catch((error)=>console.log(error))

        setText("")
        Keyboard.dismiss()
    }

    return(
        <View style={styles.container}>
            <View style={styles.chatFlow}>
                <FlatList
                    data = {chatMessages}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({item}) => (
                        item.id==JSON.parse(user).id?
                        <ChatCardReciever message={item.messages} time={item.time} date={item.date} color={item.color}/>:
                        <ChatCardSender message={item.messages} time={item.time} date={item.date} color={item.color}/>
                        
                    )}   
                />
            </View>
            <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-167}>
                <View style={styles.controls}>
                    <View style={styles.mainInput}>
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../../assets/happy.png')}/>
                        </TouchableOpacity>
                        <TextInput
                            style={{flex:1}}
                            placeholder={'Type a message'}
                            multiline={true}
                            onChangeText={text=>setText(text)}
                            value={text}
                        />
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:10, marginRight:5}} source={require('../../image/file.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style= {{width: 22, height: 22, marginLeft:5, marginRight:15}} source={require('../../assets/camera.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.audio}>
                        <TouchableOpacity onPress={sendMessage}>
                            <Image style= {{width: 20, height: 20}} source={require('../../assets/send.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },

    chatFlow:{
        flex:1,
        backgroundColor:'#fff'
    },

    controls:{
        width:'100%',
        height: 50,
        backgroundColor:'#fff',
        marginBottom: 10,
        flexDirection:'row',
    },

    mainInput:{
        flex:1,
        backgroundColor:'#fff',
        borderRadius:30,
        marginLeft:5,
        marginRight:5,
        elevation:4,
        flexDirection:'row',
        alignItems:'center'
    },

    audio:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#fff',
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
        marginLeft:10,
        marginTop:10
    },

    chatCardContainer2:{
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 4,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight: 10
    },

    chatCardMessage:{
        width:'65%',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        padding:10,
        elevation:2
    },

    chatCardMessage2:{
        width:'65%',
        flexDirection: 'column',
        borderRadius: 10,
        overflow: 'hidden',
        padding:10,
        justifyContent: 'flex-start',
        marginRight:10,
        marginTop:5,
        elevation:2
    },

    credentials:{width:'100%', 
        height:15, 
        marginTop:10, 
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center'
    },

    credentials2:{width:'100%',  
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(AnonymousChats);