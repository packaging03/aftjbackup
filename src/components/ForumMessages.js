import React, {useState, useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, FlatList, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const ForumMessages = ({accessToken, user, route})=>{

    let listViewRef;

    const [chatData, SetChatData] = useState();
    const [enableSend, SetEnableSend] = useState(true);
    const [chatMessage, setChatMessage] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [ids, setId] = useState(JSON.parse(user).id);
    const [photoUri, setPhotoUri] = useState('');

    useEffect(()=>{
        if (JSON.parse(user).image) {
            fetch('https://church.aftjdigital.com/api/profile_image/user/'+JSON.parse(user).id, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                })
                .then(response => response.json())
                .then(responseJson => {
                  setPhotoUri(responseJson.image);
                })
                .catch(error => {
                  alert(error);
                });
          } else {
            setPhotoUri(
              'https://w7.pngwing.com/pngs/650/102/png-transparent-smiley-emoticon-desktop-kiss-smiley-miscellaneous-computer-icons-smile.png',
            );
        }

    },[])

    useEffect(()=>{
        fetch('https://church.aftjdigital.com/api/retrieve/forum/'+route.params.forum_id, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`
                },
                })
                .then(response => response.json())
                .then(responseJson => {
                    if(responseJson.data.messages){
                        SetChatData(responseJson.data.messages)
                    }
                })
                .catch(error => {
                  alert(error);
                });
    }, [enableSend])

    /*useEffect(()=>{
        if(accessToken==null){
            alert('Please Login to access this page')
        }else{
            fetch('https://church.aftjdigital.com/api/retrieve/forums', {
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      },
                        
                      })
                      .then((response) => response.json())
                      .then((responseJson) =>{
                          console.log(responseJson.data)
                          let value = responseJson.data
                          setUserData(value)
                          console.log(value)
                      })
                      .catch((error) => {
                        alert(error)});
                    }
           /*if(userData){
                for(let i = 0; i<userData.length; i++){
                    console.log(userData[i])
                }
            }*/
        

    const ChatCardSender = (props)=>{
        return(
            <View style={styles.chatCardContainer}>
                <View style= {styles.profileImage}>
                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source = {{uri: props.profile}}/>
                </View>
                <View style={styles.chatCardMessage}>
                    <Text style={{color:'#fff', fontFamily: 'Nunito'}}>{props.message}</Text>
                    <View style={styles.credentials}>
                        <Text style={{color: '#fff', fontSize: 10, fontFamily: 'Nunito'}}>{props.name}</Text>
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
                        <Text style={{color: '#000', fontSize: 10, fontFamily: 'Nunito'}}>{props.name}</Text>
                        <Text style={{color: '#000', fontSize: 10, fontFamily: 'Nunito'}}>{props.time}</Text>
                    </View>
                </View>
                <View style= {styles.profileImage}>
                    <Image style= {{flex: 1, width: '100%', height: '100%'}} source = {{uri: props.profile}}/>
                </View>
            </View>
        )
    }

    useEffect(()=>{
        listViewRef.scrollToEnd({animated: true})
    }, [chatData])

    const showId = ()=>{
        alert(route.params.forum_id)
        console.log(chatData)
    }

    const changeToSend = ()=>{
        SetEnableSend(false)
        listViewRef.scrollToEnd({animated: true})
    }

    const sendMessage = ()=>{
        SetEnableSend(true)
        let today = new Date();
        let time = today.getHours()+" : "+ today.getMinutes();
        setCurrentTime(time);

        if(chatMessage){
            if(chatData){
                SetChatData(chatData=>[...chatData, {"sender_id": JSON.parse(user).id, "sender_name": JSON.parse(user).name, "message": chatMessage, "sent_time": currentTime, "sender_image": JSON.parse(user).image}])
            }
    
            fetch('https://church.aftjdigital.com/api/forum/message/add/'+ JSON.parse(user).id, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                        body: JSON.stringify({
                            forum_id: route.params.forum_id,
                            message: chatMessage,
                            uploads: ""
                        }),
                    })
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson.message)
                    
                        setChatMessage("")
                    })
                        .catch(error => {
                        alert(error);
                    });
            
        }
        if(!chatMessage){
            Keyboard.dismiss();
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                
                <FlatList
                    data={chatData?chatData:()=>{alert('a problem has occured')}}
                    //keyExtractor={(item, index) => item.sender_id.toString()}
                    renderItem={({item}) => (
                        (item.sender_id==JSON.parse(user).id)? <ChatCardSender profile={item.sender_image} message={item.message} time={item.sent_time} name={item.sender_name}/>:
                        <ChatCardReciever profile={item.sender_image} message={item.message} time={item.sent_time} name={item.sender_name}/>
                    )}

                    ref = {(ref)=>{
                        listViewRef = ref;
                    }}
                />
                
            </View>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-170}>
                <View style={styles.controls}>
                    <View style={styles.textInput}>
                        <View style={{flexDirection: 'row', width:'80%', backgroundColor:'#fff'}}>
                            <Icon.Button
                                name="happy-outline"
                                size={25}
                                color="#000"
                                backgroundColor="#fff"
                            />
                            <TextInput
                                multiline={true}
                                style={{flex:1}}
                                placeholder={'Type a message'}
                                onFocus={changeToSend}
                                onChangeText={text=>setChatMessage(text)}
                                value={chatMessage}
                            />
                        </View>
                        <View style={{flexDirection:'row', width:80}}>
                            <TouchableOpacity>
                                <View>
                                    <Image style= {{width: 20, height: 20}} source={require('../image/file.png')}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showId}>
                                <View>
                                    <Image style= {{width: 20, height: 20, marginLeft:10}} source={require('../assets/camera.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.audio}>
                        <View>
                            {enableSend?<Icon.Button
                                name="mic-outline"
                                size={20}
                                color="green"
                                backgroundColor="#fff"
                            />:
                            <Icon.Button
                                name="send-outline"
                                size={15}
                                color="green"
                                backgroundColor="#fff"
                                onPress={sendMessage}/>}

                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff',
        flexDirection: 'column',
    },

    chatContainer:{
        flex: 1,
        backgroundColor:'#fff'
    },

    controls:{
        width: '100%',
        height: 46,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor:'#fff'
    },

    textInput:{
        width: '81%',
        height: '100%',
        backgroundColor:'#fff',
        borderRadius: 24,
        margin: 5,
        elevation:5,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between"

    },

    audio:{
        width: 46,
        height: 46,
        borderRadius:23,
        backgroundColor:"#fff",
        elevation: 5,
        marginRight:8,
        justifyContent: 'center',
        paddingLeft: '1.5%',
        overflow: 'hidden'
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(ForumMessages);