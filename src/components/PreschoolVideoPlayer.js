import React,{useState} from 'react'
import { StyleSheet, Text, View, StatusBar, } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import YouTube from 'react-native-youtube';
import Spinner from './common/Spinner';
import CButton from '../components/common/CustomButton';

export default function PreschoolVideoPlayer({navigation, route}) {
    const {videoLink, videoTitle} = route.params;
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
              
                {/* <Text 
                style={{
                    textTransform:'uppercase',
                     fontFamily:'Nunito-Bold',
                      fontSize:18, 
                      paddingLeft:20,
                     paddingRight:20,
                       marginTop:10}}>{sermonName}</Text>
            
                <Text  */}
                {/* style={{
                    fontSize:14, 
                    paddingLeft:20,
           paddingRight:20,
                    marginTop:8,
                    fontFamily:'Nunito-ExtraLight', 
                letterSpacing:0.6}}>{Moment(date).format(' DD MMM YYYY')}, {preacher}</Text> */}
            <View style={styles.options}>

            {/* <View style={styles.optionContainer}>
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
                      style={{fontSize:14, fontFamily:'Nunito-Light'}}>Assessment</Text>
               </View> */}


               <View>
                        <CButton
                            onPress={() => {
                                    navigation.navigate('SchoolCurriculumQuiz')
                                } 
                            }>
                                View Assessment
                        </CButton>
               </View>

            </View>

            {/* <View style={styles.overview}>
                <Text style={styles.title}>Overview</Text>
                <Text 
                style={{ 
                    fontFamily:'Nunito-ExtraLight', 
                    fontSize:14,
                marginTop:10}}>{overview}</Text>
            </View> */}
                
            </View>
         </ScrollView>
    );
}

// const styles = StyleSheet.create({ video:{height: '60%', //100%
//     alignSelf: 'stretch',
//      width: '100%',
//     marginBottom: 160}, })


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












