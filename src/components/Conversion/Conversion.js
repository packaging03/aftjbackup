import React, {useState, useEffect}  from 'react';
import {View, Button, ScrollView, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import { WebView } from 'react-native-webview';
import { BlurView } from '@react-native-community/blur';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import PopupButton2 from '../common/PopupButton2';
import {Button2} from '../common/PopupButton';
import PopupButton3 from '../common/PopupButton3';
import PopupButton4 from '../common/PopupButton4';


const Conversion = ({navigation})=>{

    const closeIcon = '../../assets/closebtn.png';
    const aftjIcon = '../../assets/aftj_logo.png';
    const [feedback, setFeedback] = useState(false);
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
 
    const getData = async () => {
      try {
        let response = await fetch('https://church.aftjdigital.com/api/view-conversion');
        let json = await response.json();
        console.log(json.data[0]);
        setData(json.data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getData();
     
    }, []);
        
    const closeFeedback = () => {
        displayFeedback(false);
    };

    const displayFeedback = (feedback) => {
        setFeedback(feedback)
    }
    return(
        <ScrollView>
        <StatusBar backgroundColor="transparent" translucent />  

        <Dialog
           
           width={0.88}
           height='29%'
           visible={feedback}
           rounded
           dialogStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)',
             marginTop: '10%', borderColor: 'rgba(255, 255, 255, 0.1)',
           borderRadius: 12,
           borderTopColor: 'rgba(255, 255, 255, 0.1)',
           marginTop: -20,
           borderWidth: 0.0,}}
           footer={
             <BlurView
               showBlur={false}
               blurType="light"
               show={feedback}
               style={{height: '100%'}}
               blurAmount={10}
               reducedTransparencyFallbackColor="black"> 

             <DialogFooter style={{ paddingTop:40, paddingEnd:20, paddingLeft:20}}>
               <DialogButton
                 text=""
                 
                 
                 textStyle={{color:"white"}}
                 key="button-2"/>
                           <View style={styles.MbuttonContainer}>
                                
                           </View>
                                       
                           <View style={{ alignSelf:'flex-start', paddingBottom:20, marginTop:-60}}>
                           <TouchableOpacity 
                                           onPress={() => {
                                             closeFeedback()
                                           }}>
                                   <View
                                     style={{
                                       flexDirection: "row",
                                       
                                       justifyContent: 'space-around',
                                       height:30,
                                       width: '100%',
                                        marginTop: 10,
                                     }}
                                     >
                                     <Text 
                                     style={{ color:'white', fontSize:18,
                                      marginRight: '63%', alignSelf: 'flex-start'}}>Feedback</Text>
                                     <View
                                      style={{
                                       alignItems:'flex-end',
                                       display:'flex'

                                      }}>
                                     <TouchableOpacity
                                      onPress={() =>  closeFeedback()}
                                      style={{ alignSelf: 'flex-end'}}>
                                          <Image  source = 
                                                {require(closeIcon)}  
                                                style={{height:10,width:10, alignSelf: 'flex-start'}} />
                                     </TouchableOpacity>
                                     </View>
                                   </View>

                                   <View   style={ {flex: 1, display:'flex', justifyContent:'space-around', flexDirection:'column', marginLeft: 5, }}>
                                        <View>
                                            <Text 
                                            style={{color: 'white', 
                                            fontSize: 12, fontFamily: 'Nunito-Regular', 
                                            letterSpacing: 0.7 , lineHeight:20,
                                            marginTop:-20,
                                            marginRight: 19}}>
                                                We as a Church are glad and Heaven rejoices as you have dedicated your life to Christ
                                                . Fill the form so we can follow up with you.
                                            </Text>
                                        </View>

                                        <Button2 onPress={() => 
                                        { 
                                          closeFeedback();
                                          navigation.navigate('ConversionForm');
                                        }}  
                                        text={'Continue'} 
                                        style={{
                                              position:'absolute', 
                                              borderColor:'red',
                                              bottom: 0, 
                                              width: 200,
                                              fontSize: 22,}}/>
                              
                                    </View>
                                   
                              
                               </TouchableOpacity>
                           </View>
             </DialogFooter>
             </BlurView>
           }>
           
         </Dialog>
         <View  style={styles.sermon}>
             <View style={{backgroundColor:'white', borderColor:'white', borderWidth:0, margin:13, borderRadius:15}}>
              <WebView
                     containerStyle={styles.video}
                     allowsFullscreenVideo
                     allowsInlineMediaPlayback
                     cacheEnabled
                     onLoadEnd={()=>{
                        displayFeedback(true)
                     }}
                     style={{backgroundColor: 'transparent',  borderWidth:0, marginLeft: -20, marginRight: -20}}
                     source={{uri: data.video}}
                     />
             </View>
           
             <Text 
             style={{
                 textTransform:'capitalize',
                  fontFamily:'Nunito-SemiBold',
                   fontSize:18, 
                   paddingLeft:20,
                  paddingRight:20,
                    marginTop:10}}>{data.title}</Text>
         
             <Text 
             style={{
                 fontSize:14, 
                 paddingLeft:20,
        paddingRight:20,
                //  marginTop:5,
                 fontFamily:'Nunito-Regular', 
             letterSpacing:0.6}}>{data.pastor ? data.pastor : 'Pastor Ayobami'}  </Text>
        

         <View style={styles.overview}>
             <Text style={styles.title}>{data.sub_heading}</Text>
             <Text 
             style={{ 
                 fontFamily:'Nunito-Light', 
                 fontSize:14,
             marginTop:10}}>{data.body}</Text>
         </View>
             
         </View>
      </ScrollView>
    )
}


const styles = {

    overview:{
        marginTop:20,
        paddingLeft:20,
        paddingRight:20,

    },
    title:{
        fontSize:18,
        fontFamily:'Nunito-Regular',
        marginTop:10,
        textTransform:'capitalize'
    },
    desc:{

    },
    MbuttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      Mbutton: {
        flex: 0.5,
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
       
        height: 190,
        overflow:'hidden',
        borderWidth: 1,
        backgroundColor:'black',
        borderColor:'white',
        borderRadius:15,

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

export default Conversion;
