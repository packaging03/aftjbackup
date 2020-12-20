import React, {useState, useEffect} from 'react';
import {View, Image, Text, StatusBar, TouchableOpacity, SafeAreaView} from 'react-native';
import {BoldCustomButton} from './common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import Button from '../components/common/PopupButton';
import Button2 from '../components/common/PopupButton2';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
  } from 'react-native-popup-dialog';
  const closeIcon = '../assets/closebtn.png';
  import AwesomeAlert from 'react-native-awesome-alerts';
import { BlurView } from '@react-native-community/blur';
const Giving = ({navigation}) => {

    const [salert, setAlert] = useState(false);
    const [show, setShow] = useState(false);

  //function to show auth alert
  showAlert = () => {
    //checking if the user session is active before setting the variable
    AsyncStorage.getItem('accessToken').then(obj => {
      //user is not logged in
      if (obj == undefined) {
        displayModal(true);
      } else {
        //user is already logged in
        setAlert(false);
      }
    });
  };

  //function to hide auth alert
  hideAlert = () => {
    setShow(false)
  };

  const dop = () => {
    setShow(false)
  };

  const displayModal = (show) => {
    setShow(show)
  }

    useEffect(() => {
        //function to show auth alert call
        showAlert();
    }, [1]);

    return(
        <SafeAreaView  style={{flex:1}}> 
            <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent />
                
                <Text style={styles.text}>For your convenience, donate to JCCI GT via the below link to our secure donation site. God bless you as you do so.</Text>
            
                <BoldCustomButton style={{alignSelf:'center', marginTop:30}}>TITHES &amp; OFFERINGS</BoldCustomButton>

                <Text style={{alignSelf:'center',fontFamily: 'Nunito-Regular',
    fontSize: 16, paddingTop:40, paddingBottom:40 }}>OR</Text>

            <TouchableOpacity style={{
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    width: '70%',
    borderRadius: 10,
    shadowRadius: 2,
    elevation: 2,

    shadowColor: '#191C52',
    alignItems: 'center',
    alignContent: 'center',
  }}>
      <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Image style={{width:20, height:20, marginRight:10}} source={require('../assets/cash-app.png')} />
            <Text style={{
            alignSelf: 'center',
            color: '#000',
            fontFamily: 'Nunito-Bold',
            fontSize: 14,
            paddingTop: 10,
            paddingBottom: 10,
        }}>Cash App</Text>
      </View>

                
                </TouchableOpacity>
            
            <Dialog
            // onDismiss={() => {
            //   dop
            // }}
            width={0.9}
            visible={show}
            rounded
            actionsBordered
            dialogStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
            footer={
              <BlurView
                showBlur={false}
                blurType="light"
                show={show}
                blurAmount={8}
                reducedTransparencyFallbackColor="white"
              > 
              <DialogFooter>
                <DialogButton
                  text=""
                  bordered
                  onPress={() => {
                    dop
                  }}
                  // onPress={() => 
                  //   navigation.navigate('SignUp')
                  // }
                  textStyle={{color:"white"}}
                  key="button-2"/>
                            <View style={styles.MbuttonContainer}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              dop
                                            }}>
                                              <Button2
                                                style={styles.Mbutton}
                                                text="    Sign Up    "
                                                onPress={() => {
                                                  navigation.navigate('SignUp')
                                                  displayModal(false);
                                                }}
                                              />
                                        </TouchableOpacity>
                                        <Button
                                          style={styles.Mbutton}
                                          text="    SKIP    "
                                          // onPress={() => {
                                          //   dop
                                          // }}
                                          onPress={() => {
                                            displayModal(false);}}
                                        />
                            </View>
                                        
                            <View>
                                
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        marginTop:20,
                                        marginRight: 20,
                                        width: '10%', marginTop: -180, alignSelf: 'flex-end'
                                      }}>
                                      <TouchableOpacity
                                    onPress={() =>
                                      hideAlert()
                                    }><Image source = {require(closeIcon)}  style={{height:10,width:10}} />
                                    </TouchableOpacity>
                                    </View>
      
                                <Text style={{color:"white", marginTop:-140, marginLeft:30, lineHeight: 22, fontSize: 12, marginRight: 28,}}>
                                    Sign Up on this platform to get better experience and updates about our events and programs, as you worship with us
                                </Text>
                            </View>
              </DialogFooter>
              </BlurView>
            }>
            
          </Dialog>
  

             </View>
        </SafeAreaView>
    )
};

const styles = {

    text:{
        margin:20,
        fontFamily:'Nunito-Light',
        fontSize:14,
    },
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white'
    },
    absolute: {
      position: 'absolute',
      top: '46%',
      
      bottom:'34%',
     
    },
    absoluteHide: {
      position: 'absolute',
      top: '100%',
      bottom:'34%',
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
    
}

export default Giving;