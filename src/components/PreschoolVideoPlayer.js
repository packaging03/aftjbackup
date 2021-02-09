// import React,{useState, useCallback} from 'react'
// import { StyleSheet, Text, View, StatusBar, } from 'react-native'
// import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
// import { WebView } from 'react-native-webview';
// import Icon from 'react-native-vector-icons/Ionicons';
// import YouTube from 'react-native-youtube';
// import Spinner from './common/Spinner';
// import CButton from '../components/common/CustomButton';
// import YoutubePlayer from "react-native-yt-player";

// export default function PreschoolVideoPlayer({navigation, route}) {
//     const {videoLink, videoTitle, pageId} = route.params;
//     console.log("videoLink: " + videoLink);
//     console.log("pageId: " + pageId);
//     const [isready, setIsReady] = useState(false);
//     const [playing, setPlaying] = useState(false);

//     {{navigation.setOptions({title:videoTitle})}}
   

//     return (

//         <ScrollView>
//            <StatusBar backgroundColor="transparent" translucent />  
//             <View  style={styles.sermon}>
//                 <View style={{backgroundColor:'white', borderColor:'white', borderWidth:0, margin:15, borderRadius:15}}>
//                     <WebView
//                         containerStyle={styles.video}
//                         allowsFullscreenVideo
//                         allowsInlineMediaPlayback
//                         cacheEnabled
//                         style={{backgroundColor: 'transparent',  borderWidth:0, marginHorizontal: -50, }}
//                         source={{uri: videoLink}}
//                         />
//                 </View>
//                 {/* <View style={{backgroundColor:'white', borderColor:'white', borderWidth:0, borderRadius:15,}}>
                
                    
//                     <YoutubePlayer
//                         //loop
//                         videoId={videoLink}
//                         autoPlay
//                         onStart={() => console.log("onStart")}
//                         onEnd={() => console.log("onEnd")}
//                     />

//                 </View> */}
              
//             <View style={styles.options}>
//                <View>
//                         <CButton
//                             onPress={() => {
//                                     navigation.navigate('SchoolCurriculumQuiz', {pageId: pageId})
//                                 } 
//                             }>
//                                 View Assessment
//                         </CButton>
//                </View>

//             </View>
//             </View>
//          </ScrollView>
//     );
// }

// const TopBar = ({ play, fullScreen }) => (
//     <View
//       style={{
//         alignSelf: "center",
//         position: "absolute",
//         top: 0
//       }}
//     >
//       <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
//     </View>
//   );

//     const styles = {

//         overview:{
//             marginTop:20,
//             paddingLeft:20,
//             paddingRight:20,
    
//         },
//         title:{
//             fontSize:18,
//             fontFamily:'Nunito-Light',
    
//         },
//         desc:{
    
//         },
//         optionContainer:{
//             paddingLeft:60,
//             paddingRight:20,
//             display:'flex',
//             flexDirection:'column',
//             alignItems:'center'
//         },
//         sermon:{
            
//             width:"100%",
//             height:'100%'
//         },
//         video: {
           
//             height: 200,
//             overflow:'hidden',
//             borderWidth: 1,
//             width: '100%',
//             backgroundColor:'black',
//             borderColor:'white',
//             borderRadius: 15,
    
//              },
//         imgStyle: {
//                 resizeMode: 'cover',
//                 borderRadius: 5,
//               },
//         overlay: {
//             width: '100%',
//             height: 100,
//             backgroundColor: '#000',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             opacity: 0.4,
//             borderRadius: 8,
//             },
//         options:{
//             marginTop:20,
//             display:'flex',
//             flexDirection: 'row',
//             alignItems:'center',
//             width:'100%',
//             justifyContent:'center'
//         },
//         option:{
           
//             backgroundColor:'#c5cad2',
//             display:'flex',
//             justifyContent:'center',
//             alignItems:'center',
//             width:38,
//             borderRadius:50,
//             height:38,
//         },
//         image:{
//             alignSelf:'center',
//             margin:10,
//             width:30,
//             height:30
//         }
//     }



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
import CButton from '../components/common/CustomButton';



const SermonDetails = ({route, navigation, accessToken}) => {
    const {videoLink, videoTitle, pageId} = route.params;
const [isPlaying, setPlaying] = useState(false);
const {sermonName, preacher, date, id, overview, audio, sermonId} = route.params;
var link = '';

console.log("videoLink: " + videoLink);
link = 'https://www.youtube.com/embed/' + videoLink;
console.log("videoLink: " + link);
    const shareMe = async() => {

    const shareOptions = {
        message: "Watch this message titled: " + "sermonName" + " by " ,
        url: videoLink,
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
            fetch('https://church.aftjdigital.com/api/sermon/like/4', {
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

    }, []);

    async function play(){
        // TrackPlayer.setupPlayer().then(async () => {
    
            // Adds a track to the queue
            await TrackPlayer.add({
                id: 'trackId',
                url: 'audio',
            
                // url: require('track.mp3'),
                title: "sermonName",
                // artist: preacher,
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
        .fetch('GET', 'audio', {
            //some headers ..
        })
        .then((res) => {
            console.log("Testing if this logging is working..")
            console.log('res', res);
            console.log('The file is save to ', res.path());
          })
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
                        source={{uri: link}}
                        />
                </View>
              
            <View style={styles.options}>

            <View style={styles.optionContainer}>
           
               </View>

            </View>

            <View style={styles.options}>
               <View>
                        <CButton
                            onPress={() => {
                                    navigation.navigate('SchoolCurriculumQuiz', {pageId: pageId})
                                } 
                            }>
                                View Assessment
                        </CButton>
               </View>

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