import React, { useState, useEffect } from 'react'

 import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  RefreshControl,
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
import { SwipeListView } from 'react-native-swipe-list-view';


const Item = ({name, category, date, content, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
            <Card  style={{marginLeft: -2, marginRight: -2, marginBottom: -3.5}}>
                <CardItem style={{marginBottom: -12}}>
                  
                      <Text style={{fontSize:18, fontFamily: 'Nunito-Regular', color: '#000'}}>{category}</Text>
                    
                </CardItem>
                <CardItem style={{fontFamily: 'Nunito-Regular', marginBottom: -8, fontSize:12, color: '#000'}}>
                    <Left style={{flex:0.8}}>
                        <Text> 
                            {content.substring(0,60) + "......"}
                        </Text>
                    </Left>
                    <Right style={{flex:0.2}}>
                        <Text style={{fontSize:8}}> 
                            {/* {Moment(date.substring(18,25)).format( 'llll')} */}
                            {date.substring(17,27)}
                        </Text>
                    </Right>
                    
                </CardItem>
                <CardItem>
                </CardItem>
              </Card>
        </TouchableWithoutFeedback>
    )
    
function NoteRoot({route, navigation, accessToken}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);

  const getTestimoniesFromApiAsync = async () => {
     
    try {
      let response = await fetch('https://church.aftjdigital.com/api/notes');
      let json = await response.json();
      console.log(json);
      setData(json.notes);
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


    const renderItem = ({item}) => (
        <Item name={item.preachers_name}  
        category={item.theme} 
        date={Moment(item.created_at.substring(0,19)).format( 'llll')} 
        content={item.note} 

          onPress={() =>
          navigation.navigate('NoteDetails', 
          {name: item.preachers_name,
          category: item.theme,
          ptext: item.text,
          date: Moment(item.created_at.substring(0,19)).format( 'llll'), //item.created_at,
          id: String(item.id),
          token: accessToken,
          content:item.note}) 
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
                  // <SwipeListView
                  //     useFlatList={true}
                      
                  //     data={data}
                  //     renderItem={renderItem}
                       
                  //     renderHiddenItem={ (rowData, rowMap) => (
                  //         <View style={styles.rowFront}>
                  //             {/* <TouchableOpacity onPress={ () => { Toast.show('show')} }> */}
                  //             <TouchableOpacity onPress={ () => rowMap[rowData.item.key].closeRow()}>
                  //                 <Text>Edit {rowData.item.key}</Text>
                  //             </TouchableOpacity>

                  //             <TouchableOpacity onPress={ () => rowMap[rowData.item.key].closeRow()}>
                  //                 <Text>Delete {rowData.item.key}</Text>
                  //             </TouchableOpacity>
                  //         </View>
                  //     )}
                  //     leftOpenValue={75}
                  //     rightOpenValue={-75}
                  //     onRowOpen={(rowKey, rowMap) => {
                  //         setTimeout(() => {
                  //             rowMap[rowKey].closeRow()
                  //         }, 2000)
                  //     }}
                  // />
                )}
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
export default connect(mapStateToProps)(NoteRoot);

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
      borderRadius: 0,
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

