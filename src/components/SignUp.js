import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    GoogleSigninButton,
  } from '@react-native-community/google-signin';
import {connect} from 'react-redux';
import {
    setUserToken,
    setUser,
    setAccessToken,
  } from '../redux/user/user.actions';
import CustomInput from './common/CustomInput';
import Button  from './common/CustomButton';
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, Modal, Alert} from 'react-native';
import Spinner from './common/Spinner';
import Button2 from '../components/common/PopupButton2';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';



function SignUp({navigation, setUser, setUserToken, setAccessToken}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [hidenewpassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(true);
    const setPasswordVisibility = () => {
        setHidePassword(previousState => !previousState);
    };
    const closeIcon = '../assets/closebtn.png';

    const displayModal = (show) => {
        setShow(show)
      }

      
      async function onGoogleButtonPress() {
        // Get the users ID token
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();
    
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
        // Sign-in the user with the credential
        return auth()
          .signInWithCredential(googleCredential)
          .catch(error => alert('1.' + error));
      }
    
      async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
    
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
    
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
    
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }
    
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
    
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }
    
    function renderButton(loading, name, email, password, setError, setLoading){

        if(loading){
        
            return <Spinner/>;
        }
         return <Button
          onPress={() => onButtonPress(name, email, password, setError, setLoading)
        }  
            buttonStyle={{marginTop:30, width:'130%', alignSelf:'center'}}>Sign Up</Button>;
            
    }

    function onButtonPress(name, email, password, setError, setLoading){
    
        setLoading(true);
        setError('');
        if (name == '' || email == '' || password == '')
        {
            setError('All fields are required');
            setLoading(false);
        }
        else
        {
           // onRegistrationSuccess(setError, setLoading);
                // auth().createUserWithEmailAndPassword(email, password)
                // .then(() => {
                //     // normal signup

                // })
                // .catch((error) => 
                // {
                //     alert(error)
                //     setLoading(false);
                //     switch(error.code) {
                //         case 'auth/weak-password' :
                //             setError('Password should be at least six characters');
                //             break;
                //     }
                // });

        fetch('https://church.aftjdigital.com/api/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    })
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    console.log("Res:" + JSON.stringify(responseJson));
                    onRegistrationSuccess(setError, setLoading);
                })
                .catch((error) => {
                    
                    
                    alert(error)
                    setLoading(false);
                
                });
           
        }
    }
    
    function onRegistrationSuccess(setError, setLoading){
        navigation.navigate('EmailVerification', {email: email});
        setError('');
        setLoading(false);
    }
    
    useEffect(() => {

    });

    

    return(

        <ScrollView>
        <View style={styles.signUp}>
             <StatusBar
            
            backgroundColor="#fff" barStyle='light-content' />
            <Text style={{
                fontFamily:'Nunito-Bold',
                alignSelf:'flex-start',
                fontSize:20
            }}> Hey,</Text>
            <Text style={{
                marginTop:2,
                marginBottom:20,
                paddingLeft: 5,
                fontSize:14,
                fontFamily:'Nunito-Regular',
                alignSelf:'flex-start'
            }}>Sign up here to continue</Text>

    <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            onFacebookButtonPress()
              .then(() => {
                setUserToken(2);
                // alert('Signed in with Facebook!')
                // alert(auth().currentUser.photoURL+'1');
              })
              .catch(error => {
                switch (error.code) {
                  case 'auth/account-exists-with-different-credential':
                    setError('An account already exists with this email');
                    break;

                  case 'net::ERR_NAME_NOT_RESOLVED':
                    alert('Poor Internet Connection');
                    break;
                  default:
                    alert('1. ' + error);
                    break;
                }
              })
          }>
         <Image 
                style={{
                    width:30, height:30,
                    marginLeft:20,
                    marginRight:20,
                    marginTop:5, 
                    
                marginBottom:5}} source={require('../assets/fb-logo.png')}/>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#c8c8c8',
            height: '100%',
            width: 1,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress()
              .then(() => setUserToken(2))
              .catch(error => alert(error))
          }>
           <Image
                 style={{width:20, height:20,marginTop:8, 
                    marginLeft:20,
                    marginRight:20,
                    marginTop:5, marginBottom:5}} source={require('../assets/google-logo.png')}/>
        </TouchableOpacity>
      </View>

           <CustomInput onChangeText={ (value) => setName(value)} value={name} title='Full Name' otherStyles={ styles.input}/>
           <CustomInput onChangeText={ (value) =>  setEmail(value)}  value={email} title='Email Address' otherStyles={ styles.input}/>

           <View style={styles.textBoxContainer}>
                <CustomInput 
                    onChangeText={ (value) => setPassword(value)} 
                    value={password} 
                    secureTextEntry={hidenewpassword}
                    title='Password' 
                    otherStyles={ styles.input}
                />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setPasswordVisibility}>
              <Image source={(hidenewpassword) ? require('../assets/eyehide.png') : require('../assets/eyeopen.png')} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>

           
        {
            renderButton(loading, name, email, password, setError, setLoading)
        }

        <Text style={styles.error}>{error}</Text>
        <View style={{
            
            display:'flex',
            flexDirection:'row',
            alignSelf:'center'
        }}>
            <Text style={{fontFamily:'Nunito-Regular',}}>Already a User?  </Text> 
            <Text onPress={() => navigation.navigate('Login')} style={{
                color:'#000',
                fontFamily:'Nunito-Bold'
            }} >Log In</Text>
        </View>




            {/* <Modal
                animationType = {"slide"}
                transparent={true}
                visible={show}
                onRequestClose={() => {
                Alert.alert('Modal has now been closed.');
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            displayModal(!show);}}
                        >
                    <   View style={{
                            width: '80%', 
                            display: 'flex', 
                            borderRadius: 6,  
                            marginLeft: '10%', 
                            marginRight: '10%', 
                            marginTop: '60%',
                            overflow: "hidden",
                        }}>
                        
                        <BlurView
                            showBlur={false}
                            show={false}
                            blurType="dark"
                            blurAmount={6}
                            style={[
                                {  
                                    width: "100%", 
                                    backgroundColor: "#b7b7b799",
                                }
                            ]}
                            >
                                <TouchableOpacity
                                    style={{width: '100%', marginTop: 12}}
                                    onPress={() => {
                                        displayModal(!show);}}
                                    >
                                            <View
                                            style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            marginTop:20
                                            }}
                                        >
                                        <Image 
                                            onPress={() => {
                                                displayModal(!show);}}
                                            source = {require(closeIcon)} style={{height:15,width:15, marginRight: 17}} 
                                        />
                                        </View>
                                    </TouchableOpacity>
                            <Text style = { styles.text }>
                            You are almost there, just confirm your Email address via the Code sent to your Email address.</Text>
                            
                        </BlurView>
                    </View>
                
                    </TouchableOpacity>
            </Modal>
             */}
       
        </View>
        </ScrollView>

    )
};

const styles = {

    error:{
        color:'red',
        fontSize:18,
        marginTop:5,
        alignSelf:'center'
    },
    signUp:{
        display:'flex',
        flexDirection:'column',
        padding:20,
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    input:{
        marginTop:12,
        alignSelf:'flex-start',
        display:'flex',
        flexDirection:'column',
        marginLeft:20,
        marginRight:10,
        width:'90%'
    },
    card: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30,
        backgroundColor:'white',
        alignSelf:'center',
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: {width: 0, height:5},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        marginTop: 10
    },
    touachableButton: {
        position: 'absolute',
        right: 15,
        height: 40,
        width: 35,
        padding: 2
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
        justifyContent: 'center'
      },
    text: {
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        padding: 20,
        top: -5,
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: 'left',
      },
}
const mapDispatchToProps = dispatch => ({
    setUserToken: token => dispatch(setUserToken(token)),
    setAccessToken: token => dispatch(setAccessToken(token)),
    setUser: user => dispatch(setUser(user)),
  });
  
  export default connect(
    null,
    mapDispatchToProps,
  )(SignUp);
  