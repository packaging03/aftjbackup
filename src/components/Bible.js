import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import {AllBibleBooks} from '../components/common/RedingData';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import AwesomeAlert from 'react-native-awesome-alerts';
import { BlurView } from '@react-native-community/blur';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
const closeIcon = '../assets/closebtn.png';
const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );
};

const getAllBooks = () => {
  var allbooks = [];
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < AllBibleBooks[i]['books'].length; j++) {
      allbooks.push({
        bookName: AllBibleBooks[i]['books'][j]['bookName'],
        chapters: AllBibleBooks[i]['books'][j]['chapters'],
        testament: i,
      });
    }
  }
  return allbooks;
};

const Data = getAllBooks();

export default function Bible({navigation}) {

  const [salert, setAlert] = useState(false);
  
    useEffect(() => {
        //function to show auth alert call
        showAlert();
    }, [1]);

     //function to show auth alert
    showAlert = () => {
        //checking if the user session is active before setting the variable
        AsyncStorage.getItem('accessToken').then(obj => {
        //user is not logged in
        if (obj == undefined) {
            setAlert(true);
        } else {
            //user is already logged in
            setAlert(false);
        }
        });
    };
    

    //function to hide auth alert
    hideAlert = () => {
        setAlert(false);
    };

    const closeme = () => {
        setAlert(false);
    };

    
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 1,

          marginTop: 10,
        }}>
        <FlatList
          data={Data}
          keyExtractor={item => item.bookName}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BibleBook', {
                  book: item.bookName,
                  numberofChapters: item.chapters,
                  testament: item.testament,
                })
              }>
              <View
                style={{
                  flexDirection: 'column',

                  margin: 15,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  {item.bookName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={renderSeparator}
        />

{/* {
  salert?
    
  <BlurView
          showBlur={false}
          show={false}
          style={styles.absolute}
          blurAmount={100}
          overlayColor='transparent'
          reducedTransparencyFallbackColor="black"
        >
  <AwesomeAlert
            show={salert}
            showProgress={false}
            title=""
            contentStyle={{height: 60}}
            contentContainerStyle={{width: 800,backgroundColor:'rgba(255, 255, 255, 0.3)'}}
            message=" Sign Up on this platform to get better experience and updates about our events and programs, as you worship with us
            "
            messageStyle={{color:'#FFFFFF'}}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="SIGN UP"
            confirmText="SKIP"
            cancelButtonStyle={{marginRight: 30, borderRadius: 0, height: 40, paddingTop: 11, width: 80, alignItems: 'center',borderColor:'white',borderWidth:1}}
            confirmButtonStyle={{marginLeft: 30, borderRadius: 0, height: 40, paddingTop: 11, width: 70, alignItems: 'center',borderColor:'white',borderWidth:1}}
            confirmButtonColor="transparent"
            cancelButtonColor="transparent"
            onCancelPressed={() => {
              
             
              hideAlert();
              navigation.navigate('SignUp');
            }}
            onConfirmPressed={() => {
              hideAlert();
            }}
          />
  </BlurView>
  :

    
 
  <AwesomeAlert
            show={salert}
            showProgress={false}
            title=""
            contentStyle={{height: 60}}
            contentContainerStyle={{width: 800,backgroundColor:'rgba(255, 255, 255, 0.8)'}}
            message=" Sign Up on this platform to get better experience and updates about our events and programs, as you worship with us
            "
            messageStyle={{color:'#FFFFFF'}}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="SIGN UP"
            confirmText="SKIP"
            cancelButtonStyle={{marginRight: 30, borderRadius: 0, height: 40, paddingTop: 11, width: 70, alignItems: 'center'}}
            confirmButtonStyle={{marginLeft: 30, borderRadius: 0, height: 40, paddingTop: 11, width: 70, alignItems: 'center'}}
            confirmButtonColor="#c4c4c4"
            cancelButtonColor="#c4c4c4"
            onCancelPressed={() => {
              
             
              hideAlert();
              navigation.navigate('SignUp');
            }}
            onConfirmPressed={() => {
              hideAlert();
            }}
          />

  </BlurView>
} */}


{/* 

<Dialog
          onDismiss={() => {
            hideAlert();
          }}
          width={0.9}
          visible={salert}
          rounded
          actionsBordered
          dialogStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
          // dialogTitle={
          //   <DialogTitle
          //     title=""
          //     style={{
          //       backgroundColor: 'rgba(255, 255, 255, 0.3)',
          //     }}
          //     hasTitleBar={false}
          //     align="left"
          //   />
          // }
       
          footer={
            <DialogFooter style={{color:"red"}}>
              <DialogButton
                text="SIGNUP"
                bordered
                onPress={() =>  {
                  hideAlert();
                  navigation.navigate('SignUp');
}
               }
                textStyle={{color:"white"}}
                key="button-1"
              />
              <DialogButton
                text="SKIP"
                bordered
                onPress={() => {
                  hideAlert();;
                }}
                textStyle={{color:"white"}}
                key="button-2"
              />
            </DialogFooter>
          }>
          <DialogContent
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}>
              <View>
       
              <TouchableOpacity
                style={{width: '100%', marginTop: 12}}
                onPress={() =>
                  hideAlert()
                }>
                        <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          marginTop:20
                        }}
                      >
                  <Image source = {require(closeIcon)} style={{height:20,width:20}} />
                  </View>
                </TouchableOpacity>
             

                <Text style={{color:"white", marginTop:4, lineHeight: 20,}}>
            Sign Up on this platform to get better experience and updates about our events and programs, as you worship with us
            </Text>
              </View>
          
          </DialogContent>
        </Dialog> */}



{/* 
        <SCLAlert
            show={salert}
            onRequestClose={closeme}
            theme="info"
            title="Action Required"
            subtitle="Are you a new user?, kindly sign up or login for a better experience..."
            headerIconComponent={
                <Icon name="ios-thumbs-up" size={32} color="white" />
            }>
            <SCLAlertButton
                theme="success"
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
            </SCLAlertButton>
            <SCLAlertButton
                theme="info"
                onPress={() => navigation.navigate('Login')}>
                Sign In
            </SCLAlertButton>
            <SCLAlertButton
                theme="default"
                onPress={() => {
                hideAlert();
                }}>
                Cancel
            </SCLAlertButton>
        </SCLAlert> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  absolute: {
    position: 'absolute',
    top: '46%',
    left: 40,
    bottom:'34%',
    right: 40,
  },
  absoluteHide: {
    position: 'absolute',
    top: '100%',
    left: 40,
    bottom:'34%',
    right: 40,
  },

});
