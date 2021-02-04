import Toast from 'react-native-simple-toast';
import React, { useState, useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Dialog, {
    DialogFooter,
    DialogButton,
  } from 'react-native-popup-dialog';
  
import {BlurView} from '@react-native-community/blur';
import {GamesButton} from '../../components/common/PopupButton';
import DialogContent from 'react-native-popup-dialog/dist/components/DialogContent';
import { babelPluginFlowReactPropTypes_proptype_DialogButtonProps } from 'react-native-popup-dialog/dist/type';

var points = 0;
var title = ""; var score = ""; var btnText = "";
const Quiz = () => {

    const {optionStyle, buttonStyle, buttonTextStyle, optionTextStyle, whiteCircle} = styles;
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [optionA, setOptionA] = useState(null);
    const [optionB, setOptionB] = useState(null);
    const [optionC, setOptionC] = useState(null);
    const [optionD, setOptionD] = useState(null);
    const [disable, setDisable] = useState(false);
    const [show, setShow] = useState(false);

   
    const displayModal = show => {
        setShow(show);
      };

    const resetOptions = () => {
        setOptionA(null);
        setOptionB(null);
        setOptionC(null);
        setOptionD(null);
        setDisable(false);

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
                // Toast.show("Last question", Toast.LONG);
            displayModal(true);
            var scores;
            points <= 9 ? scores = "0"+points+"/"+data.length : scores = points+"/"+data.length

            score = scores;
            if(points === data.length){
                title = "Congratulations";
                btnText = "Play Again";
            }else {
                title = "Game Finished";
                btnText = "Try Again";
            }
            // Toast.show("Your total score is: "+score, Toast.LONG);
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
        <View style={{backgroundColor: '#F2F2F8' , flex: 1}}> 
               
           <Dialog
            visible={show}
            rounded
            actionsBordered
            
            dialogStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                position:'absolute', 
                height:'35%', 
                top:'20%', 
                paddingVertical:20,
                width:'80%',}}>

             <BlurView
                showBlur={false}
                blurType="light"
                show={show}
                // overlayColor={'rgba(255, 255, 255, 0.3)'}
                blurAmount={10}
                // blurRadius={25}
                reducedTransparencyFallbackColor="white"
                >
               <DialogContent style={{height:'100%', zIndex:100,}}>
                        
                    <View >
                    <View
                      style={{
                          display:'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems:'center',
                        alignSelf: 'center',
                        
                        marginRight: 20,
                        width: '100%',
                        height:'100%'

                      }}>
                          {
                              points === data.length ? <Text style={
                                {fontFamily:'Nunito-Bold', 
                                fontWeight:'700', 
                                fontSize:20, 
                                lineHeight:27, 
                                letterSpacing:0.5, 
                                color:'#219653'}}>{title}</Text> 
                                : <Text style={
                                    {fontFamily:'Nunito-Bold', 
                                    fontWeight:'700', 
                                    fontSize:20, 
                                    lineHeight:27, 
                                    letterSpacing:0.5, 
                                    color:'#fff'}}>{title}</Text> 
                          }
                        
                            {
                                points === data.length ? <Text style={
                                    {
                                        fontFamily:'Nunito-Bold', 
                                        fontWeight:'600', 
                                        fontSize:24, 
                                        lineHeight:27, 
                                        letterSpacing:0.5, 
                                        color:'#fb13c8'}}>{score}</Text>
                                   :    <Text style={
                                    {
                                        fontFamily:'Nunito-Bold', 
                                        fontWeight:'600', 
                                        fontSize:24, 
                                        lineHeight:27, 
                                        letterSpacing:0.5, 
                                        color:'#eb4132'}}>{score}</Text>
                            }
                            

                            <GamesButton
                     
                            text={btnText}
                            onPress={() => {
                            
                                displayModal(false);
                                points = 0;
                                setCurrent(0);
                                resetOptions();
                            }}
                        />
                    </View>

                    

                  </View>
              </DialogContent>
              </BlurView>
            </Dialog>
            
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
                top:30,
                borderRadius:14,
                position: 'absolute',
                width: '90%',
                height: '22%',
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
                
                bottom:30,
                borderRadius: 14,
                position: 'absolute',
                display:'flex',
                alignItems:'center',
                width: '90%',
                height: "60%",
                alignSelf:'center',
                backgroundColor:'white',
                justifyContent:'space-evenly',
                paddingLeft: 14,
                paddingRight: 14,
                paddingTop: 16
            }}>
                
                    <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>A.  {data.length > 0 ? data[current].option1: 'loading'}</Text>
                         {
                            optionA == null ? (<TouchableWithoutFeedback disabled={disable}
                                onPress={() => {
                                if (data[current].answer !== 'option1'){
                                    setOptionA(false);
                                }else if (data[current].answer === 'option1'){
                                    setOptionA(true);
                                    points = points+1;
                                    console.log("points: "+points);
                                    console.log("points: "+points);
                                }
                                setDisable(true);
                                }}>
                            <View style={whiteCircle}/>
                            </TouchableWithoutFeedback> )
                                :  optionA == false ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            : <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                            
                        }
                </View>
               
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>B. {data.length > 0 ? data[current].option2: 'loading'}</Text>
                          {
                            optionB == null ? (<TouchableWithoutFeedback   
                                disabled={disable}
                                onPress={() => {
                                if (data[current].answer !== 'option2'){
                                    setOptionB(false);
                                }else if (data[current].answer === 'option2'){
                                    setOptionB(true);
                                    points = points+1;
                                    console.log("points: "+points);
                                }
                                setDisable(true);
                                }}>
                            <View style={whiteCircle}/>
                            </TouchableWithoutFeedback> )
                                :  optionB == false ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            : <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                        }
                </View>

               
                <View style={optionStyle}> 
                        <Text 
                        style={optionTextStyle}>C. {data.length > 0 ? data[current].option3: 'loading'}</Text>
                         {
                            optionC == null ? (<TouchableWithoutFeedback  
                                disabled={disable} 
                                onPress={() => {
                                if (data[current].answer !== 'option3'){
                                    setOptionC(false);
                                }else if (data[current].answer === 'option3'){
                                    setOptionC(true);
                                    points = points+1;
                                    console.log("points: "+points);
                                }
                                setDisable(true);
                                }}>
                            <View style={whiteCircle}/>
                            </TouchableWithoutFeedback> )
                                :  optionC == false ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            : <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                             
                           
                        }
                </View>
              

               {/* <TouchableWithoutFeedback  onPress={() => setOptionD(!optionD)}> */}
               <View style={optionStyle}> 
                    <Text 
                     style={optionTextStyle}>D. {data.length > 0 ? data[current].option4: 'loading'}</Text>
                        {
                            optionD == null ? (<TouchableWithoutFeedback 
                                disabled={disable}  
                                onPress={() => {
                                if (data[current].answer !== 'option4'){
                                    setOptionD(false);
                                }else if (data[current].answer === 'option4'){
                                    setOptionD(true);
                                    points = points+1;
                                    console.log("points: "+points);
                                }
                                setDisable(true);
                                }}>
                            <View style={whiteCircle}/>
                            </TouchableWithoutFeedback> )
                                :  optionD == false ?  <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#FF0100'}}>
                                <Icon  name={'md-close'} color='#FF0100' size={20} />
                            </View>
                            : <View style={
                                {borderRadius:100, 
                                width:25, 
                                alignItems:'center', 
                                borderWidth:1, 
                                height: 25, 
                                borderColor:'#219653'}}>
                                <Icon name={'md-checkmark'} color='#219653' size={20} />
                            </View>
                               
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
        height:40,
        padding: 10,
        display:'flex',
        alignSelf:'center',
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    optionTextStyle:{
        fontSize:15,
        fontWeight: '300',
        fontFamily: 'Nunito-SemiBold',
        letterSpacing: 0.5
    },
    buttonStyle: {
        backgroundColor:'#C5CAD2',
        borderRadius: 16,
        height:43, 
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
        borderColor:'#fff'
    },
    MbuttonContainer: {
        flex: 1,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        
        
      },
}

export default Quiz;