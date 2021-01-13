import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Share, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
//import Speech from 'react-native-speech'
import { Toast } from 'native-base';

//var Speech = require('react-native-speech');

const MemoryVerseNew = ({navigation, accessToken})=>{
   // var Speech = require('react-native-speech');
    const [userData, setUserData] = useState();
    const [backgroundCol, setBackgroundCol] = useState('white');
    const [selectedItem, setSelectedItem] = useState();
    const [shareValue, setShareValue] = useState();
    const [TtsState, setTtsState] = useState(false);

    const read = async () => {
        //setTtsState(true);
        Tts.setDefaultLanguage('en-US');
        var vss = 0;
        //Alert.alert('Clicked!')
        //await Tts.speak("Add is here!");
        // Speech.speak({
        //     text: 'React Native Speech is awesome!  I\'m going to use it in my next project.',
        //     voice: 'en-US'
        // });
        

        // Speech.supportedVoices()
        // .then(locales => {
        //     Alert.alert(locales)
        //     console.log(locales); // ["ar-SA", "en-ZA", "nl-BE", "en-AU", "th-TH", ...]
        // });
        
        
        // Speech.speak({
        //     text: 'React Native',
        //     voice: 'en-US'
        //   })
        //   .then(started => {
        //       Alert.alert('start')
        //     console.log('Speech started');
        //   })
        //   .catch(error => {
        //     console.log('You\'ve already started a speech instance.');
        //   });



        // for (var i = 0; i < bibleData.length; i++) {
        //   await Tts.speak(bibleData[i].bookName);
        //   var splitVerses = bibleData[i].verses.split('-');
        //   var verses = splitVerses[0] + ' to ' + splitVerses[1];
        //   await Tts.speak(bibleData[i].chapter + ' verses ' + verses);
        //   for (var j = 0; j < bibleData[i].audioData.length; j++) {
        //     await Tts.speak(bibleData[i].audioData[j]);
        //   }
        // }
      };
    
      const stopReading = () => {
        Tts.stop();
        setTtsState(false);
      };

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
                        
                            <Text onPress={()=>shareHandler(item)} style = {{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
                            <Text onPress={()=>shareHandler(item)} numberOfLines= {2} style={styles.content}>{item.body}</Text>
                        
                    </View>
                )}   
            />

            <View style={styles.controlsView}>
                {TtsState ? (
                <TouchableOpacity
                    onPress={() => stopReading()}
                    style={{alignSelf: 'center'}}>
                    <Icon name="stop" color="black" size={36} opacity={1} />
                </TouchableOpacity>
                ) : (
                <TouchableOpacity>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '103%',
                    }}>

                        <TouchableOpacity onPress={() => read()}>
                            <Image
                                //onPress={() => navigation.navigate('Addnote')}
                                style={{width: 50, height: 50, marginLeft: -15, marginTop: 6}}
                                source={require('../assets/backbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => read()}>
                            <Image
                                //onPress={() => navigation.navigate('Addnote')}
                                style={{width: 55, height: 55, marginRight: 1}}
                                source={require('../assets/playbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => read()}>
                            <Image
                                //onPress={() => navigation.navigate('Addnote')}
                                style={{width: 50, height: 50, marginTop: 6}}
                                source={require('../assets/rightbtn.png')}
                            />
                        </TouchableOpacity>
                        
                    </View>
                </TouchableOpacity>
                )}
            </View>
            
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
    controlsView: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        opacity: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
      },
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(MemoryVerseNew);  


// import React ,{useState, useEffect} from 'react';
// import {View, StyleSheet, Text, TouchableOpacity, FlatList, Share} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import {connect} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Icono from 'react-native-vector-icons/FontAwesome';

// const MemoryVerseNew = ({navigation, accessToken})=>{

//     const [userData, setUserData] = useState();
//     const [backgroundCol, setBackgroundCol] = useState('white');
//     const [selectedItem, setSelectedItem] = useState();
//     const [shareValue, setShareValue] = useState();

//     React.useLayoutEffect(()=>{
//         navigation.setOptions({
//             headerRight: () => (
//                 <View style={styles.iconContainer2}>
                  
//                   <Icon
//                     onPress={() => {
//                         if(shareValue){
//                             result = Share.share({message: shareValue})
//                         }else{
//                             alert('Please click to select a verse')
//                         }
                        
//                     }}
//                     size={30}
//                     name="share-social-outline"
//                   />
      
//                 <Icono
//                     size={30}
//                     style={{marginRight: 20}}
//                     name="plus-square-o"
//                     onPress={() => navigation.navigate('AddMemoryVerse')}
//                   />
                  
//                 </View>
//             ),
//         }, [navigation]);
//     })

//     useEffect(()=>{
//         if(accessToken==null){
//             alert('Please Login to access this page')
//         }else{
//             fetch('https://church.aftjdigital.com/api/all-memoryverses', {
//                         method: 'GET',
//                         headers: {
//                           Accept: 'application/json',
//                           'Content-Type': 'application/json',
//                           'Authorization': `Bearer ${accessToken}`
//                       },
                        
//                       })
//                       .then((response) => response.json())
//                       .then((responseJson) =>{
//                           let value = JSON.stringify(responseJson)
//                           console.log(value)
//                           console.log(responseJson[0].title)
//                           setUserData(value)
//                       })
//                       .catch((error) => {
//                         alert(error)});
//         }
        
//     })

//     const shareHandler = (item)=>{
//         setSelectedItem(item.id)
//         setShareValue(item.title + ' '+ item.body)
//         setBackgroundCol('red')
//     }

//     return(
//         <View style = {styles.container}>
            
//             <FlatList
//                 data={userData?JSON.parse(userData):()=>{alert('A problem has occured')}}
//                 keyExtractor={(item, index) => item.id}
//                 renderItem={({item}) => (
                    
//                     <View style = {{...styles.card, backgroundColor: item.id==selectedItem? 'red' : 'white'}}>
                        
//                             <Text onPress={()=>shareHandler(item)} style = {{fontWeight: 'bold', fontSize: 15}}>{item.title}</Text>
//                             <Text onPress={()=>shareHandler(item)} numberOfLines= {2} style={styles.content}>{item.body}</Text>
                        
//                     </View>
//                 )}   
//             />
            
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: '#fff'
//     },

//     card:{
//         width: '100%',
//         height: 80,
//         padding: 15
//     },

//     content:{
//         marginTop: 8,
//         lineHeight: 18,
//     },

//     iconContainer2: {
//         width: 105,
//         alignItems: 'center',
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
// })

// const mapStateToProps = state => ({
//     accessToken: state.user.accessToken,
//     user: state.user.user,
//   });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
// export default connect(mapStateToProps)(MemoryVerseNew);  