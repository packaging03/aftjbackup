import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Share} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
const MemoryVerseNew = ({navigation, accessToken, user})=>{

    const [userData, setUserData] = useState();
    const [backgroundCol, setBackgroundCol] = useState('white');
    const [selectedItem, setSelectedItem] = useState();
    const [shareValue, setShareValue] = useState();
    const [itemsChanged, setItemsChanged] = useState(false);
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer2}>
                  
                  <Icon
                    onPress={() => {
                        if(shareValue){
                            result = Share.share({message: shareValue})
                        }else{
                            alert('Please click to select a verse')
                        }
                        
                    }}
                    size={30}
                    name="share-social-outline"
                  />
      
                <Icono
                    size={30}
                    style={{marginRight: 20}}
                    name="plus-square-o"
                    onPress={() => navigation.navigate('AddMemoryVerse')}
                  />
                  
                </View>
            ),
        }, [navigation]);
    })


    useEffect(()=>{
        if(accessToken==null){
            alert('Please Login to access this page')
        }else{
            fetch('https://church.aftjdigital.com/api/all-memoryverses', {
                        method: 'GET',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      },
                        
                      })
                      .then((response) => response.json())
                      .then((responseJson) =>{
                          let value = JSON.stringify(responseJson)
                          console.log(value)
                          console.log(responseJson[0].title)
                          setUserData(value)
                      })
                      .catch((error) => {
                        alert(error)});
        }
        
    })

    const deleteItem=(itemId)=>{
        if(accessToken==null){
            alert('You cannot delete this item')
        }else{
            fetch('https://church.aftjdigital.com/api/delete/memoryverse/'+itemId, {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      },
                      body: JSON.stringify({
                        user_id: JSON.parse(user).id,
                      }),
                      })
                      .then((response) => response.json())
                      .then((responseJson) =>{
                          let value = JSON.stringify(responseJson)
                          console.log(value)
                          setItemsChanged(!itemsChanged);
                      })
                      .catch((error) => {
                        alert(error)});
        }
    }

    const shareHandler = (item)=>{
        setSelectedItem(item.id)
        setShareValue(item.title + ' '+ item.body)
        setBackgroundCol('red')
    }

    return(
        <View style = {styles.container}>
            
            <FlatList
                data={userData?JSON.parse(userData):()=>{alert('A problem has occured')}}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                    
                    <View style = {{...styles.card, backgroundColor: item.id==selectedItem? 'red' : 'white'}}>
                        <View style={styles.deleteandheader}>
                        <Text onPress={()=>shareHandler(item)} style = {{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
                       {item.id==selectedItem?(
                           <TouchableOpacity style = {styles.delete}
                            onPress={()=>deleteItem(item.id)}
                           >
                              <Icons size = {20} name='delete' color='#fff' ></Icons>
                           </TouchableOpacity>
                       ):null}
                        </View>
                            
                            <Text onPress={()=>shareHandler(item)} numberOfLines= {2} style={styles.content}>{item.body}</Text>
                        
                    </View>
                )}   
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },

    card:{
        width: '100%',
        height: 80,
        padding: 15
    },

    content:{
        flex:1,
        marginTop: 8,
        lineHeight: 18,
    },

    iconContainer2: {
        width: 105,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteandheader:{
        flex:1,
        flexDirection:'row',
        alignContent:'space-between',
        width:'100%',
    },
    delete:{
        position:'absolute',
        left:'90%',
        marginTop:'2%',

    }
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(MemoryVerseNew);  