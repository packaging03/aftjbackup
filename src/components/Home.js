import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Linking,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Geocoder from 'react-native-geocoding';
import {color} from 'react-native-reanimated';
import Swiper from './common/Swiper';
import Button from '../components/common/PopupButton';
import Button2 from '../components/common/PopupButton2';
import Button3 from '../components/common/PopupButton3';
import CustumButton from '../components/common/CustumButton';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import AwesomeAlert from 'react-native-awesome-alerts';
import {BlurView} from '@react-native-community/blur';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import Geolocation from 'react-native-geolocation-service';
import RNReverseGeocode from '@kiwicom/react-native-reverse-geocode';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Dimensions} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
var {height, width} = Dimensions.get('window');

export default function Home({navigation}) {
  const ITEM_SIZE = width * 0.85;
  const img = '../assets/jcci_logo.png';
  const closeIcon = '../assets/closebtn.png';
  const aftjIcon = '../assets/aftj_logo.png';
  const [salert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [attendance, setAttendance] = useState('');
  const [covid, setCovid] = useState(false);
  const [userCordinate, setUserCordinate] = useState('');

  const fetchNearestPlacesFromGoogle = (lati, longi) => {
    const latitude = lati; // you can update it with user's latitude & Longitude
    const longitude = longi;
    let radMetter = 1 * 1000; // Search withing 1 KM radius
    let apiKey = 'AIzaSyDcQ3x2xO0zFeh2EKF3Ilguctn8KXyDpmo';

    const url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      latitude +
      ',' +
      longitude +
      '&radius=' +
      radMetter +
      '&key=' +
      apiKey;

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        var places = [];
        for (let googlePlace of res.results) {
          var place = {};
          var lat = googlePlace.geometry.location.lat;
          var lng = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: lat,
            longitude: lng,
          };

          place['placeTypes'] = googlePlace.types;
          place['coordinate'] = coordinate;
          place['placeId'] = googlePlace.place_id;
          place['placeName'] = googlePlace.name;

          places.push(place);
        }

        console.log(places);

        for (let AFTj = 0; AFTj < places.length; AFTj++) {
          if (
            places[AFTj].placeName === 'JCCI Glory Tabernacle' &&
            places[AFTj].placeTypes[0] === 'church'
          ) {
            console.log(places[AFTj].placeName);
            // alert(places[AFTj].placeName);
            // setAttendance(places[AFTj].placeName);
            // console.log(places[AFTj].placeTypes[0]);
          } else {
            console.log('Not in Church radius');
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    AsyncStorage.getItem('popup').then(obj => {
      if (obj == 'setup') {
        //AsyncStorage.setItem('popup', "setup");
      } else {
        displayCovid(true);
        AsyncStorage.setItem('popup', 'setup');
      }
    });
  }, [1]);

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'AFTj needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission was granted

          getOneTimeLocation();
          console.log('location permission granted');
        } else {
          alert('Permission Denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // request location cord.
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        if (currentLatitude !== null && currentLatitude !== null) {
          const dataCord = {
            longitude: JSON.parse(currentLongitude),
            latitude: JSON.parse(currentLatitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setUserCordinate(dataCord);
          console.log(dataCord);
          fetchNearestPlacesFromGoogle(currentLatitude, currentLongitude);
          Geocoder.from(currentLatitude, currentLongitude)
            .then(json => {
              var addressComponent = json.results[0].address_components[0];
              console.log(addressComponent);
            })
            .catch(error => console.warn(error));
        }
        // console.log(cord);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  // const getUserAddress = () => {
  //   try {
  //     const searchText = 'JCCI GLORY TABERNACLE';
  //     RNReverseGeocode.searchForLocations(searchText, region, (err, res) => {
  //       storeAddress(res[0].address);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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

  //function to hide covid alert
  hideCovid = () => {
    displayCovid(false);
  };

  const closeCovid = () => {
    displayCovid(false);
  };

  const displayCovid = covid => {
    setCovid(covid);
  };

  const _linkPressed = url => {
    Linking.openURL(url);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [defaultAnimationDialog, setDefaultAnimationDialog] = useState(true);
  if (salert) {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" translucent />
        <ScrollView style={{backgroundColor: 'white', marginBottom: -100}}>
          <Swiper>
            {/* First screen */}
            <ImageBackground
              source={require('../assets/intro1.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Discover Your Faith</Text>
                <Text style={styles.text}>
                  In the beginning God created the Heavens and the Earth...
                </Text>
                <Text style={styles.textbelow}>Gen 1:1</Text>
              </View>
            </ImageBackground>
            {/* Second screen */}
            <ImageBackground
              source={require('../assets/intro2.gif')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Join Us Live</Text>
                <Text style={styles.text}>
                  Not forsaking the assembling of ourselves together, as the
                  manner of some is; but exhorting one another: and so much the
                  more, as ye see the day approaching.
                </Text>
                <Text style={styles.textbelow}>Heb. 10 : 25</Text>
                <Button3
                  text="     JOIN    "
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </ImageBackground>
            {/* Third screen */}
            <ImageBackground
              source={require('../assets/intro3.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Sermon</Text>
                <Text style={styles.text}>
                  Study to shew thyself approved unto God, a workman that
                  needeth not to be ashamed, rightly dividing the word of truth.
                </Text>
                <Text style={styles.textbelow}>2Tim. 2 : 15</Text>
                <Button3
                  text="     LISTEN     "
                  onPress={() => navigation.navigate('Sermons')}
                />
              </View>
            </ImageBackground>

            {/* Fourth screen */}
            <ImageBackground
              source={require('../assets/intro4.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Give Wholehearted</Text>
                <Text style={styles.text}>
                  For to this end also did I write, that I might know the proof
                  of you, whether ye be obedient in all things.
                </Text>
                <Text style={styles.textbelow}>2Cor. 2 : 9</Text>
                <Button3
                  text="      GIVE      "
                  onPress={() => navigation.navigate('Giving')}
                />
              </View>
            </ImageBackground>

            {/* Fifth screen */}
            <ImageBackground
              source={require('../assets/intro5.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Prayer Request</Text>
                <Text style={styles.text}>
                  Be careful for nothing; but in everything by prayer and
                  supplication with thanksgiving let your requests be made known
                  unto God.
                </Text>
                <Text style={styles.textbelow}>Phil. 4 : 6</Text>
                <Button3
                  text="      REQUEST      "
                  onPress={() => navigation.navigate('PrayerRequest')}
                />
              </View>
            </ImageBackground>

            {/* Sixth screen */}
            <ImageBackground
              source={require('../assets/intro6.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Events</Text>
                <Text style={styles.text}>
                  Not forsaking the assembling of ourselves together, as the
                  manner of some is; but exhorting one another: and so much the
                  more, as ye see the day approaching.
                </Text>
                <Text style={styles.textbelow}>Heb. 10 : 25</Text>
                <Button3
                  text="       VIEW       "
                  onPress={() => navigation.navigate('Events')}
                />
              </View>
            </ImageBackground>

            {/* Seventh screen */}
            <ImageBackground
              source={require('../assets/intro7.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Connect</Text>
                <Text style={styles.text}>
                  So we, being many, are one body in Christ, and every one
                  members one of another.
                </Text>
                <Text style={styles.textbelow}>Rom. 12 : 15</Text>
                <Button3
                  text="CONNECT"
                  onPress={() => navigation.navigate('Connect')}
                />
              </View>
            </ImageBackground>

            {/* Seventh screen */}
            <ImageBackground
              source={require('../assets/intro8.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Announcements</Text>
                <Text style={styles.text}>
                  ...let the inhabitants of the rock sing, let them shout from
                  the top of the mountains.
                </Text>
                <Text style={styles.textbelow}>Isa 42 : 11b</Text>
                <Button3
                  text="       VIEW      "
                  onPress={() => navigation.navigate('SpecialAnnouncements')}
                />
              </View>
            </ImageBackground>
          </Swiper>

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
                      // onPress={() => {
                      //   dop
                      // }}
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
                      <TouchableOpacity onPress={() => displayModal(false)}>
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

          {/* this following is the old mackup */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon
                  name="close"
                  onPress={() => setModalVisible(!modalVisible)}
                  color={'#000'}
                  style={{position: 'absolute', top: 15, right: 15}}
                  size={25}
                />

                <TouchableOpacity
                  style={{width: '100%', marginTop: 12}}
                  onPress={() =>
                    _linkPressed(
                      'https://www.youtube.com/channel/UC9Vn8tkYBAMXU7dDNZ_p6ag',
                    )
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-youtube"
                      color={'red'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with youtube</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() =>
                    _linkPressed('https://www.instagram.com/jccigt/')
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-instagram"
                      color={'#962fbf'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with Instagram</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() =>
                    _linkPressed('https://web.facebook.com/jccihouseofglory/')
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-facebook"
                      color={'#3b5998'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with Facebook</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    marginTop: 18,
                    height: 0.5,
                    backgroundColor: '#000',
                  }}
                />
                <Text style={{color: '#191C52', textAlign: 'left', margin: 10}}>
                  Use a different app
                </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" translucent />
        <ScrollView style={{backgroundColor: 'white', marginBottom: -100}}>
          <Swiper>
            {/* First screen */}
            <ImageBackground
              source={require('../assets/intro1.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Discover Your Faith</Text>
                <Text style={styles.text}>
                  In the beginning God created the Heavens and the Earth...
                </Text>
                <Text style={styles.textbelow}>Gen 1:1</Text>
              </View>
            </ImageBackground>
            {/* Second screen */}
            <ImageBackground
              source={require('../assets/intro2.gif')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Join Us Live</Text>
                <Text style={styles.text}>
                  Not forsaking the assembling of ourselves together, as the
                  manner of some is; but exhorting one another: and so much the
                  more, as ye see the day approaching.
                </Text>
                <Text style={styles.textbelow}>Heb. 10 : 25</Text>
                <Button3
                  text="     JOIN    "
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </ImageBackground>
            {/* Third screen */}
            <ImageBackground
              source={require('../assets/intro3.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Sermon</Text>
                <Text style={styles.text}>
                  Study to shew thyself approved unto God, a workman that
                  needeth not to be ashamed, rightly dividing the word of truth.
                </Text>
                <Text style={styles.textbelow}>2Tim. 2 : 15</Text>
                <Button3
                  text="     LISTEN     "

                  onPress={() => navigation.navigate('PodcastList')}


                />
              </View>
            </ImageBackground>

            {/* Fourth screen */}
            <ImageBackground
              source={require('../assets/intro4.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Give Wholehearted</Text>
                <Text style={styles.text}>
                  For to this end also did I write, that I might know the proof
                  of you, whether ye be obedient in all things.
                </Text>
                <Text style={styles.textbelow}>2Cor. 2 : 9</Text>
                <Button3
                  text="      GIVE      "
                  onPress={() => navigation.navigate('Giving')}
                />
              </View>
            </ImageBackground>

            {/* Fifth screen */}
            <ImageBackground
              source={require('../assets/intro5.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Prayer Request</Text>
                <Text style={styles.text}>
                  Be careful for nothing; but in everything by prayer and
                  supplication with thanksgiving let your requests be made known
                  unto God.
                </Text>
                <Text style={styles.textbelow}>Phil. 4 : 6</Text>
                <Button3
                  text="REQUEST"
                  onPress={() => navigation.navigate('PrayerRequest')}
                />
              </View>
            </ImageBackground>

            {/* Sixth screen */}
            <ImageBackground
              source={require('../assets/intro6.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Events</Text>
                <Text style={styles.text}>
                  Not forsaking the assembling of ourselves together, as the
                  manner of some is; but exhorting one another: and so much the
                  more, as ye see the day approaching.
                </Text>
                <Text style={styles.textbelow}>Heb. 10 : 25</Text>
                <Button3
                  text="       VIEW       "
                  onPress={() => navigation.navigate('Events')}
                />
              </View>
            </ImageBackground>

            {/* Seventh screen */}
            <ImageBackground
              source={require('../assets/intro7.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Connect</Text>
                <Text style={styles.text}>
                  So we, being many, are one body in Christ, and every one
                  members one of another.
                </Text>
                <Text style={styles.textbelow}>Rom. 12 : 15</Text>
                <Button3
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  text="CONNECT"
                  onPress={() => navigation.navigate('Connect')}
                />
              </View>
            </ImageBackground>

            {/* Seventh screen */}
            <ImageBackground
              source={require('../assets/intro8.png')}
              style={styles.img}>
              <View style={styles.child}>
                <Text style={styles.header}>Announcements</Text>
                <Text style={styles.text}>
                  ...let the inhabitants of the rock sing, let them shout from
                  the top of the mountains.
                </Text>
                <Text style={styles.textbelow}>Isa 42 : 11b</Text>
                <Button3
                  text="       VIEW      "
                  onPress={() => navigation.navigate('SpecialAnnouncements')}
                />
              </View>
            </ImageBackground>
          </Swiper>

          <Dialog
            width={0.95}
            height="46%"
            visible={covid}
            rounded
            actionsBordered
            dialogStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              marginTop: '10%',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
              marginTop: -40,
              borderWidth: 0.0,
            }}
            footer={
              <BlurView
                showBlur={false}
                blurType="light"
                show={covid}
                style={{height: '100%'}}
                blurAmount={8}
                reducedTransparencyFallbackColor="black">
                <DialogFooter>
                  <DialogButton
                    text=""
                    onPress={() => {
                      closeCovid();
                    }}
                    textStyle={{color: 'white'}}
                    key="button-2"
                  />
                  <View style={styles.MbuttonContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        closeCovid();
                      }}
                    />
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        closeCovid();
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignContent: 'space-between',
                          marginTop: 10,

                          width: '100%',
                          marginTop: -190,
                        }}>
                        <Image
                          source={require(aftjIcon)}
                          style={{
                            height: 20,
                            width: 50,
                            marginRight: '63%',
                            alignSelf: 'flex-start',
                          }}
                        />

                        <TouchableOpacity
                          style={{
                            height: 10,
                            width: 10,
                            marginLeft: '15%',
                            marginRight: '4%',
                            alignSelf: 'flex-start',
                          }}
                          onPress={() => {
                            closeCovid();
                          }}>
                          <Image
                            onPress={() => {
                              closeCovid();
                            }}
                            source={require(closeIcon)}
                            style={{
                              height: 10,
                              width: 10,
                              marginLeft: '27%',
                              alignSelf: 'flex-start',
                            }}
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignContent: 'space-between',
                          marginTop: 10,

                          width: '100%',
                          marginTop: -100,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>1.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                Compulsory Temperature Check
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 7,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                (Above 37.5C will be denied entry)
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>2.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 10,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                No Mask, No Church
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 7,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                (Wear face mask to gain entry)
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignContent: 'space-between',
                          marginTop: 10,

                          width: '100%',
                          marginTop: -42,
                        }}>
                        {/* <Image source = {require(aftjIcon)}  style={{height:10,width:30, marginRight: '35%', alignSelf: 'flex-start'}} /> */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>3.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                  marginRight: 19,
                                }}>
                                Washing of hand thoroughly before entry is very
                                compulsory
                              </Text>
                              {/* <Text style={{color: 'white', fontSize: 5, fontFamily: 'Nunito-Regular', letterSpacing: 0.7}}>
                                                  (Above 37.5C will be denied entry)
                                              </Text> */}
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>4.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                Hand Sanitizers will be provided
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 7,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                (You can also come with sanitizer)
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignContent: 'space-between',
                          marginTop: 10,

                          width: '100%',
                          marginTop: 18,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>5.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                  marginRight: 25,
                                }}>
                                Social distancing must be strictly adhered to.
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>6.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                  marginRight: 25,
                                }}>
                                Contactless entrance and seating arragement.
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 7,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                }}>
                                {/* (You can also come with sanitizer) */}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignContent: 'space-between',
                          marginTop: 10,

                          width: '100%',
                          marginTop: 58,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View>
                            <Text style={styles.Number1}>7.</Text>
                          </View>
                          <View style={{marginTop: 1}}>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                marginLeft: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 8,
                                  fontFamily: 'Nunito-Regular',
                                  letterSpacing: 0.7,
                                  marginRight: 25,
                                }}>
                                Church Hall will be disinfected before and after
                                each services.
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 8,
                          }}>
                          <View />
                        </View>
                      </View>

                      <Text
                        style={{
                          color: 'white',
                          marginTop: -240,
                          marginLeft: 30,
                          alignSelf: 'center',
                          lineHeight: 22,
                          fontSize: 18,
                          marginRight: 28,
                        }}>
                        Covid-19 Guidelines
                      </Text>

                      <Text
                        style={{
                          color: 'white',
                          marginTop: 260,
                          marginLeft: 30,
                          alignSelf: 'center',
                          lineHeight: 22,
                          fontSize: 10,
                          marginRight: 28,
                          fontFamily: 'Nunito-Regular',
                        }}>
                        Stay Safe, Stay Healthy. Covid-19 is real.
                      </Text>
                    </TouchableOpacity>
                  </View>
                </DialogFooter>
              </BlurView>
            }
          />

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
                      // onPress={() => {
                      //   dop
                      // }}
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
                      <TouchableOpacity onPress={() => displayModal(false)}>
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

          {/* this following is the old mackup */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Icon
                  name="close"
                  onPress={() => setModalVisible(!modalVisible)}
                  color={'#000'}
                  style={{position: 'absolute', top: 15, right: 15}}
                  size={25}
                />

                <TouchableOpacity
                  style={{width: '100%', marginTop: 12}}
                  onPress={() =>
                    _linkPressed(
                      'https://www.youtube.com/channel/UC9Vn8tkYBAMXU7dDNZ_p6ag',
                    )
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-youtube"
                      color={'red'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with youtube</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() =>
                    _linkPressed('https://www.instagram.com/jccigt/')
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-instagram"
                      color={'#962fbf'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with Instagram</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() =>
                    _linkPressed('https://web.facebook.com/jccihouseofglory/')
                  }>
                  <View style={styles.openWith}>
                    <Icon
                      style={styles.icon}
                      name="logo-facebook"
                      color={'#3b5998'}
                      size={25}
                    />
                    <Text style={styles.openWithText}>Open with Facebook</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    marginTop: 18,
                    height: 0.5,
                    backgroundColor: '#000',
                  }}
                />
                <Text style={{color: '#191C52', textAlign: 'left', margin: 10}}>
                  Use a different app
                </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    borderColor: '#191C52',
    borderRadius: 3,
    borderWidth: 1,
    padding: 5,
    marginTop: 14,
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    flex: 1,
    alignContent: 'center',
    flexDirection: 'row',
  },
  absolute: {
    position: 'absolute',
    top: '46%',
    left: 40,
    bottom: '34%',
    right: 40,
  },
  // absoluteHide: {
  //   position: 'absolute',
  //   top: '100%',
  //   left: 40,
  //   bottom:'34%',
  //   right: 40,
  // },
  bannerTextContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    borderColor: '#191C52',
  },
  bannerText: {
    fontSize: 17,
    fontWeight: '300',
    color: '#191C52',
  },
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  img: {
    width: '100%',
    height: '100%',
  },
  child: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  childPadding: {
    marginTop: 90,
  },
  center: {
    alignItems: 'center',
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'frankruhllibre-medium',
    marginTop: 150,
    fontSize: 33,
    textAlign: 'center',
  },
  // Text below header
  text: {
    color: '#F2C94C',
    fontFamily: 'IMFellDoublePica-Italic',
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'left',
  },
  textbelow: {
    color: '#FFFFFF',
    fontFamily: 'IMFellDoublePica-Italic',
    fontSize: 16,
    marginHorizontal: 25,
    textAlign: 'right',
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 1,
  },
  bimg: {
    width: '100%',
    height: 70,
    marginLeft: 0,
  },
  counthead: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 10,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  counthead2: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  counthead3: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 12,
    marginLeft: 10,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  counthead4: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    marginTop: -20,
  },
  buttonContainer2: {
    flex: 2,
    marginTop: -27,
  },
  centeredView: {
    // flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    width: '100%',
    bottom: 0,
    // marginTop: 22
  },
  modalView: {
    // margin: 20,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width: '100%',
    backgroundColor: '#191C52',
    borderRadius: 20,
    padding: 10,
    marginTop: '10%',
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 19,
  },
  openWith: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginRight: 25,
  },
  openWithText: {
    fontSize: 14,
    letterSpacing: 2,
  },
  mainWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  contentWrap: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  controlsView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    bottom: 0,
  },
  textModal: {
    fontSize: 16,
    fontFamily: 'Nunito-Light',
    color: '#fff',
    padding: 20,
    top: -5,
    paddingTop: 50,
    paddingBottom: 5,
    textAlign: 'left',
  },
  Mcontainer: {
    flex: 1,
    position: 'absolute',
    top: 98,
    left: 4,
    bottom: '4%',
    right: 4,
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
  Number1: {
    color: 'black',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    lineHeight: 32,
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    textAlignVertical: 'center',
    textAlign: 'center',
    width: 18,
    borderRadius: 4,
  },
});

const iconStyles = {
  size: 100,
  color: '#FFFFFF',
};
