import React, {useState, useRef, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet, View, Image, Alert, Modal} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../components/common/PopupButton';
import Button2 from '../../components/common/PopupButton2';
import {BlurView} from '@react-native-community/blur';
// import { NativeModules } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  StatusBar,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import {AuthContext} from '../common/context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  setUserToken,
  setAccessToken,
  setLogoutUser,
  setRouteName,
  setUser,
} from '../../redux/user/user.actions';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const DrawerContent = ({setUser, setUserToken, setAccessToken, ...props}) => {
  const paperTheme = useTheme();
  const [usermenu, setUsermenu] = useState(false);
  const [userImgp, setPI] = useState('');
  const [slogout, setLogout] = useState(false);
  const [blurType, setBlurType] = useState('light');
  const [defaultAnimationDialog, setDefaultAnimationDialog] = useState(false);
  const [show, setShow] = useState(false);
  const [PhotoUri, setPhotoUri] = useState();

  useEffect(()=>{

    if(props.user){
    fetch('https://church.aftjdigital.com/api/profile_image/user/'+ JSON.parse(props.user).id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          })
          .then(response => response.json())
          .then(responseJson => {
            setPhotoUri(responseJson.image);
          })
          .catch(error => {
            alert(error);
          });
        }
  })

  const {
    signOut,
    goToContacts,
    toggleTheme,
    accountAction,
    goToProfile,
    goToNotifications,
    goToDownloads,
    goToSettings,
    goHome,
    goSearch,
  } = React.useContext(AuthContext);

  const signout = () => {
    fetch('https://church.aftjdigital.com/api/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: props.accessToken,
      }),
    })
      .then(response => {
        response.json();
      })
      .then(responseJson => {
        //NativeModules.DevSettings.reload();
        setAccessToken(null);
        setUser(null);
        setLogoutUser(0);
        // setUserToken(3);
        setData();
        goHome();
        closeme();
      })
      .catch(error => {
        console.log(error);
        Toast.show('Failed to sign out', Toast.LONG)
      });
  };

  hideAlert = () => {
    setShow(false);
  };

  const displayModal = show => {
    setShow(show);
  };

  const closeme = () => {
    setLogout(false);
    props.navigation.navigate('HomeStack');
  };

  const setData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      alert(e);
    }
  };

  function getPi() {
    try {
      AsyncStorage.getItem('photoIm').then(values => {
        values ? setPI(values) : setPI(JSON.parse(props.user).image);
        console.log(values);
      });
    } catch (e) {
      console.log(e);
    }
    // console.log(userImgp);
    return userImgp;
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Drawer.Section>
              <View style={{flexDirection: 'column', marginTop: 15}}>
                <View
                  style={{
                    marginLeft: 5,
                    marginRight: 10,
                    flexDirection: 'column',
                    alignSelf: 'flex-start',
                  }}>
                  {props.user ? (
                    <TouchableOpacity
                      onPress={() => {
                        goToProfile();
                      }}>
                      <View>
                        {PhotoUri ? (
                          <Avatar.Image
                            style={{
                              alignSelf: 'flex-start',
                              marginTop: 10,
                              marginRight: 10,
                            }}
                            source={{
                              // uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                              uri: PhotoUri,
                            }}
                            size={60}
                          />
                        ) : (
                          <Avatar.Image
                            style={{
                              alignSelf: 'flex-start',
                              marginTop: 10,
                              marginRight: 10,
                            }}
                            source={{
                              // uri: props.currentUser.photoURL
                              uri:
                                'https://api.adorable.io/avatars/50/abott@adorable.png',

                              // require('../../assets/events.png' + '?type=large')
                            }}
                            size={60}
                          />
                        )}
                        <Title style={styles.title}>
                          {JSON.parse(props.user).name}
                          {/* {console.log(props.currentUser)} */}
                        </Title>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        // goToProfile({id:10});
                        accountAction();
                      }}>
                      <Avatar.Image
                        style={{
                          alignSelf: 'flex-start',
                          marginTop: 10,
                          marginRight: 10,
                        }}
                        source={
                          // uri:'https://api.adorable.io/avatars/50/abott@adorable.png',
                          // uri: getPi() + '?type=large',
                          require('../../assets/avperson.png')
                        }
                        size={60}
                      />
                      <Title style={styles.title}>Log in or Sign up</Title>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Drawer.Section>
          </View>
          {/* <Drawer.Section style={styles.drawerSection}> */}

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View
              style={{
                height: 30,
                marginTop: 9,
                backgroundColor: 'black',
                width: 4,
              }}
            />
            <DrawerItem
              labelStyle={{
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                color: 'black',
              }}
              activeTintColor="black"
              icon={({color, size}) => (
                <Image
                  style={{width: size, height: size, resizeMode: 'contain'}}
                  source={require('../../assets/aftjlogo.png')}
                />
              )}
              label="AFTJ Church"
              onPress={() => {
                // goToProfile({id:10});
                props.navigation.navigate('HomeStack');
              }}
            />
          </View>
          <DrawerItem
            labelStyle={{
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              color: 'black',
            }}
            icon={({color, size}) => (
              <Icon name="ios-search-outline" color={'black'} size={size} />
            )}
            label="Search"
            onPress={() => {
              goSearch();
            }}
          />

          <DrawerItem
            labelStyle={{
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              color: 'black',
            }}
            icon={({color, size}) => (
              <Icon name="ios-download-outline" color={'black'} size={size} />
            )}
            label="Download"
            onPress={() => {
              goToDownloads();
            }}
          />
          {/* </Drawer.Section> */}
          {props.user ? (
            <View>
              <DrawerItem
                labelStyle={{
                  fontFamily: 'Nunito-Regular',
                  fontSize: 14,
                  color: 'black',
                }}
                icon={({color, size}) => (
                  <Icon
                    name="ios-notifications-outline"
                    color={'black'}
                    size={size}
                  />
                )}
                label="Notifications"
                onPress={() => {
                  goToNotifications();
                }}
              />
              <DrawerItem
                labelStyle={{
                  fontFamily: 'Nunito-Regular',
                  fontSize: 14,
                  color: 'black',
                }}
                icon={({color, size}) => (
                  <Icon name="ios-call-outline" color={'black'} size={size} />
                )}
                label="Contacts"
                onPress={() => {
                  goToContacts();
                }}
              />
            </View>
          ) : null}
          {/* {props.currentUser ? ( */}
          <DrawerItem
            labelStyle={{
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              color: 'black',
            }}
            icon={({color, size}) => (
              <Icon name="ios-settings-outline" color={'black'} size={size} />
            )}
            label="Settings"
            onPress={() => {
              goToSettings();
            }}
          />
          {props.user ? (
            <DrawerItem
              labelStyle={{
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                color: 'black',
              }}
              icon={({color, size}) => (
                <Icon name="ios-exit-outline" color={'black'} size={size} />
              )}
              label="Log Out"
              onPress={() => {
                displayModal(true);
              }}
            />
          ) : null}

          <Dialog
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
                style={{marginTop: -60}}
                blurAmount={8}
                reducedTransparencyFallbackColor="white">
                <DialogFooter>
                  <DialogButton
                    text=""
                    bordered
                    textStyle={{color: 'white'}}
                    key="button-2"
                  />
                  <View style={styles.MbuttonContainer}>
                    <TouchableOpacity
                    >
                      <Button2
                        style={styles.Mbutton}
                        text="YES"
                        onPress={() => {
                          signout();
                          displayModal(false);
                        }}
                      />
                    </TouchableOpacity>
                    <Button
                      style={styles.Mbutton}
                      text="CANCEL"
                      onPress={() => {
                        displayModal(false);
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: -100,
                        lineHeight: 22,
                        fontSize: 12,
                        alignSelf: 'center',
                      }}>
                      Are you sure you want to Log Out?
                    </Text>
                  </View>
                </DialogFooter>
              </BlurView>
            }>
            
          </Dialog>
  
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  accessToken: state.user.accessToken,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  setAccessToken: token => dispatch(setAccessToken(token)),
  setLogoutUser: token => dispatch(setLogoutUser(token)),
  setRouteName: name => dispatch(setRouteName(name)),

  setUserToken: token => dispatch(setUserToken(token)),
  //setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    marginTop: 3,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  setmargin: {
    marginRight: 40,
  },
  drawerSection: {
    borderTopColor: '#191C52',
    marginTop: 5,
    borderTopWidth: 0.2,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#191C52',
    borderTopWidth: 0.2,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff5eb',
  },
  containerme: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 150,
    marginBottom: 10,
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 14,
    marginBottom: -100,
    color: '#fff',
    padding: 12,
    paddingBottom: -30,
    textAlign: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
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
});
