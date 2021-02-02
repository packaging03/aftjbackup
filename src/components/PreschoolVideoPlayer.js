import React,{useState, useCallback} from 'react'
import { StyleSheet, Text, View, StatusBar, } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';
import Spinner from './common/Spinner';
import CButton from '../components/common/CustomButton';
import YoutubePlayer from "react-native-yt-player";

export default function PreschoolVideoPlayer({navigation, route}) {
    const {videoLink, videoTitle, pageId} = route.params;
    console.log("videoLink: " + videoLink);
    console.log("pageId: " + pageId);
    const [isready, setIsReady] = useState(false);
    const [playing, setPlaying] = useState(false);

    {{navigation.setOptions({title:videoTitle})}}
   

    return (

        <ScrollView>
           <StatusBar backgroundColor="transparent" translucent />  
            <View  style={styles.sermon}>
                
                <View style={{backgroundColor:'white', borderColor:'white', borderWidth:0, borderRadius:15,}}>
                
                    
                    <YoutubePlayer
                        //loop
                        videoId={videoLink}
                        autoPlay
                        onStart={() => console.log("onStart")}
                        onEnd={() => console.log("onEnd")}
                    />

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

const TopBar = ({ play, fullScreen }) => (
    <View
      style={{
        alignSelf: "center",
        position: "absolute",
        top: 0
      }}
    >
      <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
    </View>
  );

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
            alignItems:'center',
            width:'100%',
            justifyContent:'center'
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












