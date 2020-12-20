/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Modal,
  Switch,
  TouchableHighlight,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
// import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  setUserToken,
  setCurrentUser,
  setAccessToken,
  setUser,
} from '../redux/user/user.actions';
import CustomInput from '../components/common/CustomInput';
import {add} from 'react-native-track-player';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ImgToBase64 from 'react-native-image-base64';

const Profile = ({
  currentUser,
  user,
  navigation,
  accessToken,
  setCurrentUser,
  setUser,
  setUserToken,
  setAccessToken,
}) => {
  const [photoUri, setPhotoUri] = useState('');
  const [imageType, setImageType] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  // Privacy settings
  const [toggleAllInformation, setAllInformation] = useState();
  const [toggleContacts, setContacts] = useState();
  const [toggleEmail, setEmmail] = useState();
  const [toggleHomeAddress, setHomeAddress] = useState();

  const PrivacySettings = ()=>{

    fetch('https://church.aftjdigital.com/api/privacy/'+ JSON.parse(user).id, {
                        method: 'PUT',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      },
                        
                      })
                      .then((response) => response.json())
                      .then((responseJson) =>{
                        
                        if(responseJson.phone_status=='1'){
                            setContacts(true);
                        }else{
                          setContacts(false);
                        }

                        if(responseJson.email_status=='1'){
                            setEmmail(true);
                        }else{
                          setEmail(false);
                        }

                        if(responseJson.home_status=='1'){
                            setHomeAddress(true);
                        }else{
                            setHomeAddress(false);
                        }

                        if(responseJson.phone_status=='1' && responseJson.email_status=='1' && responseJson.home_status=='1' ){
                            setAllInformation(true);
                        }else if (responseJson.phone_status=='0' && responseJson.email_status=='0' && responseJson.home_status=='0' ){
                          setAllInformation(false);
                        }else{
                          setAllInformation(true);
                        }
                        console.log(toggleAllInformation)
                      })
                      .catch((error) => {
                        alert(error)});
  }

  useEffect(() => {

    // fetch privacy data
    PrivacySettings();

    if (JSON.parse(user).image) {
      fetch('https://church.aftjdigital.com/api/profile_image/user/'+JSON.parse(user).id, {
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
    } else {
      setPhotoUri(
        'https://w7.pngwing.com/pngs/650/102/png-transparent-smiley-emoticon-desktop-kiss-smiley-miscellaneous-computer-icons-smile.png',
      );
    }
  }, []);
  //   const options = {
  //     title: 'Select Avatar',
  //     customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   }

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState('displayName');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newcPassword, setCNewPassword] = useState('');

  const [phone, setPhone] = useState(JSON.parse(user).address);
  const [address, setAddress] = useState(JSON.parse(user).address);

  const ImageSave = (item)=>{
      
    const imageFile = 'data:'+item.type+';base64,'+item.imageData;
    console.log(imageFile)

    fetch('https://church.aftjdigital.com/api/imageupload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          image: imageFile,
        }),
        })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson)
          Toast.show('Profile image updated successfully!', Toast.LONG);
        })
        .catch(error => {
          alert(error);
        });
  }

  const openGallery = () => {
    setModalVisible(!modalVisible);
    let options = {
      quality: 0.1,
      maxWidth: 400,
      maxHeigth: 400,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {imageData: response.data, type: response.type, uri: response.uri};
        setUploadedImage(source.imageData);
        setImageType(source.type);

        ImageSave(source)

      }
    });
  };

  const openCamera = () => {
    setModalVisible(!modalVisible);

    let options = {
      quality: 0.1,
      maxWidth: 400,
      maxHeigth: 400,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {imageData: response.data, type: response.type, uri: response.uri};
        setUploadedImage(source.imageData);
        setImageType(source.type);

        ImageSave(source)
      }
    });
  };
  const setData = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      alert(e);
    }
  };

  function update() {
    // setCurrentUser(auth().currentUser);
    setPassword('');
    setNewPassword('');
    setCNewPassword('');
    setEmail('');
    alert('Successful');
  }

  const renderModalView = itemToEdit => {
    if (itemToEdit == 'displayName') {
      return (
        <View style={styles.modalView}>
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#000'}
            style={{position: 'absolute', top: 25, right: 25}}
            size={20}
          />

          <Icons name="ios-person" size={55} color="gray" />
          <Text style={styles.modalText}>EDIT FULL NAME</Text>
          <CustomInput
            onChangeText={value => setName(value)}
            value={name}
            title="Full Name"
            otherStyles={styles.input}
          />

          <TouchableHighlight
            style={{...styles.openButton}}
            onPress={() => {
              if (name != '') {
                // auth().currentUser.updateProfile({
                //   displayName: name,
                // });
                // setCurrentUser(auth().currentUser);
                setModalVisible(!modalVisible);
                setName('');
                update();
              } else {
                alert('Please enter a valid name');
              }
            }}>
            <Text style={styles.textStyle}>SAVE</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (itemToEdit === 'email') {
      return (
        <View style={styles.modalView}>
          <Icons name="ios-mail-open-outline" size={55} color="gray" />
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#000'}
            style={{position: 'absolute', top: 25, right: 25}}
            size={20}
          />

          <Text style={styles.modalText}>Change Email Address</Text>
          <CustomInput
            onChangeText={value => setPassword(value)}
            value={password}
            secureTextEntry
            title="Password"
            otherStyles={styles.input}
          />

          <CustomInput
            onChangeText={value => setEmail(value)}
            value={email}
            title="Email Address"
            otherStyles={styles.input}
          />

          <TouchableHighlight
            style={{...styles.openButton}}
            onPress={() => {
              if (password != '' || email != '') {
                // const emailCred = auth.EmailAuthProvider.credential(
                //   auth().currentUser.email,
                //   password,
                // );
                // auth()
                //   .currentUser.reauthenticateWithCredential(emailCred)
                //   .then(() => {
                //     // User successfully reauthenticated.

                //     return auth()
                //       .currentUser.updateEmail(email)
                //       .then(() => {
                //         update();
                //       })
                //       .catch(error => {
                //         switch (error.code) {
                //           case 'auth/wrong-password':
                //             return alert('Your Password is incorrect');

                //           case 'auth/invalid-email':
                //             return alert('Email is invalid');
                //         }
                //         //                 alert("1. "+error);
                //         setPassword('');
                //         setEmail('');
                //       });
                //   })
                //   .then(() => {})
                //   .catch(error => {
                //     switch (error.code) {
                //       case 'auth/wrong-password':
                //         return alert('Your Password is incorrect');
                //     }
                //     //    alert(error);
                //     setPassword('');
                //     setEmail('');
                //   });
                setModalVisible(!modalVisible);
              } else {
                alert('All fields are required');
              }
            }}>
            <Text style={styles.textStyle}>SAVE</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (itemToEdit === 'password') {
      return (
        <View style={styles.modalView}>
          {/* <Icon  style={styles.icon} name="lock" color={'#000'} size={55} /> */}
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#000'}
            style={{position: 'absolute', top: 25, right: 25}}
            size={20}
          />

          <Text style={styles.modalText}>Change Your Password</Text>
          <CustomInput
            onChangeText={value => setPassword(value)}
            value={password}
            secureTextEntry
            title="Enter current password"
            otherStyles={styles.input}
          />
          <CustomInput
            onChangeText={value => setNewPassword(value)}
            value={newPassword}
            secureTextEntry
            title="Enter new password"
            otherStyles={styles.input}
          />
          <CustomInput
            onChangeText={value => setCNewPassword(value)}
            value={newcPassword}
            secureTextEntry
            title="Confirm new password"
            otherStyles={styles.input}
          />

          <TouchableHighlight
            style={{...styles.openButton}}
            onPress={() => {
              if (password != '' || newPassword != '') {
                // const emailCred = auth.EmailAuthProvider.credential(
                //   auth().currentUser.email,
                //   password,
                // );
                // auth()
                //   .currentUser.reauthenticateWithCredential(emailCred)
                //   .then(() => {
                //     // User successfully reauthenticated.

                //     return auth()
                //       .currentUser.updatePassword(newPassword)
                //       .then(() => {
                //         // normal code
                       
                //       })
                //       .catch(error => {
                //         switch (error.code) {
                //           case 'auth/wrong-password':
                //             return alert('Your Password is incorrect');

                //           case 'auth/weak-password':
                //             return alert(
                //               'Your Password should be at least 6 characters',
                //             );
                //         }

                        
                //         // alert("1. "+error);
                //       });
                //   })

                    fetch(
                      'https://church.aftjdigital.com/api/userpassword/' +
                        JSON.parse(user).id,
                      {
                        method: 'PUT',
                        headers: {
                          Accept: 'application/json',
                          // 'Authorization': `bearer ${accessToken}`,
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          email: JSON.parse(user).email,
                          password: newPassword,
                          token: accessToken,
                        }),
                      },
                    ).then(() => {
                      setPassword('');
                        setNewPassword('');
                        setCNewPassword('');
                        setModalVisible(!modalVisible);
                        Toast.show('Your new password has been changed', Toast.LONG);
                    }).catch((error) => {
                      
                    })
                } else {
                  alert('All fields are required');
                }
              }}>
            <Text style={styles.textStyle}>CHANGE</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (itemToEdit === 'phone') {
      return (
        <View style={styles.modalView}>
          {/* <Icons name="ios-person" size={55} color="gray" /> */}

          <Icon style={styles.icon} name="phone" color={'#000'} size={25} />
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#000'}
            style={{position: 'absolute', top: 25, right: 25}}
            size={20}
          />

          <Text style={styles.modalText}>Change Phone Number</Text>
          <CustomInput
            onChangeText={value => setPhone(value)}
            value={phone}
            title="Your phone number"
            otherStyles={styles.input}
          />

          <TouchableHighlight
            style={{...styles.openButton}}
            onPress={() => {
              if (phone != '') {
                fetch(
                  'https://church.aftjdigital.com/api/users/' +
                    JSON.parse(user).id,
                  {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      // 'Authorization': `bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      phone: phone,
                      token: accessToken,
                    }),
                  },
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log('Res:' + JSON.stringify(responseJson));
                    setUser(JSON.stringify(responseJson));
                    console.log('final:' + user);
                    setModalVisible(!modalVisible);
                    Toast.show('Done', Toast.SHORT);
                  })
                  .catch(error => {
                    console.log('user:' + user);

                    alert(error);
                  });
              } else {
                alert('Please enter phone number');
              }
            }}>
            <Text style={styles.textStyle}>SAVE</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (itemToEdit === 'address') {
      return (
        <View style={styles.modalView}>
          <Icon
            name="close"
            onPress={() => setModalVisible(!modalVisible)}
            color={'#000'}
            style={{position: 'absolute', top: 25, right: 25}}
            size={20}
          />

          <Text style={styles.modalText}>Change Address</Text>
          <CustomInput
            onChangeText={value => setAddress(value)}
            value={address}
            title="Your address"
            otherStyles={styles.input}
          />

          <TouchableHighlight
            style={{...styles.openButton}}
            onPress={() => {
              if (address != '') {
              } else {
                alert('Please enter address');
              }
            }}>
            <Text style={styles.textStyle}>SAVE</Text>
          </TouchableHighlight>
        </View>
      );
    } else if (itemToEdit === 'photos') {
      return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <Icon
                name="close"
                onPress={() => setModalVisible(!modalVisible)}
                color={'#000'}
                style={{position: 'absolute', top: 15, right: 15}}
                size={28}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginTop: -10,
                  color: '#000',
                  marginBottom: 20,
                  fontFamily: 'Nunito-Bold',
                }}>
                Profile photo
              </Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent:'space-between',
                  flexDirection: 'row',
                  width:'40%',
                }}>
                <View style={{alignItems: 'center', marginRight: 20}}>
                  <View style={styles.circleImg}>
                    <TouchableOpacity>
                      <Icons
                        name="camera"
                        color={'#000'}
                        size={25}
                        onPress={() => openCamera()}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: 'Nunito-Light',
                    }}>
                    Camera
                  </Text>
                </View>

                <View>
                  <View style={styles.circleImg}>
                    <TouchableOpacity>
                      <Icons
                        name="image"
                        color={'#000'}
                        size={25}
                        onPress={() => openGallery()}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: 'Nunito-Light',
                    }}>
                    Gallery
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" />
        <Modal anim ationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>{renderModalView(itemToEdit)}</View>
        </Modal>

        <ImageBackground
          style={styles.imgBg}
          source={require('../assets/profile1.jpg')}>
          <View
            style={{
              width: '100%',
              height: 170,
              backgroundColor: '#000',
              position: 'absolute',
              
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.7,
            }}
          />
          <View>
            <Avatar.Image
              style={{
                alignSelf: 'center',
              }}
              source={{
                uri: uploadedImage?'data:'+imageType+';base64,'+uploadedImage : photoUri
              }}
              size={90}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                width: 30,
                height: 30,
                bottom: -1,
                right: -1,
                borderRadius: 40,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setItemToEdit('photos');
                  setModalVisible(!modalVisible);
                }}>
                <Icons name="camera" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
          </View>

          {user ? (
            <Text style={styles.displayName}>{JSON.parse(user).name}</Text>
          ) : null}
        </ImageBackground>

        {toggleAllInformation?<View style={{width: '100%', height:'78%'}}>
        <Text style={{padding: 15, fontFamily: 'Nunito-Bold', fontSize: 14}}>
          ACCOUNT
        </Text>
        
        <View style={styles.line} />
        <View style={styles.accountDetail}>
          <Icon style={styles.icon} name="person" color={'#000'} size={25} />

          {user ? (
            <Text style={styles.text}>{JSON.parse(user).name}</Text>
          ) : <Text style={styles.text}>Full Name</Text>}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditFullname");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {toggleEmail?<View style={styles.accountDetail}>
        <Image source = {require('../assets/mailpics.png')} style={{height:23, width:23, marginRight: 20, tintColor: '#555555'}}/>
          {user ? (
            <Text style={styles.text}>{JSON.parse(user).email}</Text>
          ) : <Text style={styles.text}>Email</Text>}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditEmail");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View> : null}

        <View style={styles.line} />

        {toggleContacts?<View style={styles.accountDetail}>
          <Image source = {require('../assets/phone.png')} style={{height:23, width:23, marginRight: 20, tintColor: '#555555'}}/>

          {/* {currentUser ? (
            <Text style={styles.text}>
              {JSON.parse(user).phone || 'Phone'}{' '}
            </Text>
          ) : null} */}
            <Text style={styles.text}>
              Phone Number
            </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditPhone");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View> : null}

        <View style={styles.line} />

        <View style={styles.accountDetail}>
            
            <Image source = {require('../assets/calendar2.png')} style={{height:23, width:23, marginRight: 20, tintColor: '#555555'}}/>

            <Text style={styles.text}>
              Date of Birth
            </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditDateofBirth");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />


        <View style={styles.accountDetail}>
              <Entypo
                name="credit-card"
                color="#555555"
                size={20}
                style={{
                  // height: 23,
                  // width: 23,
                  marginRight: 20,
                }}
              />

              <Text style={styles.text}>Payments</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('paymentsFetch');
                }}
                style={{
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  width: '30%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                }}>
                <MaterialIcons name="keyboard-arrow-right" size={25} />
              </TouchableOpacity>
            </View>
            {/* ===================payments close================================ */}
            {/* ====================================activities open============================== */}
            <View style={styles.line} />

            <View style={styles.accountDetail}>
              <Feather
                name="activity"
                color="#555555"
                size={20}
                style={{
                  // height: 23,
                  // width: 23,
                  marginRight: 20,
                }}
              />

              <Text style={styles.text}>Activities</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('analitics');
                }}
                style={{
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  width: '30%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                }}>
                <MaterialIcons name="keyboard-arrow-right" size={25} />
              </TouchableOpacity>
            </View>

            {/* ============================================activities close============================= */}

            <View style={styles.line} />

            <View style={styles.accountDetail}>
              <FontAwesome5
                name="praying-hands"
                color="#555555"
                size={20}
                style={{
                  marginRight: 15,
                }}
              />

              <Text style={styles.text}>Prayer Request</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('fetchPrayerReq');
                }}
                style={{
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  width: '30%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                }}>
                <MaterialIcons name="keyboard-arrow-right" size={25} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.line} />


        <View style={styles.accountDetail}>
            
            <Image source = {require('../assets/employee.png')} style={{height:23, width:23, marginRight: 20, tintColor: '#555555'}}/>

            <Text style={styles.text}>
              Occupation
            </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditOccupation");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {toggleHomeAddress?<View style={styles.accountDetail}>
            
            <Image source = {require('../assets/department.png')} style={{height:23, width:23, marginRight: 20, tintColor: '#555555'}}/>

            <Text style={styles.text}>
              Department
            </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditDepartment");
            }}
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.button}>EDIT</Text>
          </TouchableOpacity>
        </View>: null}

        <View style={styles.line} />

        <View style={styles.accountDetail}>
          <Icon style={styles.icon} name="lock" color={'#000'} size={25} />
          <Text style={styles.text}>Change Password</Text>

          {/* <TouchableOpacity> */}
          <View
            //
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              alignSelf: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditPassword");
                //  setItemToEdit('password');
                //  setModalVisible(!modalVisible);
              }}>
              <Text style={styles.button}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          {/* </TouchableOpacity> */}
        </View>

        <View style={styles.line} />

        <View style={styles.accountDetail}>
          <Icon
            style={styles.icon}
            name="notifications"
            color={'#000'}
            size={25}
          />
          <Text style={styles.text}>Notifications</Text>

          <View
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              width: '30%',
              display: 'flex',
              justifyContent: 'flex-end',
              fontFamily: 'Nunito-Regular',
              fontSize: 14,
              alignSelf: 'flex-end',
            }}>
            <Text style={{color: '#000', fontSize: 14, textAlign: 'right'}}>
              ON/OFF
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.accountDetail}>
          <Icons
            style={{marginRight: 10, width: '10%'}}
            name="ios-exit"
            color={'#000'}
            size={25}
          />
          <TouchableOpacity
            onPress={() => {
              // auth()
              //   .signOut()
              //   .then(() => {
                  fetch('https://church.aftjdigital.com/api/logout', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      token: accessToken,
                    }),
                  })
                    .then(response => response.json())
                    .then(responseJson => {
                      setUserToken(2);
                      setData();
                      setAccessToken(null);
                      // setCurrentUser(null);
                    })
                    .catch(error => {
                      alert(error);
                    });



                // })
                // .catch(error => alert(error));
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                color: '#000',
                textAlign: 'right',
                width: '100%',
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} /> 
        </View>:<View style={{width:'100%', height:300,justifyContent:'center', alignItems: 'center'}}><Text>Private mode</Text></View>}
      </View>
    </ScrollView>
  );
};

