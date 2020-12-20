import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';
import CustomInput from './common/CustomInput';
import Button from './common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Animated,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Spinner from './common/Spinner';
import Button2 from './common/PopupButton2';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {BlurView} from '@react-native-community/blur';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const EmailVerification = ({navigation, route}) => {
  const {email} = route.params;

  const [name, setName] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidenewpassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const setPasswordVisibility = () => {
    setHidePassword(previousState => !previousState);
  };

  const {Value, Text: AnimatedText} = Animated;
  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  const [enableMask, setEnableMask] = useState(true);
  const toggleMask = () => setEnableMask(f => !f);
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null; //•

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    
    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  const closeIcon = '../assets/closebtn.png';

  const CELL_SIZE = 70;
  const CELL_BORDER_RADIUS = 8;
  const DEFAULT_CELL_BG_COLOR = '#fff';
  const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
  const ACTIVE_CELL_BG_COLOR = '#f7fafe';

  const displayModal = show => {
    setShow(show);
  };

  const displaySuccess = success => {
    setSuccess(success)
  }

  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
  const animateCell = ({hasValue, index, isFocused}) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start();
  };

  function renderButton(loading, email, value, setError, setLoading) {
    if (loading) {
      return <Spinner />;
    }
    return (
      // <Button
      //   onPress={() => onButtonPress(email, value, setError, setLoading)}
      //   buttonStyle={{marginTop: 5, width: '130%', alignSelf: 'center', }}>
      //   Continue
      //   <View>
      //   <Icon
      //       name="arrow-forward-outline"
      //       size={25}
      //       color="#000"
      //       backgroundColor="#fff"
            
      //     />
      //   </View>
       
      // </Button>
      <TouchableOpacity
      onPress={() => 
        onButtonPress(email, value, setError, setLoading)
    }
      style={styles.button}>
      <Text style={styles.text}>Continue</Text>
      <Icon
        name="arrow-forward-outline"
        size={25}
        color="#000"
        backgroundColor="#fff"
        style={{marginTop: 5, marginLeft: -15}}
      />
    </TouchableOpacity>
    );
  }

  function onButtonPress(email, value, setError, setLoading) {
    setLoading(true);
    setError('');
    if (value == '' || email == '') {
      setError('All fields are required');
      setLoading(false);
    } else {
      // auth().createUserWithEmailAndPassword(email, password)
      // .then(() => {

      fetch('https://church.aftjdigital.com/api/register/verification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //name: name,
          email: email,
          verified_otp: value,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          //alert('seen here')
          console.log('Res:' + JSON.stringify(responseJson));
          
          let response = JSON.stringify(responseJson);
          if (JSON.stringify(responseJson.message) !== '"Your Account has been successfully created and verified"' )
          { 
            alert(JSON.stringify(responseJson.message))
            setError('');
            setLoading(false);
            
          } else {
            onRegistrationSuccess(setError, setLoading);
          }
        })
        .catch(error => {
          alert(error);
          setLoading(false);
        });

      // })
      // .catch((error) =>
      // {
      //     alert(error)
      //     setLoading(false);
      //     switch(error.code){
      //         case 'auth/weak-password' :
      //             setError('Password should be at least six characters');
      //             break;
      //     }
      // });
    }
  }

  function onRegistrationSuccess(setError, setLoading) {
    
    displaySuccess(true);
    navigation.navigate('Login');
    setError('');
    setLoading(false);
  }

  useEffect(() => {
    //displayModal(true)
  });

  return (
    <ScrollView>
      <View style={styles.signUp}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" />

        <View style={styles.text}>
          <Text />
        </View>
        <Text style={{fontFamily: 'Nunito-Regular', marginTop: '10%',}}>
          Enter the verification code sent to your{' '}
        </Text>
        <Text style={{fontFamily: 'Nunito-Regular', marginBottom:30}}>Email Address.</Text>

        <CodeField
          ref={ref}
          {...props}
          style={{marginBottom:70}}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />

        {renderButton(loading, email, value, setError, setLoading)}

        <Text style={styles.error}>{error}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text style={{fontFamily: 'Nunito-Regular'}}>
            Didn't see the code?{' '}
          </Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#000',
              fontFamily: 'Nunito-Bold',
            }}>
            RESEND
          </Text>
        </View>


        <Dialog
            width={0.9}
            visible={show}
            rounded
            actionsBordered
            dialogStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', height: '21%'}}
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
                    displayModal(!show)
                  }}
                  textStyle={{color:"white"}}
                  key="button-2"/>
                            <View style={styles.MbuttonContainer}>
                                          <TouchableOpacity
                                            onPress={() => {
                                              displayModal(!show)
                                            }}>
                                        </TouchableOpacity>
                                       
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
                                      displayModal(!show)
                                    }><Image source = {require(closeIcon)}  style={{height:17,width:17}} />
                                    </TouchableOpacity>
                                    </View>
      
                                <Text style={{color:"white", marginTop:-150, marginLeft:30, lineHeight: 22, fontSize: 14, marginRight: 28,}}>
                                      You are almost there, just confirm your Email address via the
                                      Code sent to your Email address.
                                </Text>
                            </View>
              </DialogFooter>
              </BlurView>
            }>
            
          </Dialog>
  


          <Dialog
            // onDismiss={() => {
            //   dop
            // }}
            width={0.9}
            visible={success}
            rounded
            actionsBordered
            dialogStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
            footer={
              <BlurView
                showBlur={false}
                blurType="light"
                show={success}
                style={{marginTop: -60}}
                blurAmount={8}
                reducedTransparencyFallbackColor="white"
              > 
              <DialogFooter>
                <DialogButton
                  text=""
                  bordered
                  // onPress={() => {
                  //   dop
                  // }}
                  textStyle={{color:"white"}}
                  key="button-2"/>
                            <View style={styles.MbuttonContainer}>
                                          <TouchableOpacity
                                          onPress={() =>
                                            displaySuccess(!success)
                                          }
                                            >

                                      <TouchableOpacity
                                      style={{
                                        flexDirection: "row",
                                        marginRight: -140,
                                        justifyContent: 'flex-end',
                                        marginTop:2,
                                        marginLeft: 6, marginTop: -65, alignSelf: 'flex-end'
                                      }}
                                    onPress={() =>
                                      displaySuccess(!success)
                                    }>
                                      
                                      
                                      <Image source = {require(closeIcon)}  style={{height:17,width:17}} />

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      style={{
                                        flexDirection: "row",
                                        marginRight: 1,
                                        justifyContent: 'flex-end',
                                        marginTop:2,
                                        marginLeft: 1, marginTop: 40,
                                      }}>

                                              <Button2
                                                style={styles.Mbutton}
                                                text="   Continue   "
                                                onPress={() => {
                                                  //signOut();
                                                  displaySuccess(!success)
                                                }}
                                              /></TouchableOpacity>
                                        </TouchableOpacity>
                                        
                            </View>
                                        
                            <View>
                          
                                <Text style={{color:"white", marginTop:-100, lineHeight: 22, fontSize: 16, alignSelf: 'center'}}>
                                    Verification successful
                                </Text>
                            </View>
              </DialogFooter>
              </BlurView>
            }>
            
          </Dialog>
  
             
       
      


          
      
      </View>
    </ScrollView>
  );
};

