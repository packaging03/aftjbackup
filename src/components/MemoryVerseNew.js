import React ,{useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Share} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';

const MemoryVerseNew = ({navigation, accessToken})=>{
    const [userData, setUserData] = useState();
    const [backgroundCol, setBackgroundCol] = useState('white');
    const [selectedItem, setSelectedItem] = useState();
    const [shareValue, setShareValue] = useState();
    const [TtsState, setTtsState] = useState(false);
    const [TtsresumeState, setTtsResumeState] = useState(true);
    const [sss, setSss] = useState('');
    const [count, setCount] = useState(0);
    
    const read = async () => {
        setTtsState(true);
        const valuesArray = JSON.parse(userData)
        var fullstring = "";
        var ddd = [""];
        var counter = 0;
        Tts.setDefaultLanguage('en-US');
        Tts.addEventListener('tts-start', event => {
            console.log('start', event)
        });
        Tts.addEventListener('tts-finish', event => {
            counter = counter + 1
            setCount(counter)
            console.log('finish', count)
        });
        Tts.addEventListener('tts-cancel', event => {
            console.log('cancel', event)
        });
        Tts.setDucking(true);

        
        for (var i = 0; i < valuesArray.length; i++) 
        {
            fullstring += valuesArray[i].title + " " + valuesArray[i].body + "."
        }
        ddd = fullstring.split(".")
        setSss(ddd)

        for(var j=0; j < ddd.length; j++)
        {
            Tts.speak(ddd[j])
        }
      };
    
      const stopReading = () => {
        Tts.stop();
        setTtsState(false);
        setTtsResumeState(true);
        Tts.removeAllListeners('tts-start');
        Tts.removeAllListeners('tts-finish');
        Tts.removeAllListeners('tts-cancel');
      };

      const pauseReading = () => {
            setTtsResumeState(false);
            Tts.stop();
      }

      const resumeReading = () => {
        setTtsResumeState(true);
        for(var j=count; j < sss.length; j++)
        {
            Tts.speak(sss[j])
        }
        
    }

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
                        width: '125%',
                    }}>

                            {TtsresumeState ? (
                                
                                    <>

                                            <TouchableOpacity> 
                                                <Image
                                                    style={{width: 50, height: 50, marginLeft: -15, marginTop: 6}}
                                                    source={require('../assets/backbtn.png')}
                                                />
                                            </TouchableOpacity>
                                            
                                                <TouchableOpacity
                                                    onPress={() => pauseReading()}
                                                    style={{alignSelf: 'center'}}>
                                                        <Image
                                                            onPress={() => pauseReading()}
                                                            style={{width: 50, height: 50, marginLeft: 5, marginBottom: 10, color: '#000'}}
                                                            source={require('../assets/pausebtn.png')}
                                                        />
                                                </TouchableOpacity>
                                            
                                            <TouchableOpacity>
                                                <Image
                                                    style={{width: 50, height: 50, marginTop: 6}}
                                                    source={require('../assets/rightbtn.png')}
                                                />
                                            </TouchableOpacity>
                                        

                                        {/* <TouchableOpacity
                                            onPress={() => stopReading()}
                                            style={{alignSelf: 'center'}}>
                                                <Image
                                                    onPress={() => stopReading()}
                                                    style={{width: 50, height: 50, marginRight: 1, marginBottom: 16}}
                                                    source={require('../assets/stopbtn.png')}
                                                />
                                        </TouchableOpacity> */}

                                    
                                </>
                            
                                ) : (
                                    <>
                                            <TouchableOpacity> 
                                                <Image
                                                    style={{width: 50, height: 50, marginLeft: -15, marginTop: 6}}
                                                    source={require('../assets/backbtn.png')}
                                                />
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity
                                                onPress={() => resumeReading()}
                                                style={{alignSelf: 'center'}}>
                                                    <Image
                                                        onPress={() => resumeReading()}
                                                        style={{width: 50, height: 50, marginLeft: 5, marginBottom: 10, color: '#000'}}
                                                        source={require('../assets/playbtn.png')}
                                                    />
                                                </TouchableOpacity>
                                            
                                            <TouchableOpacity>
                                                <Image
                                                    style={{width: 50, height: 50, marginTop: 6}}
                                                    source={require('../assets/rightbtn.png')}
                                                />
                                            </TouchableOpacity>
                                                

                                        {/* <TouchableOpacity
                                            onPress={() => stopReading()}
                                            style={{alignSelf: 'center'}}>
                                                <Image
                                                    onPress={() => stopReading()}
                                                    style={{width: 50, height: 50, marginRight: 1, marginBottom: 16}}
                                                    source={require('../assets/stopbtn.png')}
                                                />
                                        </TouchableOpacity> */}
                                        
                                    </>
                                )}
                        
                    </View>
                
                ) : (
                <TouchableOpacity>
                    <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '105%',
                    }}>

                        <TouchableOpacity> 
                            <Image
                                style={{width: 50, height: 50, marginLeft: -20, marginTop: 6}}
                                source={require('../assets/backbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => read()}>
                            <Image
                                onPress={() => read}
                                style={{width: 50, height: 50, marginRight: 10, marginBottom: 10}}
                                source={require('../assets/playbtn.png')}
                            />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Image
                                style={{width: 50, height: 50, marginRight: 10, marginTop: 6}}
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