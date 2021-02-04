import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Image,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
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
import {BlurView} from '@react-native-community/blur';

const About = ({navigation}) => {
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
    setShow(false);
  };

  const dop = () => {
    setShow(false);
  };

  const displayModal = show => {
    setShow(show);
  };

  useEffect(() => {
    //function to show auth alert call
    showAlert();
  }, []);

  const _linkPressed = url => {
    Linking.openURL(url);
  };
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.about}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ImageBackground
          style={styles.img}
          source={require('../assets/group443picss.png')}
        />

        <View style={styles.container} />
        <View style={styles.first}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.text}>New to AFTj Church</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.text}>Givings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.first}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Bulletin')}>
            <Text style={styles.text}>Bulletin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _linkPressed('https://jccigt.org/')}
            style={styles.button}>
            <Text style={styles.text}>Website</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.first}>
          <TouchableOpacity
            onPress={() =>
              _linkPressed('https://web.facebook.com/jccihouseofglory/')
            }
            style={styles.button}>
            <Text style={styles.text}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _linkPressed('https://www.instagram.com/jccigt/')}
            style={styles.button}>
            <Text style={styles.text}>Instagram</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.first}>
          <TouchableOpacity
            onPress={() =>
              _linkPressed(
                'https://www.youtube.com/channel/UC9Vn8tkYBAMXU7dDNZ_p6ag',
              )
            }
            style={styles.button}>
            <Text style={styles.text}>YouTube</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL(
                'https://www.google.com/maps/place/JCCI+GLORY+TABERNACLE/@33.8745141,-84.6397579,13z/data=!4m5!3m4!1s0x88f53d24892de1e3:0x45070693fba9652c!8m2!3d33.8745141!4d-84.6397579',
              )
            }>
            <Text style={styles.text}>Location</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.aboutUs}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>

        <Dialog
          // onDismiss={() => {
          //   dop
          // }}
          width={0.9}
          visible={show}
          rounded
          actionsBordered
          dialogStyle={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
          footer={
            <BlurView
              showBlur={false}
              blurType="light"
              show={show}
              blurAmount={8}
              reducedTransparencyFallbackColor="white">
              <DialogFooter>
                <DialogButton
                  text=""
                  bordered
                  onPress={() => {
                    dop;
                  }}
                  // onPress={() =>
                  //   navigation.navigate('SignUp')
                  // }
                  textStyle={{color: 'white'}}
                  key="button-2"
                />
                <View style={styles.MbuttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      dop;
                    }}>
                    <Button2
                      style={styles.Mbutton}
                      text="    Sign Up    "
                      onPress={() => {
                        navigation.navigate('SignUp');
                        displayModal(false);
                      }}
                    />
                  </TouchableOpacity>
                  <Button
                    style={styles.Mbutton}
                    text="    Login    "
                    onPress={() => {
                      navigation.navigate('Login');
                      displayModal(false);
                    }}
                  />
                </View>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop: 20,
                      marginRight: 20,
                      width: '10%',
                      marginTop: -180,
                      alignSelf: 'flex-end',
                    }}>
                    <TouchableOpacity onPress={() => hideAlert()}>
                      <Image
                        source={require(closeIcon)}
                        style={{height: 10, width: 10}}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: 'white',
                      marginTop: -140,
                      marginLeft: 30,
                      lineHeight: 22,
                      fontSize: 12,
                      marginRight: 28,
                    }}>
                    Sign Up on this platform to get better experience and
                    updates about our events and programs, as you worship with
                    us
                  </Text>
                </View>
              </DialogFooter>
            </BlurView>
          }
        />
      </View>
    </ScrollView>
  );
};
const styles = {
  aboutUs: {
    fontFamily: 'Nunito',
    letterSpacing: 0.7,
    margin: 20,
    lineHeight: 20,
    textAlign: 'justify',
  },
  text: {
    alignSelf: 'center',
    fontFamily: 'Nunito',
    color: 'black',
  },
  button: {
    width: '45%',
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 5,
    borderRadius: 2,
    backgroundColor: '#C5CAD2',
    fontFamily: 'Nunito',
    marginBottom: 15,
    alignSelf: 'center',
  },
  about: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: 180,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  first: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
};
export default About;
