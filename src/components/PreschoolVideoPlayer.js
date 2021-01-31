import React,{useState} from 'react'
import { StyleSheet, Text, View, StatusBar, } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';
import Spinner from './common/Spinner';
import CButton from '../components/common/CustomButton';

export default function PreschoolVideoPlayer({navigation, route}) {
    const {videoLink, videoTitle, pageId} = route.params;
    console.log("videoLink: " + videoLink);
    console.log("pageId: " + pageId);
    const [isready, setIsReady] = useState(false);
    {{navigation.setOptions({title:videoTitle})}}
    // return (
    //     <View style = {{backgroundColor:'#fff'}}>
    //         <YouTube 
    //                 style={styles.video}
    //                 key='AIzaSyB1K6hMGSyf1jznInofqdrP3turp5TzvxI'
    //                 apiKey='AIzaSyB1K6hMGSyf1jznInofqdrP3turp5TzvxI'
    //                 videoId={videoLink}
    //                 fullscreen ={false}
    //                 play={true}
    //                 loop={false}
    //         />


    //         <TouchableOpacity onPress={()=>navigation.navigate('SchoolCurriculumQuiz')}> 
    //             <CButton
    //                 style={{marginBottom: 20}}
    //                 onPress={() => {
    //                         navigation.navigate('SchoolCurriculumQuiz')
    //                     } 
    //                 }>
    //                     View Assessment
    //             </CButton>
   
    //         </TouchableOpacity>
            
           
    //     </View>
    // )

    return (

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
                        source={{uri: videoLink}}
                        />
                </View>
              
            <View style={styles.options}>


               <View>
                        <CButton
                            onPress={() => {
                                //navigation.navigate('Preschoolplayer',{videoLink: item.videoSource, videoTitle:item.title, pageId: 10} )
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












