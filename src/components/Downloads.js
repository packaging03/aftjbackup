import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';


const Downloads = ({navigation}) => {
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
        <ScrollView>
      
      <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.container}>

            <Icon style={{alignSelf:'center', marginTop: '62%'}} name='download' size={40} color='#ccc'/>
            <Text style={{color:'#ccc', fontSize:18}}>No downloads</Text>


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
            </SCLAlert>
        </View>
</ScrollView>
    );
}

const styles = {

    container: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width: '100%'
    }
}

export default Downloads;