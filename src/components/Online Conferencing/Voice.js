import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Voice = ()=>{
    return(
        <View style={styles.container}>
            <Text style={{marginTop:'40%', marginBottom:'20%', fontSize:20}}>Test your selected prefered voice</Text>
            <View style={{ flex:1, width: '100%'}}>
                <View style={styles.roundImageBorder}>
                    <View style={styles.roundsecond}>
                        <View style={styles.roundThird}>
                            <Image style= {{ width: 80, height: 80}} source={require('../../assets/speaker-big.png')} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    roundImageBorder:{
        width:220, 
        height:220, 
        backgroundColor:'#f7f7f7', 
        alignSelf:'center', 
        borderRadius: 220,
        justifyContent:'center',
        alignItems:'center'
    },

    roundsecond:{
        width:200,
        height:200,
        backgroundColor:'#fff',
        borderRadius:200,
        justifyContent:'center',
        alignItems:'center'
    },

    roundThird:{
        width:180,
        height:180,
        backgroundColor:'#c5cad3',
        borderRadius:180,
        overflow: 'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
})

export default Voice;