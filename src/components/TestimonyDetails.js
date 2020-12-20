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
    Button,
    ScrollView,
    StatusBar,
  } from 'react-native';
  import {
    Avatar,
  } from 'react-native-paper';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, CardItem, Left,Right, Body, } from 'native-base';
import Share from 'react-native-share';

const TestimonyDetails = ({route}) => {
      const {name, category, date, id, token, content} = route.params;
      const shareMe = async() => {
        const shareOptions = {
            message: "Check out this testimony: " + content.substring(0,75) + " by " + name,
            url: "",
        }
    
        try {
            const shareResponse = Share.open(shareOptions);
            console.log(JSON.stringify(shareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };

    
    const LikeMe = () => {
      
      if (token === null || token === "") {
          alert('Kindly Login first');
          return;
      }
      fetch('https://church.aftjdigital.com/api/testimony/like/' + id , {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                  body: JSON.stringify({
                      token: token,
                  })
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    if (JSON.stringify(responseJson.message) !== 'you liked this testimony' ){
                      Toast.show(responseJson.message)
                       return;
                    }
                    Toast.show(responseJson.message)
                })
                .catch((error) => {
                  alert(error)});
    };

    return(

            <ScrollView backgroundColor="#fff" >
            <View style={styles.eventDetails}>

            <StatusBar backgroundColor="#fff" barStyle="light-content" />

            <View style={styles.overlay}>
                <CardItem>
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
                </CardItem>
                <CardItem cardBody>
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

                  <View style={styles.container}>
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
                  </View>
                    
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
        alignItems:'center',
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

export default TestimonyDetails;