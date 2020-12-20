/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { exp } from 'react-native-reanimated';

import * as RootNavigation from '../RootNavigation';
import Toast from 'react-native-simple-toast';
import {View, Text, StatusBar, Image, Alert, FlatList, ImageBackground} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import { WebView } from 'react-native-webview';
import Moment from 'moment';
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';



const SermonDetails = ({route, navigation, accessToken}) => {

const [isPlaying, setPlaying] = useState(false);
const {sermonName, preacher, date, id, overview, audio, sermonId} = route.params;


    const shareMe = async() => {

    const shareOptions = {
        message: "Watch this message titled: " + sermonName + " by " + preacher,
        url: id,
    }

        try {
            const shareResponse = Share.open(shareOptions);
            console.log(JSON.stringify(shareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };

    const LikeSermon = () => {
            if (accessToken === null || accessToken === "") {
                alert('Kindly Login first');
                return;
            }
            fetch('https://church.aftjdigital.com/api/sermon/like/4' + sermonId, {
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
                          if (JSON.stringify(responseJson.message) !== 'you liked this sermon' ){
                            Toast.show(responseJson.message)
                             return;
                          }
                          Toast.show(responseJson.message)
                      })
                      .catch((error) => {
                        alert(error)});
    };


    useEffect(() => {
        TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP
        ],
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE
        ]
        });

    }, []);

    async function play(){
        // TrackPlayer.setupPlayer().then(async () => {
    
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: audio,
            
                // url: require('track.mp3'),
                title: sermonName,
                artist: preacher,
                // artwork: require('track.png')
            });
        
            // Starts playing it
            await TrackPlayer.play();
        
        // });

    }

    async function downloadfile() {
        
        await RNFetchBlob
        .config({
            fileCache : true,
            // by adding this option, the temp files will have a file extension
            appendExt : 'mp3',
            addAndroidDownloads : {
                useDownloadManager : true,
                title : 'Audio',
                description : 'Audio file downloading...',
                //mime : 'application/vnd.android.package-archive',
                //path: RNFetchBlob.fs.dirs.DownloadDir + `${name}`, // Android platform
                //RNFetchBlob.fs.scanFile([ { path : res.path(), mime : 'audio/mpeg' } ]))
                mediaScannable : true,
                notification : true,
              }
        })
        .fetch('GET', audio, {
            //some headers ..
        })
        .then((res) => {
            console.log("Testing if this logging is working..")
            console.log('res', res);
            console.log('The file is save to ', res.path());
          })

        // .then((res) => {
        //     // the temp file path with file extension `png`
        //     console.log('res locat', res);
        //     console.log('The file is save to ', res.path());
        //     // Beware that when using a file path as Image source on Android,
        //     // you must prepend "file://"" before the file path
        //     //imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }}/>
        // })
    }

    async function stop(){

        await TrackPlayer.stop();
    }

    return(

        <ScrollView>
           <StatusBar backgroundColor="transparent" translucent />  
            <View  style={styles.sermon}>
                <View style={{backgroundColor:'white', borderColor:'white', borderWidth:0, margin:15, borderRadius:15}}>
                 <WebView
                        containerStyle={styles.video}
                        allowsFullscreenVideo
                        allowsInlineMediaPlayback
                        cacheEnabled
                        style={{backgroundColor: 'transparent',  borderWidth:0, marginHorizontal: -50, }}
                        source={{uri: id}}
                        />
                </View>
              
                <Text 
                style={{
                    textTransform:'uppercase',
                     fontFamily:'Nunito-Bold',
                      fontSize:18, 
                      paddingLeft:20,
                     paddingRight:20,
                       marginTop:10}}>{sermonName}</Text>
            
                <Text 
                style={{
                    fontSize:14, 
                    paddingLeft:20,
           paddingRight:20,
                    marginTop:8,
                    fontFamily:'Nunito-ExtraLight', 
                letterSpacing:0.6}}>{Moment(date).format(' DD MMM YYYY')}, {preacher}</Text>
            <View style={styles.options}>

            <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={
                ()=>{
                        try {
                            Toast.show('You Clicked Like Button...', Toast.LONG);
                            LikeSermon();
                            } catch (e) {
                            console.log(`cannot like the sermon`, e)
                          }
                    } 
                    
                    }  style={styles.option}>
                <View>
                    
                    <Icons  name='heart-outline' size={25} color='#000'/>
                   
                     </View>
                </TouchableWithoutFeedback>
                <Text 
                      style={{fontSize:14, fontFamily:'Nunito-Light'}}>Like</Text>
               </View>

            {/* <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={()=>{
                        try {
                            Toast.show('Start Downloading...', Toast.LONG);
                            downloadfile();
                            } catch (e) {
                            console.log(`cannot play the sound file`, e)
                          }
                    } }  style={styles.option}>
                <View>
                    
                    <Icons  name='arrow-collapse-down' size={25} color='#000'/>
                   
                     </View>
                </TouchableWithoutFeedback>
                <Text 
                      style={{fontSize:14, fontFamily:'Nunito-Light'}}>Download</Text>
               </View> */}

               <View style={styles.optionContainer2}>
                   <TouchableWithoutFeedback onPress={shareMe}  style={styles.option}>
                        <View>
                            <Icon  name='share-social-outline' size={25} color='#000'/>
                        </View>
                    </TouchableWithoutFeedback>
                <Text style={{
                          fontSize:14, 
                          fontFamily:'Nunito-Light'}}>Share</Text>
               </View>

               {/* <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={()=>{
                         

                         
                         if(!isPlaying){
                          try {
                             Toast.show('Starting...', Toast.LONG);
                              play(); 
                              setPlaying(!isPlaying);
                            } catch (e) {
                                   console.log(`cannot play the sound file`, e)
                              }
                         }else{
                              try {
                                  // alert('clocked')
                                  Toast.show('Stopping...', Toast.LONG);
                                  stop();
                                  console.log('stopped') 
                                  setPlaying(!isPlaying);
                                  // SoundPlayer.playUrl('http://www.lfcfaog.org/home/180014583/180014583/Audio/071518%20Christ%20Died%20For%20Sinners.mp3')
                                  } catch (e) {
                                      console.log(`cannot play the sound file`, e)
                                  }
                         }
                    } }  style={styles.option}>
                <View >
                    
                    <Icon  name='headset-outline' size={25} color='#000'/>
                   
                     </View>
                </TouchableWithoutFeedback>
                <Text 
                      style={{
                          fontSize:14, 
                          fontFamily:'Nunito-Light'}}>Listen</Text>
               </View> */}
                
                
            </View>

            <View style={styles.overview}>
                <Text style={styles.title}>Overview</Text>
                <Text 
                style={{ 
                    fontFamily:'Nunito-ExtraLight', 
                    fontSize:14,
                marginTop:10}}>{overview}</Text>
            </View>
                
            </View>
         </ScrollView>
    );
}

const styles = {

    overview:{
        marginTop:20,
        paddingLeft:20,
        paddingRight:20,

    },
    title:{
        fontSize:18,
        fontFamily:'Nunito-Light',

    },
    desc:{

    },
    optionContainer:{
        paddingLeft:60,
        paddingRight:20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    optionContainer2:{
        paddingRight:60,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    sermon:{
        
        width:"100%",
        height:'100%'
    },
    video: {
       
        height: 200,
        overflow:'hidden',
        borderWidth: 1,
        width: '100%',
        backgroundColor:'black',
        borderColor:'white',
        borderRadius: 15,

         },
    imgStyle: {
            resizeMode: 'cover',
            borderRadius: 5,
          },
    overlay: {
        width: '100%',
        height: 100,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        borderRadius: 8,
        },
    options:{
        marginTop:20,
        display:'flex',
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between'
    },
    option:{
       
        backgroundColor:'#c5cad2',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:38,
        borderRadius:50,
        height:38,
    },
    image:{
        alignSelf:'center',
        margin:10,
        width:30,
        height:30
    }
}
const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(SermonDetails);