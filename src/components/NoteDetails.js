import React from 'react';
  import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Image,
    Button,
    ScrollView,
    StatusBar,
  } from 'react-native';
  import {
    Avatar,
  } from 'react-native-paper';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {Card, CardItem, Left,Right, Body, } from 'native-base';
import Moment from 'moment';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';



const NoteDetails = ({route, navigation, accessToken}) => {



  function customHeaderTitle() {
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <Text style={{color: '#000', fontSize: 22, fontWeight: '500'}}>
          Note Pad
        </Text>

        <TouchableHighlight onPress={() => navigation.navigate('Editnote', 
              { 
                name: route.params.name,
                category: route.params.category,
                ptext: route.params.ptext,
                date: route.params.date, 
                id: String(route.params.id),
                content:route.params.content
              })  
            }>
        
        <Image
              onPress={() => navigation.navigate('Editnote', 
              {name: route.params.name,
              category: route.params.category,
              ptext: route.params.ptext,
              date: route.params.date, 
              id: String(route.params.id),
              content:route.params.content})  
            }
              style={{width: 25, height: 25, marginLeft: 165}}
              source={require('../assets/edit.png')}
            />
        </TouchableHighlight>

        <TouchableHighlight onPress={() => deleteMe(route.params.id) 
            }>
        
        <Image
              onPress={() => deleteMe(route.params.id)
            }
              style={{width: 22, height: 22, marginRight: 10}}
              source={require('../assets/cancel.png')}
            />
        </TouchableHighlight>
      </TouchableOpacity>
    );
  }
  {
    {
      navigation.setOptions({headerTitle: customHeaderTitle});
    }
  }

      const {name, category, ptext, date, id, token, content} = route.params;
      
      const deleteMe = async(id) => {
        //Toast.show(id + "  "+ accessToken);
        try {
          fetch('https://church.aftjdigital.com/api/note/delete/' + id, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              token: accessToken,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            Toast.show(responseJson.message);
              navigation.navigate('NoteRoot')
          })
          .catch((error) => {
            alert(error)});
            //setLoading(false);
        } 
        catch (error) {
            console.log('Error => ', error);
        }
    };

    return(

            <ScrollView backgroundColor="#fff" >
            <View style={styles.eventDetails}>

            <StatusBar backgroundColor="#fff" barStyle="light-content" />

            <View style={styles.overlay}>
                {/* <CardItem>
                  <Left style={{flex:0.8}}>
                    <View style={styles.circleImg}>
                      <TouchableOpacity>
                          <Avatar.Image
                            style={{
                              alignSelf: 'flex-start',
                            }}
                            source={{
                              uri:
                                'https://picsum.photos/seed/picsum/200/300',
                            }}
                            size={43}
                          />
                       
                      </TouchableOpacity>
                    </View>
                    <Body>
                      <Text style={{fontSize:12, fontFamily: 'Nunito-Bold', textTransform: 'capitalize'}}>{name}</Text>
                      <Text style={{fontSize:11, fontFamily: 'Nunito-Regular', color: '#646464'}}>{category}</Text>
                    </Body>
                  </Left>
                  <Right style={{flex:0.5}}>
                  </Right>
                </CardItem> */}
                <CardItem cardBody>
                 
                    <Left style={{flex:0.7, marginBottom: 10}}>
                      <Text style={{fontSize:14, fontFamily: 'Nunito-Bold', color: '#000', marginLeft: 16}}> 
                          Theme: {category}
                      </Text>
                    </Left>
                    <Right style={{flex:0.3}}>
                        <Text style={{fontSize:10, fontFamily: 'Nunito-Light', color: '#000', marginRight: 16, marginBottom: 10}}> 
                            {/* {Moment(date.substring(11,16)).format( 'llll')} */}
                            {date.substring(17,27)}
                        </Text>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{fontSize:14, fontFamily: 'Nunito-Bold', color: '#000', marginLeft: 16, marginBottom: 16}}> 
                        Text: {ptext}
                    </Text>
                </CardItem>
                <CardItem cardBody>
                    <Text style={{fontSize:14, fontFamily: 'Nunito-Bold', color: '#000', marginLeft: 16}}> 
                        Message
                    </Text>
                </CardItem>
                <CardItem style={{fontFamily: 'Nunito-Regular', fontSize:12, color: '#000'}}>
                    
                    <Text style={{fontSize:14, fontFamily: 'Nunito-Regular', color: '#000'}}> 
                      {content} 
                      </Text>
                </CardItem>
                <CardItem>
                  <Left style={{flex:0.1}}>
                    
                  </Left>
                  <Right style={{flex:0.9}}>

                  {/* <View style={styles.container}>
                    <View style={styles.buttonContainer} style={{marginLeft: -50}}>
                    <TouchableHighlight onPress={LikeMe} >
                      <View>
                          <Icon name="ios-heart-outline" size={24} color={'#646464'} style={{marginLeft: 80}} />
                          <Text style={{fontSize:14, marginTop: -24, marginLeft: 108, color: '#646464', fontFamily: 'Nunito-Regular'}}>
                              Like
                          </Text>
                        </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.buttonContainer} style={{marginLeft: 40}}>
                    <TouchableHighlight onPress={shareMe} >
                        <View>
                          <Icon name="share-social-outline" size={23} color={'#646464'} />
                            <Text style={{fontSize:14, marginTop: -22, marginLeft: 27, color: '#646464', fontFamily: 'Nunito-Regular'}}>
                              Share
                          </Text>
                        </View>
                        </TouchableHighlight>
                    </View>
                  </View> */}
                    
                  </Right>
                </CardItem>
              </View>

            </View>
            </ScrollView>
           
    );
}

const styles = {

    text:{
        color:'black',
        marginBottom:10,
        fontFamily:'Nunito-Light',
        fontSize:14
    },
    otherDetails:{
        marginTop:20,
        backgroundColor:'#C5CAD2',
        display:'flex',
        borderRadius:10,
        width:'100%',
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'flex-start',
        paddingTop:15,
        paddingBottom:20,
        paddingLeft:15,
        paddingRight:'20%'
    },
    eventDetails:{
        backgroundColor:'#fff',
        marginBottom: 100,
        width:'100%',
        height:'100%',
    },
    img:{
        height: 200,
        margin:10,
        borderRadius: 10,
        overflow: "hidden",
    },
    headerContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'flex-end',
        width:'100%',
    },
    titleText:{
        fontSize:18,
        fontFamily:'Nunito-Regular',
        textTransform:'capitalize',
    },
    dateText:{
        fontSize:14,
        fontFamily:'Nunito-Light',
    },
    overlay: {
        top: 12,
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 0,
      },

      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonContainer: {
          flex: 0.5,
      }
}

export default NoteDetails;