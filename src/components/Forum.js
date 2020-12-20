import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Image, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import ForumMessages from './ForumMessages';


const Forum = ({navigation, accessToken}) => {

    const [userData, setUserData] = useState();

    useEffect(()=>{
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
                          let value = JSON.stringify(responseJson.data)
                          setUserData(value)
                      })
                      .catch((error) => {
                        alert(error)});
        }
        
    })

    const addNewForum = ()=>{
        navigation.navigate('CreateForum')
    }

    const ForumMessages = (item)=>{
        navigation.navigate('ForumMessages', {'forum_id': item.id})
    }

    const Card = (props)=> {
        return(
            <TouchableOpacity onPress={()=>{ForumMessages(props.forum)}}>
                <View style = {styles.card} >
                    <View style={styles.cardContent}>
                        <View style={{flexDirection: 'row', width: '70%'}}>
                            <View style= {styles.profileImage}>
                                <Image style= {{flex: 1, width: '100%', height: '100%'}} source = {{uri: props.image}}/>
                            </View>
                            <View style = {styles.cardText}>
                                <Text style = {{fontWeight: 'bold'}}>{props.title}</Text>
                                <Text style={styles.theme}>{props.theme}</Text>
                            </View>
                        </View>
                        <Icon
                            name="chevron-forward-outline"
                            size={23}
                            backgroundColor="transparent"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style = {{fontSize: 17, fontWeight: 'bold'}}>Topics</Text>
                <View style={styles.button}>
                    <TouchableOpacity>
                        <Text style={{fontWeight: 'bold'}} onPress = {addNewForum}>+ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data={userData?JSON.parse(userData):()=>{alert('A problem has occured')}}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    <Card title={item.topic} theme = {item.theme} image={item.image} forum={item}/>    
                )}   
            />
                
                

        </View>
    )

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },

    header: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 30,
        paddingLeft: 20,

    },

    theme: {
        fontSize: 10, 
        marginTop: 4, 
        lineHeight: 14,
    },

    button: {
        width: '25%',
        height: '70%',
        backgroundColor: '#c5cad2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    card: {
        width: '100%',
        height: 75,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 5
    },

    cardContent: {
        width: '94%', 
        height: '100%', 
        marginLeft: '3%', 
        marginRight: '3%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    profileImage: {
        width: 55, 
        height: 55, 
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
    },

    cardText: {
        maxWidth: '65%', 
        maxHeight:'70%', 
        overflow: 'hidden', 
        marginLeft: 8, 
        flexShrink:1, 
    }
});

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(Forum);