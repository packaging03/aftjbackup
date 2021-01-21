import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Share} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
//  import TextToMp3 from 'text-to-mp3'
import TrackPlayer from 'react-native-track-player';

const MemoryVerseNew = ({navigation, accessToken})=>{
    const [userData, setUserData] = useState();
    const [backgroundCol, setBackgroundCol] = useState('white');
    const [selectedItem, setSelectedItem] = useState();
    const [shareValue, setShareValue] = useState();
    const [TtsState, setTtsState] = useState(false);


    const testconvertion = async () => {
        //var txtomp3 = require("text-to-mp3");

        // const mp3 = TextToMp3.saveMP3("but none is installed. You must install peer dependencies yourself", "FileName.mp3", function(err, absoluteFilePath){
        //     if(err){
        //       console.log(err);
        //       return;
        //     }
        //     console.log("File saved :", absoluteFilePath); //"File saved : /home/enrico/WebstormProjects/textToMp3/FileName.mp3"
        //   });


        
    }


    // useEffect(() => {
    //     TrackPlayer.setupPlayer();
    //     TrackPlayer.updateOptions({
    //     stopWithApp: true,
    //     capabilities: [
    //         TrackPlayer.CAPABILITY_PLAY,
    //         TrackPlayer.CAPABILITY_PAUSE,
    //         TrackPlayer.CAPABILITY_STOP
    //     ],
    //     compactCapabilities: [
    //         TrackPlayer.CAPABILITY_PLAY,
    //         TrackPlayer.CAPABILITY_PAUSE
    //     ]
    //     });
    // }, []);


    async function play(audio){
        // TrackPlayer.setupPlayer().then(async () => {
    
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: audio,
            
                // url: require('track.mp3'),
                title: "sermonName",
                artist: "preacher",
                // artwork: require('track.png')
            });
        
            // Starts playing it
            await TrackPlayer.play();
        
        // });

    }

    const read = async () => {
        setTtsState(true);
        //testconvertion();
        Tts.setDefaultLanguage('en-US');
        Tts.setDucking(true);

        const valuesArray = JSON.parse(userData)
        for (var i = 0; i < valuesArray.length; i++) 
        {
            Tts.speak(valuesArray[i].title);
            Tts.speak(valuesArray[i].body);
        }
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
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%',
                    }}>
                        
                        {/* <TouchableOpacity
                            onPress={() => pauseme()}
                            style={{alignSelf: 'center'}}>
                                <Image
                                    onPress={() => pauseme()}
                                    style={{width: 50, height: 50, marginLeft: -15, marginBottom: 16, color: '#000'}}
                                    source={require('../assets/pausebtn.png')}
                                />
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => stopReading()}
                            style={{alignSelf: 'center'}}>
                                <Image
                                    onPress={() => stopReading()}
                                    style={{width: 50, height: 50, marginRight: 1, marginBottom: 16}}
                                    source={require('../assets/stopbtn.png')}
                                />
                        </TouchableOpacity>
                    </View>
                
                ) : (
                <TouchableOpacity>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '103%',
                    }}>

                        <TouchableOpacity> 
                            <Image
                                style={{width: 50, height: 50, marginLeft: -15, marginTop: 6}}
                                source={require('../assets/backbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => read()}>
                            <Image
                                onPress={() => read}
                                style={{width: 65, height: 65, marginRight: 1, marginBottom: 10}}
                                source={require('../assets/playbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Image
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