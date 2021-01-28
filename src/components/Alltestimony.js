import React, { useState, useEffect } from 'react'

 import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import Moment from 'moment';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
  import {
    Avatar,
  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, CardItem, Left,Right, Body, } from 'native-base';


const Item = ({name, category, date, content, onPress, onPress2}) => (
  <TouchableWithoutFeedback onPress={onPress}>
            <Card style={styles.overlay}>
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
                              "https://picsum.photos/seed/picsum/200/300", //id,
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
                    <Text style={{fontSize:11, fontFamily: 'Nunito-Regular', color: '#646464', fontSize: 10, marginTop: 14}}> {date.substring(0,17)}</Text>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                </CardItem>
                <CardItem style={{fontFamily: 'Nunito-Regular', fontSize:12, color: '#000'}}>
                    <Text> 
                      {content.substring(0,47) + "..."}
                      </Text>
                </CardItem>
                <CardItem>
                  <Left style={{flex:0.1}}>
                    
                  </Left>
                  <Right style={{flex:0.9}}>

                    <TouchableHighlight onPress={onPress2}>
                        <View>
                        <Icon name="ios-heart-outline" size={23} color={'#646464'} />
                          <Text style={{fontSize:14, marginTop: -25, marginLeft: 30, color: '#646464', fontFamily: 'Nunito-Regular'}}>
                              Like
                          </Text>
                        </View>
                    </TouchableHighlight>
                    
                  </Right>
                </CardItem>
              </Card>
        </TouchableWithoutFeedback>
    )
    
function Alltestimonies({route, navigation, accessToken}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);

      const getTestimoniesFromApiAsync = async () => {
        
        try {
          let response = await fetch('https://church.aftjdigital.com/api/testimonies');
          let json = await response.json();
          console.log(json);
          setData(json);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
          if(accessToken==null){
              alert('Please Login to access this page')
          } 
          else 
          {
              getTestimoniesFromApiAsync();
          }
      }, []);
     
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          console.log('Refreshed!');
          getTestimoniesFromApiAsync();
        });
        return unsubscribe;
      }, [navigation]);

  const getimgurl = async (id) => {

    // fetch('https://api.github.com/users/hacktivist123/repos')
    // .then(response => response.json())
    // .then(data => console.log(data));
  

    try {
      await fetch('https://church.aftjdigital.com/api/user_image/' + id)
      .then(response => response.json())
      .then(data => {
        //let res = JSON.stringify(data)
        //console.log(res)
       // alert(res)
      });
      // {
      //   let res = JSON.stringify(body.url)
      //   alert(res.url)
      //   return 'https://picsum.photos/seed/picsum/200/300' //body.text(); // <--- THIS PART WAS MISSING
      // }.then(function(data) {
      //   console.log(data);
      //   return 'https://picsum.photos/seed/picsum/200/300';
      //   //vehicles.push(data);
      // });
    } catch (error) {
      console.error(error);
      return 'https://picsum.photos/seed/picsum/200/300';
    }
  }

  const LikeTestimony = (id) => {
    

    if (accessToken === null || accessToken === "") {
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
                    token: accessToken,
                })
              })
              .then((response) => response.json())
              .then((responseJson) =>{
                  // if (JSON.stringify(responseJson.message) !== 'you liked this testimony' ){
                  //   Toast.show(responseJson.message)
                  //    return;
                  // }
                  console.log(id + " clicked")
                  Toast.show(responseJson.message + "!")
              })
              .catch((error) => {
                alert(error)});
  };
  
    

    const renderItem = ({item}) => (

       //id={getimgurl(item.id)}
        
        <Item name={item.name}  category={item.category} date ={Moment(item.created_at.substring(0,10)).format( 'llll')} content={item.body} 
          onPress={() =>
          navigation.navigate('TestimonyDetails', 
          {name: item.name,
          category: item.category,
          date:item.created_at,
          id: String(item.id),
          token: accessToken,
          content:item.body}) 
        } 
        onPress2={() =>
          LikeTestimony(String(item.id))
        } 
         />
  );

  

    return (
      
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="transparent" translucent />
            <View style={styles.events}>
                

                {isLoading ? ( 
                  <ActivityIndicator size="large" style={{marginTop: 50}} />
                ) : (
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                  />
                )}
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
export default connect(mapStateToProps)(Alltestimonies);

const styles = StyleSheet.create({
    img:{
        width:70, 
        height:70,
        borderRadius: 6,
        shadowOpacity: 1,
        shadowRadius: 2,
        resizeMode:'cover',
    },
    overlay: {
      borderRadius: 10,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      opacity: 0.8,
      
    },
    imgStyle: {
      margin: 20,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    circleImg: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 45,
      height: 45,
      right: -1,
      borderRadius: 60,
      backgroundColor: '#C5CAD2',
    },
})