const styles = {
  input: {
    marginTop: 8,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    color: '#000',
    textAlign: 'right',
    fontFamily: 'Nunito-Bold',

    fontSize: 14,

    // width:'100%'
  },
  text: {
    fontSize: 14,
    width: '50%',
    fontFamily: 'Nunito-ExtraLight',
  },
  icon: {
    marginRight: 10,
    opacity: 0.6,
    width: '10%',
  },
  accountDetail: {
    paddingLeft: 13,
    paddingTop: 13,
    paddingBottom: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  imgBg: {
    width: '100%',
    height: 170,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayName: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    marginTop: 10,
  },
  centeredView1: {
    // flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
    bottom: 0,
    // marginTop: 22
  },
  centeredView2: {
    //flex: 1,

    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    width: '100%',
    bottom: 0,
    // marginTop: 22
  },

  modalView1: {
    // margin: 20,
    height: '100%',
    width: '100%',
    // backgroundColor:"red",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 25,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: '50%',
    width: '80%',
    // backgroundColor:"red",
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
  image: {
    width: 50,
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 70,
    marginBottom: 8,
    alignSelf: 'center',
  },
  openButton: {
    width: '100%',
    backgroundColor: '#c5cad2',
    borderRadius: 5,
    padding: 10,
    marginTop: '10%',
    elevation: 2,
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
  },
  personIcon: {
    margin: 15,
  },
  circleImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    right: -1,
    borderRadius: 60,
    backgroundColor: '#C5CAD2',
  },
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  accessToken: state.user.accessToken,
  user: state.user.user,
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserToken: token => dispatch(setUserToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
