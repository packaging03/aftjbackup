import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {AuthContext} from '../components/common/context';
import * as RootNavigation from '../RootNavigation';
import Spinner from './common/Spinner';
import CustomInput from './common/CustomInput';
import Button from '../components/common/PopupButton';
import Button2 from '../components/common/PopupButton2';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
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
const renderSeparator = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginLeft: '1%',
      }}
    />
  );
};
const Item = ({title, onPress}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        display: 'flex',
        padding: 10,
        flexDirection: 'row',
      }}>
      <Image
        style={{
          width: '30%',
          height: 60,
          borderRadius: 6,
          shadowOpacity: 1,
          shadowRadius: 2,
          resizeMode: 'cover',
        }}
        source={require('../assets/sermons2.png')}
      />
      <Text
        style={{
          marginLeft: 10,
          color: '#000',
          fontSize: 16,
          width: '70%',
          fontWeight: 'normal',
          marginRight: 5,
          alignSelf: 'center',
          fontFamily: 'Nunito-Light',
          flexWrap: 'wrap',
          flex: 1,
        }}>
        {title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);
const closeIcon = '../assets/closebtn.png';
const Sermons = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [salert, setAlert] = useState(false);
  const [show, setShow] = useState(false);

  const [time, setTime] = useState({s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  var updatedMs = 0,
    updatedS = time.m,
    updatedM = time.m,
    updatedH = time.h;

  const run = async () => {
    setTimeout(run, 10);
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    const j = JSON.stringify({s: updatedS, m: updatedM, h: updatedH});
    // console.log(j);
    try {
      await AsyncStorage.setItem('getSermTime', j);
    } catch (e) {
      console.log(e);
    }

    return setTime({s: updatedS, m: updatedM, h: updatedH});
  };

  useEffect(() => {
    run();
    setInterv(setTimeout(run, 10));

    return () => {
      clearTimeout(interv);
    };
  }, []);

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

  const getSermons = async () => {
    try {
      let response = await fetch('https://church.aftjdigital.com/api/sermons');
      let json = await response.json();
      console.log(json.data);
      setData(json.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSermons();
    //function to show auth alert call
    showAlert();
  }, []);

  const {goToSermon} = React.useContext(AuthContext);
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      onPress={() =>
        navigation.navigate('SermonDetails', {
          sermonName: item.title,
          id: item.video,
          date: item.date,
          overview: item.overview,
          preacher: item.preacher,
          audio: item.audio,
          sermonId: String(item.id),
        })
      }
    />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <View style={{margin: 10}}>
        <ImageBackground
          style={{
            width: '100%',
            opacity: 1,
            height: 123,
            resizeMode: 'contain',
            borderRadius: 5,
            overflow: 'hidden',
          }}
          source={require('../assets/sermons1.png')}
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

        {isLoading ? (
          <Spinner  size="large" style={{marginTop: 50}} />
        ) : (
          <FlatList
            data={data}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  sermons: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: '46%',
    left: 40,
    bottom: '34%',
    right: 40,
  },
  absoluteHide: {
    position: 'absolute',
    top: '100%',
    left: 40,
    bottom: '34%',
    right: 40,
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

export default Sermons;
