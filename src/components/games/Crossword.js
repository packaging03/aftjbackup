import React, {useEffect, Component, useState} from 'react';
import {View, Text, Image, StyleSheet, PanResponder, Dimensions, SafeAreaView} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import DialogContent from 'react-native-popup-dialog/dist/components/DialogContent';



let first = '';
let last = '';
let score = 0;

const circleRadius = 30;



const Crosswords = ({route}) => {

   const [startTouchX, setStartTouchX] = useState(0);
   const [startTouchY, setStartTouchY] = useState(0);
   const [endTouchX, setEndTouchX] = useState(0);
   const [endTouchY, setEndTouchY] = useState(0);
   const [lines, setLines] = useState([]);
   const [yCoords, setYCoords] = useState([]);

   const [x1, setX1] = useState(0);
   const [y1, setY1] = useState(0);
   const [x2, setX2] = useState(0);
   const [y2, setY2] = useState(0);

   const [coord1, setCoord1] = useState([]);
   const [coord2, setCoord2] = useState([]);
   const [coord3, setCoord3] = useState([]);
   const [coord4, setCoord4] = useState([]);
   const [coord5, setCoord5] = useState([]);
   const [coord6, setCoord6] = useState([]);
   const [coord7, setCoord7] = useState([]);
   const [coord8, setCoord8] = useState([]);
   const [coord9, setCoord9] = useState([]);
   const [coord10, setCoord10] = useState([]);
   const [coord11, setCoord11] = useState([]);
   const [coord12, setCoord12] = useState([]);


   const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => {
            setStartTouchX(event.nativeEvent.locationX.toFixed(2));
            setStartTouchY(event.nativeEvent.locationY.toFixed(2));
            setX1(event.nativeEvent.locationX);
            setY1(event.nativeEvent.locationX);

            console.log("1x: "+event.nativeEvent.locationX.toFixed(0)+"y: "+(event.nativeEvent.locationY ));
        },
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderGrant: (event, gestureState) => {
            setEndTouchX(event.nativeEvent.locationX.toFixed(2));
            setEndTouchY(event.nativeEvent.locationY.toFixed(2));
            console.log("2x: "+event.nativeEvent.locationX.toFixed(0)+"y: "+(event.nativeEvent.locationY ));
        },
        onPanResponderMove: (event, gestureState) => {
            setEndTouchX(event.nativeEvent.locationX.toFixed(2));
            setEndTouchY(event.nativeEvent.locationY.toFixed(2));
            console.log("3x: "+event.nativeEvent.locationX.toFixed(0)+"y: "+(event.nativeEvent.locationY ));
        },
        onPanResponderRelease: (event, gestureState) => {
            setEndTouchX(event.nativeEvent.locationX.toFixed(2));
            setEndTouchY(event.nativeEvent.locationY.toFixed(2));

            setX2(event.nativeEvent.locationX.toFixed(2));
            setY2(event.nativeEvent.locationY.toFixed(2));
          
            console.log("4x: "+event.nativeEvent.locationX.toFixed(0)+"y: "+(event.nativeEvent.locationY ));
            addLine(startTouchX, startTouchY, endTouchX, endTouchY);
            console.log('lines: '+startTouchX+'-'+startTouchY+'-'+endTouchX+'-'+endTouchY);
            console.log('array: '+coord1);
        },
    });

   const [visibility1, setVisibility1] =  useState(0);
   const [visibility2, setVisibility2] =  useState(0);
   const [visibility3, setVisibility3] =  useState(0);
   const [visibility4, setVisibility4] =  useState(0);
   const [visibility5, setVisibility5] =  useState(0);
   const [visibility6, setVisibility6] =  useState(0);
   const [visibility7, setVisibility7] =  useState(0);
   const [visibility8, setVisibility8] =  useState(0);
   const [visibility9, setVisibility9] =  useState(0);
   const [visibility10, setVisibility10] =  useState(0);
   const [visibility11, setVisibility11] =  useState(0);
   const [visibility12, setVisibility12] =  useState(0);
   const [visibility13, setVisibility13] =  useState(0);
   const [visibility14, setVisibility14] =  useState(0);
   const [visibility15, setVisibility15] =  useState(0);
   const [visibility16, setVisibility16] =  useState(0);
   const [show, setShow] = useState(false);


   useEffect(()=>{
       panResponder;
         setStartTouchX(0);
        setStartTouchY(0);
        setEndTouchX(0);
        setEndTouchY(0);
   }, []);

  
    const displayModal = show => {
       setShow(show);
     };
   
    
     const addLine = (x1, y1, x2, y2) => {

        if (x1  - coord1[0] > 10  && y1 - coord1[2] > 10  && x2 - coord1[1] > 10 && y2 -coord1[2] > 10){
            console.log('not a match');
        }else if (x1  - coord1[0] <= 10  && y1 - coord1[2] <= 10  && x2 - coord1[1] <= 10 && y2 -coord1[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility1(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord2[0] <= 10  && y1 - coord2[2] <= 10  && x2 - coord2[1] <= 10 && y2 -coord2[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility2(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord3[0] <= 10  && y1 - coord3[2] <= 10  && x2 - coord3[1] <= 10 && y2 -coord3[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility3(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord4[0] <= 10  && y1 - coord4[2] <= 10  && x2 - coord4[1] <= 10 && y2 -coord4[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility4(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord5[0] <= 10  && y1 - coord5[2] <= 10  && x2 - coord5[1] <= 10 && y2 -coord5[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility5(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord6[0] <= 10  && y1 - coord6[2] <= 10  && x2 - coord6[1] <= 10 && y2 -coord6[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility6(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord7[0] <= 10  && y1 - coord7[2] <= 10  && x2 - coord7[1] <= 10 && y2 -coord7[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility7(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord8[0] <= 10  && y1 - coord8[2] <= 10  && x2 - coord8[1] <= 10 && y2 -coord8[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility8(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord9[0] <= 10  && y1 - coord9[2] <= 10  && x2 - coord9[1] <= 10 && y2 -coord9[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility9(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord10[0] <= 10  && y1 - coord10[2] <= 10  && x2 - coord10[1] <= 10 && y2 -coord10[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility10(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord11[0] <= 10  && y1 - coord11[2] <= 10  && x2 - coord11[1] <= 10 && y2 -coord11[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility11(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }else if (x1  - coord12[0] <= 10  && y1 - coord12[2] <= 10  && x2 - coord12[1] <= 10 && y2 -coord12[2] <= 10){
            console.log('its a match');
            setLines(oldArray => [...oldArray, <Line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="green"
                strokeWidth="20"
                strokeOpacity="0.3"
                strokeLinecap="round"
                
            />])
            score = score + 1;
            setVisibility12(1);
            setStartTouchX(0);
            setStartTouchY(0);
            setEndTouchX(0);
            setEndTouchY(0);
        }

        if (score === 12){
            displayModal(true);
        }

        console.log(x1+'-'+coord2[0]);
        console.log(y1+'-'+coord2[2]);
        console.log(x2+'-'+coord2[1]);
        console.log(y2+'-'+coord2[2]);
        
     }


   let {crosswordArray, sixteenWords, coordinates} = route.params;

   const play = (position, currentLetter, firstLetter, lastLetter) => {

       if(first === ''){
           first = currentLetter;
       }else if (first !== '' && first !== ''){
           last = currentLetter;
           if (first === firstLetter && last === lastLetter ){
               Toast.show('Correct!', Toast.LONG);

               score = score + 1;
               switch(position){
                   case 'one':
                       setVisibility1(1);
                       break;
                    case 'two':
                       setVisibility2(1);
                       break;
                   case 'three':
                       setVisibility3(1);
                       break;
                   case 'four':
                       setVisibility4(1);
                       break;
                   case 'five':
                       setVisibility5(1);
                       break;
                   case 'six':
                       setVisibility6(1);
                       break;
                   case 'seven':
                       setVisibility7(1);
                       break; 
                   case 'eight':
                       setVisibility8(1);
                       break; 
                   case 'nine':
                       setVisibility9(1);
                       break; 
                   case 'ten':
                       setVisibility10(1);
                       break; 
                   case 'eleven':
                       setVisibility11(1);
                       break; 
                   case 'twelve':
                       setVisibility12(1);
                       break; 
                   case 'thirteen':
                       setVisibility13(1);
                       break;
                   case 'fourteen':
                       setVisibility14(1);
                       break; 
                   case 'fifteen':
                       setVisibility15(1);
                       break; 
                   case 'sixteen':
                       setVisibility16(1);
                       break;
               }
               
           }
           first = '';
           last = '';
           if (score === 16){
               displayModal(true);
           }
       }
   }

   return (
       
       <View  style={{flex:1, padding:15, backgroundColor:'white'}} >
               

           {
               
               show? (<View  style={{
                   height:200,
                   backgroundColor:'rgba(255, 255, 255, 0.3)',
                   position:'absolute',
                   top:100,
                   zIndex:100,
                   borderRadius:8,
                   width: '90%',
                   alignSelf:'center'}} >
                       <BlurView
                           showBlur={true}
                           blurType="light"
                           show={show}
                           style={{height:'100%', zIndex:-10}}
                           blurAmount={10}
                           reducedTransparencyFallbackColor="white" >
                   <TouchableWithoutFeedback  style={{
                       height:200,
                       width:'100%',
                       display:'flex', 
                       borderRadius:8,
                       justifyContent:'center',
                       width: '100%',
                       alignItems:'center'}} onPress={()=>displayModal(false)} >
                           
                       <View 
                           style={{
                               height:'100%',
                               width:'100%',
                               backgroundColor:'rgba(255, 255, 255, 0.3)',
                               borderRadius:8,
                               position:'relative',
                               zIndex:100,
                               display:'flex',
                               position:'absolute',
                               alignSelf:'center',
                               justifyContent:'center', 
                               alignItems:'center'}}>

                       <Image
                           style={{
                               width:'70%',
                               height:'100%',
                               alignSelf:'center'
                           }}
                           source={require('../../assets/crossword-cup.png')} />
                       <Text style={{
                           color:'#FB13C8',
                           lineHeight:40.92,
                           letterSpacing:0.5,
                           position:'absolute',
                           fontSize:30,
                           alignSelf:'center',
                           fontFamily:'Nunito-Regular',
                           fontWeight:'700'
                       }}>GAME WON</Text>
               
                   </View>
                   
           </TouchableWithoutFeedback>
           </BlurView>
           </View>) : null
           }

            <Text style={
               {fontSize:20, 
               fontFamily:'Nunito', 
               lineHeight:22, 
               letterSpacing:0.5, 
               zIndex:-1,
               alignSelf:'center',
               fontWeight:'600',}}>Welcome To Today's Game</Text>
           
           <Text style={
               {fontWeight:'300', 
               marginTop:8,
               fontFamily:'Nunito', 
               lineHeight:16, 
               alignSelf:'center',
               fontSize:14,
               letterSpacing:0.5}}>Please seat yourself, relax and enjoy </Text>
               <Text  style={
               {fontWeight:'300', 
               fontFamily:'Nunito', 
               lineHeight:16, 
               alignSelf:'center',
               fontSize:14,
               marginBottom:16,
               letterSpacing:0.5}}>the game</Text>
           
              
        <View style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'60%', width:'100%',}}    {...panResponder.panHandlers}>
                
                <Svg style={{zIndex:50, marginLeft:15, marginRight:15, alignSelf:'center',}} position="absolute">
                    <Line
                        x1={startTouchX}
                        y1={startTouchY}
                        x2={endTouchX}
                        y2={endTouchY}
                        stroke="red"
                        strokeWidth="20"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                        
                    />

                    {/* <Line
                        x1={55}
                        y1={55}
                        x2={200}
                        y2={55}
                        stroke="orange"
                        strokeWidth="20"
                        strokeOpacity="0.3"
                        strokeLinecap="round"
                        
                    /> */}
                    {
                        lines
                    }
                </Svg>

            <View style={styles.accross} onLayout={event => {
                    console.log(" event y0: "+(event.nativeEvent.layout.y));
                    setCoord1([...coord1, event.nativeEvent.layout.y]);
                    console.log('coord1: '+coord1);
                }}>
            {
                crosswordArray[0].map((i, index) =>
                    
                    ( <Text style={styles.letter}  onLayout={event => {
                        if (index === coordinates[0][0]){

                            setCoord1([...coord1, event.nativeEvent.layout.x]);
                        }else if ((index === coordinates[0][1])){

                            setCoord1([...coord1, event.nativeEvent.layout.x]);
                        }
                        
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord2([...coord2, event.nativeEvent.layout.y]);
                    console.log('coord2: '+coord2);
                }}>
            {
                crosswordArray[1].map((i, index)=>( <Text style={styles.letter}  onLayout={event => {
                    if (index === coordinates[1][0]){
                        setCoord2([...coord2, event.nativeEvent.layout.x]);
                    }else if ((index === coordinates[1][1])){
                        setCoord2([...coord2, event.nativeEvent.layout.x]);
                    }
                    
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord3([...coord3, event.nativeEvent.layout.y]);
                    console.log('coord3: '+coord3);
                }}>
            {
                crosswordArray[2].map((i, index)=>(
                     <Text style={styles.letter}  onLayout={event => {
                         console.log(index);
                    if (index === coordinates[2][0]){
                        console.log('first coordinates: '+coordinates[2][0]);
                        setCoord3([...coord3, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[2][1]){
                        console.log('last coordinates: '+coordinates[2][1]);
                        setCoord3([...coord3, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord4([...coord4, event.nativeEvent.layout.y]);
                    console.log('coord4: '+coord4);
                }}>
            {
                crosswordArray[3].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[3][0]){
                        setCoord4([...coord4, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[3][1]){
                        setCoord4([...coord4, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord5([...coord5, event.nativeEvent.layout.y]);
                    console.log('coord5: '+coord5);
                }}>
            {
                crosswordArray[4].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[4][0]){
                        setCoord5([...coord5, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[4][1]){
                        setCoord5([...coord5, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord6([...coord6, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[5].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[5][0]){
                        setCoord6([...coord6, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[5][1]){
                        setCoord6([...coord6, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord7([...coord7, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[6].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[6][0]){
                        setCoord7([...coord7, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[6][1]){
                        setCoord7([...coord7, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross}  onLayout={event => {
                    setCoord8([...coord8, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[7].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[7][0]){
                        setCoord8([...coord8, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[7][1]){
                        setCoord8([...coord8, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord9([...coord9, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[8].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[8][0]){
                        setCoord9([...coord9, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[8][1]){
                        setCoord9([...coord9, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord10([...coord10, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[9].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[9][0]){
                        setCoord10([...coord10, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[9][1]){
                        setCoord10([...coord10, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord11([...coord11, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[10].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[10][0]){
                        setCoord11([...coord11, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[10][1]){
                        setCoord11([...coord11, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
           <View style={styles.accross} onLayout={event => {
                    setCoord12([...coord12, event.nativeEvent.layout.y]);
                }}>
            {
                crosswordArray[11].map((i, index)=>( <Text style={styles.letter} onLayout={event => {
                    if (index === coordinates[11][0]){
                        setCoord12([...coord11, event.nativeEvent.layout.x]);
                    }else if (index === coordinates[11][1]){
                        setCoord12([...coord11, event.nativeEvent.layout.x]);
                    }
                }}>{i}</Text>))
            }
           </View>
          
          
        </View>
           <View style={{display:'flex', marginTop:10, flexWrap:'wrap', flexDirection:'row'}}>
            {/* {
               sixteenWords.slice(0, 16).map(i=> {
                   return <View style={{display:'flex', flexDirection:'row',}}> 
                            <Icon name={'md-checkmark-sharp'}  color='#219653' size={17} />
                           <Text style={{width:80, marginRight:5, fontSize:11}}>{i}</Text>
                       </View>
                   })
           }  */}
            <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility1}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[0]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility2}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[1]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility3}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[2]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility4}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[3]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'}  style={{opacity:visibility5}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[4]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility6}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[5]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility7}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[6]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility8}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[7]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility9}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11,}}>{sixteenWords[8]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility10}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[9]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility11}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[10]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility12}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[11]}</Text>
           </View>
           {/* <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility13}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[12]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility14}}  color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[13]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility15}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[14]}</Text>
           </View>
           <View style={{display:'flex', flexDirection:'row',}}> 
                   <Icon name={'md-checkmark-sharp'} style={{opacity:visibility16}} color='#219653' size={17} />
               <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[15]}</Text>
           </View> */}

           </View>  
       </View>

   )
}

const renderMark = () => {

   for (let i = 0; i < 16; i++){
       return <View style={{display:'flex', flexDirection:'row',}}> 
                   
                   <Text style={{width:80, marginRight:5, fontSize:11}}>{i}</Text>
               </View>
   }
   if(setVisibility1 === 1){
       return <Icon name={'md-checkmark-sharp'}  color='#219653' size={17} />
   }
}

const styles = {
   accross:{
       
       justifyContent:'space-between', 
       flexDirection:"row",
       alignItems:'center',
       
   }, 
   letter:{
       fontWeight:'bold',
       fontSize: 15, 
       width:12,
       textAlign:'center',
       alignSelf:'center',
   },
   childView: {
       flex: 1,
       overflow: 'hidden',
       backgroundColor:'red',
       zIndex:100,
   },
   box: {
       width: 150,
       height: 150,
       alignSelf: 'center',
       backgroundColor: 'plum',
       margin: 10,
       zIndex: 200,
     },
     horizontalPan: {
       backgroundColor: '#f48fb1',
       height: 150,
       justifyContent: 'center',
       marginVertical: 10,
     },
     circle: {
       backgroundColor: '#f48fb1',
       borderRadius: 15,
       borderWidth:5,
       borderColor: '#219653',

       height: circleRadius * 2,
       width: circleRadius * 2,
     },
     wrapper: {
       backgroundColor:'red',
       flex: 1,
     },
}

export default Crosswords;





// export default class Crosswords extends Component {
//     constructor() {
//         super();
//         //initialize state
//         this.panResponder;
//         this.state = {
//             startTouchX: 0,
//             startTouchY: 0,

//             endTouchX: 0,
//             endTouchY: 0,
//         };

//         //panResponder initialization
//         this.panResponder = PanResponder.create({
//             onStartShouldSetPanResponder: (event, gestureState) => true,
//             onStartShouldSetPanResponderCapture: (event, gestureState) => {
//                 this.setState({
//                     startTouchX: event.nativeEvent.locationX.toFixed(2),
//                     startTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//             },
//             onMoveShouldSetPanResponder: (event, gestureState) => false,
//             onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
//             onPanResponderGrant: (event, gestureState) => {
//                 this.setState({
//                     endTouchX: event.nativeEvent.locationX.toFixed(2),
//                     endTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//                 console.log(gestureState.dx+', '+gestureState.dy);
//             },
//             onPanResponderMove: (event, gestureState) => {
//                 this.setState({
//                     endTouchX: event.nativeEvent.locationX.toFixed(2),
//                     endTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//                 console.log(gestureState.dx+', '+gestureState.dy);
//             },
//             onPanResponderRelease: (event, gestureState) => {
//                 this.setState({
//                     endTouchX: event.nativeEvent.locationX.toFixed(2),
//                     endTouchY: event.nativeEvent.locationY.toFixed(2),
//                 });
//             },
//         });
//         this.setState({
//             startTouchX: 0,
//             startTouchY: 0,
//             endTouchX: 0,
//             endTouchY: 0,
//         });
//     }
//     render() {
//         return (
//             <View style={styles.MainContainer}>
//                 <View style={styles.childView}>
//                     <Svg height={height} width={width} position="absolute">
//                         <Line
//                             x1={this.state.startTouchX}
//                             y1={this.state.startTouchY}
//                             x2={this.state.endTouchX}
//                             y2={this.state.endTouchY}
//                             stroke="red"
//                             strokeWidth="20"
//                             strokeOpacity="0.3"
//                             strokeLinecap="round"
                            
//                         />
//                     </Svg>
//                     <View
//                         style={{flex: 1, backgroundColor: 'transparent'}}
//                         {...this.panResponder.panHandlers}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     MainContainer: {
//         flex: 1,
//     },

//     childView: {
//         flex: 1,
//         overflow: 'hidden',
//     },
//     point: {
//         height: 22,
//         width: 22,
//         marginTop: 5,
//         position: 'absolute',
//         borderRadius: 14,
//         backgroundColor: '#afeeee',
//     },
// });