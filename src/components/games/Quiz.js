import Toast from 'react-native-simple-toast';
import React, { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Quiz = () => {

    const {optionStyle, buttonStyle, buttonTextStyle, optionTextStyle, whiteCircle} = styles;
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [optionA, setOptionA] = useState(false);
    const [optionB, setOptionB] = useState(false);
    const [optionC, setOptionC] = useState(false);
    const [optionD, setOptionD] = useState(false);


    const resetOptions = () => {
        setOptionA(false);
        setOptionB(false);
        setOptionC(false);
        setOptionD(false);

    }
    const getData = async () => {
        try {
          let response = await fetch('https://church.aftjdigital.com/api/quiz/retrieve');
          let json = await response.json();
          console.log(json.data);
          setData(json.data);
        } catch (error) {
          console.error(error);
        }
      };

      const next = () => {
          if(current === data.length-1){
                Toast.show("Last question", Toast.LONG);
          }else{
            setCurrent(current + 1);
            resetOptions();
          }
        
      }
      const prev = () => {
        if(current === 0){
            Toast.show("First question", Toast.LONG);
        }else{
            setCurrent(current - 1);
            resetOptions();
        }
      }

      useEffect(() => {
        getData();
      }, []);

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
            }}>{data.length > 0 ? data[current].question: 'loading'}</Text>
                
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

            
                
                    <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>A.  {data.length > 0 ? data[current].option1: 'loading'}</Text>
                         {
                            optionA
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon onPress={() => setOptionA(!optionA)}  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            : <TouchableWithoutFeedback   onPress={() => setOptionA(!optionA)}>
                                <View style={whiteCircle}/>
                            </TouchableWithoutFeedback> 
                        }
                </View>
               
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>B. {data.length > 0 ? data[current].option2: 'loading'}</Text>
                          {
                            optionB
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon onPress={() => setOptionB(!optionB)} name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                            :  <TouchableWithoutFeedback   onPress={() => setOptionB(!optionB)}>
                                    <View style={whiteCircle}/>
                                </TouchableWithoutFeedback>
                        }
                </View>

               
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>C. {data.length > 0 ? data[current].option3: 'loading'}</Text>
                         {
                            optionC
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  onPress={() => setOptionC(!optionC)} name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            :   <TouchableWithoutFeedback   onPress={() => setOptionC(!optionC)}>
                                    <View style={whiteCircle}/>
                              </TouchableWithoutFeedback>
                             
                           
                        }
                </View>
              

               {/* <TouchableWithoutFeedback  onPress={() => setOptionD(!optionD)}> */}
               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>D. {data.length > 0 ? data[current].option4: 'loading'}</Text>
                        {
                            optionD
                            ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  onPress={() => setOptionD(!optionD)} name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            :  <TouchableWithoutFeedback  onPress={() => setOptionD(!optionD)}>
                                     <View  style={whiteCircle}/>
                                </TouchableWithoutFeedback>
                                   
                               
                        }
               </View>
               {/* </TouchableWithoutFeedback > */}

                <View style={{  display: 'flex', marginTop:32, width: '100%', justifyContent:'space-between', flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => prev()}  style={{width:'100%'}}>
                           
                        <View style={buttonStyle}>
                           <Text style={buttonTextStyle}>Previous Question</Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => next()} style={{width: '100%'}} >
                        <View style={buttonStyle}>
                            <Text style={buttonTextStyle}>Next Question</Text>
                        </View> 
                    </TouchableOpacity>
                    
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
        width:'100%',
        display:'flex',
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