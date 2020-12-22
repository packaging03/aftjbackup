import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

const Chats = ({navigation, accessToken})=> {

    const [userData, setUserData] = useState();

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
                          console.log(responseJson)
                          setUserData(JSON.stringify(responseJson))
                      })
                      .catch((error) => {
                        alert(error)});
        }
        
    })

    const ChatRoom = (item)=>{
        navigation.navigate('ChatRoom')
    }

    return(
        <View style= {styles.container}>
            <View style={styles.search}>
                <View style={styles.bar}>
                    <TextInput
                        style={{flex:1}}
                        placeholder={'Search'}
                        />
                    <Icon.Button
                        name="search-outline"
                        size={25}
                        color="#ccc"
                        backgroundColor="#fff"
                    />
                </View>
            </View>
            <FlatList
                data={userData?JSON.parse(userData):()=>{alert('A problem has occured')}}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={()=>{ChatRoom(item)}}>
                        <View style = {styles.card} >
                            <View style= {styles.profileImage}>
                                <Image style= {{flex: 1, width: '100%', height: '100%'}} source={{uri: item.image}} />
                            </View>
                            <View style = {styles.cardText}>
                                <Text style = {{fontWeight: 'bold'}}>{item.name}</Text>
                                <Text>3 minutes ago</Text>
                            </View>
                        </View>
                    </TouchableOpacity>    
                )}   
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },

    profileImage: {
        width: 56, 
        height: 56, 
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
        marginLeft: 15,
        backgroundColor:'#ccc'
    },

    card:{
        width: '100%',
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardText:{
        marginLeft:10,
    },

    search:{
        width: '90%',
        height: 45,
        borderColor:'#ccc',
        borderWidth:1,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        alignSelf: 'center'
    },

    bar:{
        flexDirection:'row',
        marginLeft: 5
    }
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(Chats);