const styles = {
  error: {
    color: 'red',
    fontSize: 18,
    marginTop: 5,
    alignSelf: 'center',
  },
  signUp: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    marginTop: 12,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    width: '90%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    marginTop: 10,
  },
  centertext: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  touachableButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    width: 35,
    padding: 2,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
  },
  textBoxContainer: {
    marginBottom: 0,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#000',
    padding: 20,
    top: -7,
    paddingBottom: 5,
    justifyContent: 'center',
    marginLeft: -12,
    alignItems: 'center',
  },
  // text: {
  //   color: '#000',
  //   fontFamily: 'Nunito-Bold',
  //   fontSize: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5cad2',
    width: '75%',
    marginTop: '10%',
    height: 40,
    borderRadius: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'row',
    marginLeft: '15%',
    marginRight: '15%',
  },
  text2: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},

  focusCell: {
    borderColor: '#C4C4C4',
  },
  codeFieldRoot: {
    height: 70,
    marginTop: 70,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: 45,
    width: 45,
    lineHeight: 50 - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 35,
    textAlign: 'center',
    borderRadius: 8,
    color: '#C4C4C4',
    borderWidth: 0.8,
    backgroundColor: '#fff',
    borderColor: '#C4C4C4',
    textAlign: 'center',
    //background: #C4C4C4,

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 10,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  }
  ,
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

export default EmailVerification;
