import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import {connect} from 'react-redux';
import { set } from 'react-native-reanimated';

const PrivacySettingsNew = ({user, accessToken})=> {

    const [toggleAllInformation, setAllInformation] = useState();
    const [toggleContacts, setContacts] = useState();
    const [toggleEmail, setEmail] = useState();
    const [toggleHomeAddress, setHomeAddress] = useState();

    useEffect(
        ()=> {
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
                        console.log('Res:' + JSON.stringify(responseJson));
                        
                        if(responseJson.phone_status=='1'){
                            setContacts(true);
                        }else{
                            
                        }

                        if(responseJson.email_status=='1'){
                            setEmail(true);
                        }else{
                            
                        }

                        if(responseJson.home_status=='1'){
                            setHomeAddress(true);
                        }else{
                            
                        }

                        if(responseJson.phone_status=='1' && responseJson.email_status=='1' && responseJson.home_status=='1' ){
                            setAllInformation(true);
                        }else{
                            
                        }
                      })
                      .catch((error) => {
                        alert(error)});
        }
    )

    const setPrivacyAllInformation = ()=> {

        if(toggleAllInformation){
            setAllInformation(false);
            setContacts(false);
            setEmail(false);
            setHomeAddress(false);
        }else{
            setAllInformation(true);
            setContacts(true);
            setEmail(true);
            setHomeAddress(true);
        }

        fetch('https://church.aftjdigital.com/api/privacy/'+ JSON.parse(user).id, {
                        method: 'PUT',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${accessToken}`
                      },

                      body: JSON.stringify({
                        phone_status: toggleContacts? '0' : '1',
                        email_status: toggleEmail? '0' : '1',
                        home_status: toggleHomeAddress? '0' : '1',
                        
                      }),
                        
                      })
                      .then((response) => response.json())
                      .then((responseJson) =>{
                        console.log('Res:' + JSON.stringify(responseJson));     
                      })
                      .catch((error) => {
                        alert(error)});
    }

    const setPrivacyPhone = ()=>{
        setContacts(previousState => !previousState);

        if(toggleAllInformation){
            alert('Please disable all information to access this feature')
        }else{
            fetch('https://church.aftjdigital.com/api/privacy/'+ JSON.parse(user).id, {
                            method: 'PUT',
                            headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },

                        body: JSON.stringify({
                            phone_status: toggleContacts? '0' : '1',
                            
                        }),
                            
                        })
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log('Res:' + JSON.stringify(responseJson));     
                        })
                        .catch((error) => {
                            alert(error)});
        }
    }

    const setPrivacyEmail = ()=>{
        setEmail(previousState => !previousState);
        
        if(toggleAllInformation){
            alert('Please disable all information to access this feature')
        }else{
            fetch('https://church.aftjdigital.com/api/privacy/'+ JSON.parse(user).id, {
                            method: 'PUT',
                            headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },

                        body: JSON.stringify({
                            email_status: toggleEmail? '0' : '1',
                            
                        }),
                            
                        })
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log('Res:' + JSON.stringify(responseJson));     
                        })
                        .catch((error) => {
                            alert(error)});
            }
    }

    const setPrivacyHome = ()=>{
        setHomeAddress(previousState => !previousState);

        if(toggleAllInformation){
            alert('Please disable all information to access this feature')
        }else{
            fetch('https://church.aftjdigital.com/api/privacy/'+ JSON.parse(user).id, {
                            method: 'PUT',
                            headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        },

                        body: JSON.stringify({
                            home_status: toggleHomeAddress? '0' : '1',
                            
                        }),
                            
                        })
                        .then((response) => response.json())
                        .then((responseJson) =>{
                            console.log('Res:' + JSON.stringify(responseJson));     
                        })
                        .catch((error) => {
                            alert(error)});
            }
    }

    return(
        <View style = {styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={styles.privacy}>
                <Text style={styles.text}>Contact Information Visibility </Text>
            </View>
            <View style={styles.privacy}>
                <Text style={styles.text}>All Information </Text>
                <ToggleSwitch
                    onColor = "#219653"
                    offColor = "#C4C4C4"
                    onToggle={setPrivacyAllInformation}
                    isOn={toggleAllInformation}
                />
            </View>
            <View style={styles.privacy}>
                <Text style={styles.text}>Phone Contact </Text>
                <ToggleSwitch
                    onColor = "#219653"
                    offColor = "#C4C4C4"
                    onToggle={setPrivacyPhone}
                    isOn={toggleContacts}
                />
            </View>
            <View style={styles.privacy}>
                <Text style={styles.text}>Email Address </Text>
                    <ToggleSwitch
                    onColor = "#219653"
                    offColor = "#C4C4C4"
                    onToggle={setPrivacyEmail}
                    isOn={toggleEmail}
                />
            </View>
            <View style={styles.privacy}>
                <Text style={styles.text}>Home Address </Text>
                    <ToggleSwitch
                    onColor = "#219653"
                    offColor = "#C4C4C4"
                    onToggle={setPrivacyHome}
                    isOn={toggleHomeAddress}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    privacy: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },

    text: {
        fontSize: 14,
        width: '65%',
        fontFamily: 'Nunito',
    },
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
export default connect(mapStateToProps)(PrivacySettingsNew);