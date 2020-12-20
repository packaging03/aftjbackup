import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import { DarkTheme } from 'react-native-paper'

export default function AboutApp() {
    return (

        <View style = {styles.main}>
            <View style = {styles.container}>
                <Text style = {styles.textVersion}>Version</Text>
                <Text style = {styles.text}>1.0</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.text}>Terms of Use</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.text}>Privacy Policy</Text>
            </View>

        </View>
    )
        
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '9%',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
    },

    main: {
        flex: 1,
        backgroundColor: '#fff'
    },

    text:{      
        fontSize:14,
        fontFamily:'Nunito',
        fontWeight: '900'
    },

})
