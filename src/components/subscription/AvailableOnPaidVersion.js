import React from 'react';
import {View, StatusBar, TouchableWithoutFeedback, Text, Image} from 'react-native';
import { Linking } from 'react-native'

const AvailableOnPaidVersion= () =>{

    return(
        <View style={{
            flex:1, 
            backgroundColor:'white',
            padding:20
            
        }}>
            <StatusBar backgroundColor={'transparent'} translucent/>
            <Image
            style={{
                alignSelf:'center',
                width:180,
                height:140,
                marginTop:50, 
                marginBottom:50

            }}
            source={require('../../assets/subscribe1.png')} />

            <Text style={{...styles.text, marginBottom:5}}>This Feature is only available on the</Text>
            <Text style={{...styles.text, marginBottom:24}}>paid version of this App</Text>

            <Text style={styles.text2}>Contact AFTj Digital on:</Text>
            <TouchableWithoutFeedback onPress={() => Linking.openURL('mailto:admin@aftjdigital.com?subject=Subscription to AFTj Digital Church App') }>
                <Text style={{...styles.text2}}>Email: admin@aftjdigital.com</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Linking.openURL(`tel:${'+1(470)426-9315'}`) }>
                <Text style={styles.text2}>Phone: +1(470)426-9315</Text>
            </TouchableWithoutFeedback>

            
            
        </View>
    )
}

const styles={

    text:{
        fontFamily:'Nunito',
        fontSize:14,
        textAlign:'center',
        lineHeight:24,
        letterSpacing:0.5,
        fontWeight:'400'
    },
    text2:{
        fontFamily:'Nunito',
        fontSize:14,
        textAlign:'center',
        lineHeight:24,
        letterSpacing:0.5,
        fontWeight:'600',
        marginBottom:5
    }
    
}

export default AvailableOnPaidVersion;