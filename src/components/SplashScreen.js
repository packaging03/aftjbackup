/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import SignUp from './SignUp';
import {View, Image, Text, ImageBackground, StatusBar} from 'react-native';
import {AuthContext} from './common/context';

// import '../assets'
// import './src/assets/'

function SplashScreen() {
  const {firstTime} = React.useContext(AuthContext);

  useEffect(() => {
     const timeoutHandle = setTimeout(firstTime(), 1000);
     return () => {
       clearTimeout(timeoutHandle);
     };
  });
  return (
    <View style={styles.splashScreen}>
      <StatusBar backgroundColor="transparent" translucent />
      
     
        <Image
          style={styles.logo}
          source={require('../assets/aftjlogo2.png')}
        />
        <Text style={styles.text}>AFTj Digital Church App</Text>
      </View>
    
  );
}

export default SplashScreen;

const styles = {
  splashScreen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    backgroundColor:'white'
  },
  
  logo: {
    width: 350,
    height: 350,
    alignSelf:'center',
  },
  text: {
    fontFamily:'Nunito-Bold',
    marginTop: '30%',
    color:'black',
    fontSize: 20,
    
  },
};

// #064d83
