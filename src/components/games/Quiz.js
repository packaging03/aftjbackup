import React, { useState } from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Quiz = () => {

    const {optionStyle, buttonStyle, buttonTextStyle, optionTextStyle, whiteCircle} = styles;
    const [optionA, setOptionA] = useState(false);
    const [optionB, setOptionB] = useState(false);
    const [optionC, setOptionC] = useState(false);
    const [optionD, setOptionD] = useState(false);

    return (
        <View style={{backgroundColor: '#F2F2F8', flex: 1}}> 
            
            <Image
                style={{
                    width:'100%',
                    height:"39%"
                }}
                source={require('../../assets/light-blue.png')} />

            <Image
                style={{
                    width:'100%',
                    height:"36%",
                    position:'absolute'
                }}
                source={require('../../assets/dark-blue.png')} />

            <View style={{
                top:40,
                borderRadius:14,
                position: 'absolute',
                width: '90%',
                height: 140,
                backgroundColor:'white',
                alignSelf:'center',
                alignItems:'center'
            }}>

                <Text style={
                    {fontFamily:"Nunito-Bold",
                    fontWeight:'600',
                    fontSize:20,
                    marginTop:16,
                    lineHeight:22,
                    letterSpacing:0.5
            }}>Quiz Questions</Text>
                <Text  style={
                    {fontFamily:"Nunito-SemiBold",
                    fontSize:18,
                    marginTop:40,
                    fontWeight: '400',
                    lineHeight:18,
                    letterSpacing:0.5
            }}>How is man saved?</Text>
                
            </View>


            <View style={{
                
                bottom:40,
                borderRadius:14,
                position: 'absolute',
                display:'flex',
                alignItems:'center',
                width: '90%',
                height: "63%",
                alignSelf:'center',
                backgroundColor:'white',
                justifyContent:'space-evenly',
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 24
            }}>

            
                <TouchableWithoutFeedback   onPress={() => setOptionA(!optionA)}>
                    <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>A. By giving your life to Christ.</Text>
                         {
                            optionA
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            :  <View style={whiteCircle}>
                                {/* <Icon  name={'md-close'} color='#FF0100' size={20} /> */}
                            </View>
                        }
                </View>
                </TouchableWithoutFeedback>

               <TouchableWithoutFeedback   onPress={() => setOptionB(!optionB)}>
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>B. By giving your life to Christ.</Text>
                          {
                            optionB
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon  name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                            :  <View style={whiteCircle}>
                                {/* <Icon  name={'md-close'} color='#FF0100' size={20} /> */}
                            </View>
                        }
                </View>
               </TouchableWithoutFeedback>

               <TouchableWithoutFeedback   onPress={() => setOptionC(!optionC)}>
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>C. By giving your life to Christ.</Text>
                         {
                            optionC
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            :  <View style={whiteCircle}>
                                {/* <Icon  name={'md-close'} color='#FF0100' size={20} /> */}
                            </View>
                        }
                </View>
               </TouchableWithoutFeedback>

               <TouchableWithoutFeedback  onPress={() => setOptionD(!optionD)}>
               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>D. By giving your life to Christ.</Text>
                        {
                            optionD
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            :  <View style={whiteCircle}>
                                {/* <Icon  name={'md-close'} color='#FF0100' size={20} /> */}
                            </View>
                        }
               </View>
               </TouchableWithoutFeedback >

                <View style={{display: 'flex', marginTop:32, width: '100%', justifyContent:'space-between', flexDirection:'row'}}>
                    <View style={buttonStyle}>
                        <Text style={buttonTextStyle}>Previous Question</Text>
                    </View>

                    <View style={buttonStyle}>
                    <Text style={buttonTextStyle}>Next Question</Text>
                </View> 
                </View>
               
            
                
            </View>
                
        </View>
    )
}

const styles = {

    optionStyle: { 
        backgroundColor:'#E0E8F3',
        borderRadius: 16,
        width:'92%',
        padding: 10,
        display:'flex',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent: 'space-between'
        // marginBottom: 24
    },
    optionTextStyle:{
        fontSize:16,
        fontWeight: '300',
        fontFamily: 'Nunito-SemiBold',
        letterSpacing: 0.5
    },
    buttonStyle: {
        backgroundColor:'#C5CAD2',
        borderRadius: 16,
        height:48, 
        width:'45%',
        alignItems:'center',
        justifyContent:'center',
        padding:15
    },
    buttonTextStyle: {
        lineHeight:18,
        letterSpacing: 0.5,
        fontFamily: "Nunito",
        fontWeight:'700',
        fontSize: 14
    }, 
    whiteCircle: {
        borderRadius:100, 
        width:25, 
        alignItems:'center', 
        borderWidth:1, 
        height: 25, 
        borderColor:'#fff'}
}

export default Quiz;