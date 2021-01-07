import React from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Quiz = () => {

    const {optionStyle, buttonStyle, buttonTextStyle, optionTextStyle} = styles;
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
                    {fontFamily:"Nunito",
                    fontWeight:'600',
                    fontSize:20,
                    marginTop:16,
                    lineHeight:22,
                    letterSpacing:0.5
            }}>Quiz Questions</Text>
                <Text  style={
                    {fontFamily:"Nunito",
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
                width: '90%',
                height: "63%",
                backgroundColor:'white',
                alignSelf:'center',
                alignItems:'center',
                justifyContent:'space-evenly',
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 24
            }}>

                    

               <View style={optionStyle}> 
                    <Text 
                    style={optionTextStyle}>A. By giving your life to Christ.</Text>
                    <View style={{borderRadius:100, width:25, alignItems:'center', borderWidth:1, height: 25, borderColor:'#fff'}}>
                        <Icon name='md-done-all' color='#00ff00' size={20} />
                    </View>
               </View>

               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>B. By giving your life to Christ.</Text>
               </View>

               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>C. By giving your life to Christ.</Text>
               </View>

               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>D. By giving your life to Christ.</Text>
               </View>

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
        width:'100%',
        padding: 10,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between'
        // marginBottom: 24
    },
    optionTextStyle:{
        fontSize:16,
        fontWeight: '300',
        fontFamily: 'Nunito',
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
    }
}

export default Quiz;