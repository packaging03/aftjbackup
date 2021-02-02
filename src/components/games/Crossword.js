import React, {useEffect, useState} from 'react';
import {View, Text, Image,  PanResponder, Dimensions, SafeAreaView} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {ScrollView,
     TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import Dialog from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import DialogContent from 'react-native-popup-dialog/dist/components/DialogContent';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

 var arrList = [];

 let first = '';
 let last = '';
 let score = 0;
 function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const genLetters = (length) => {
    for (let i = 0; i < 17 - length; i++){
        arrList.push(
        <TouchableHighlight onPress={()=>{}} underlayColor={'#219653'} >
             <Text style={styles.letter}>{makeid(1)}</Text>
        </TouchableHighlight>);
        
    } 
 }

const circleRadius = 30;

const Crosswords = ({route}) => {

    const  [touchXY, setTouchXY] = useState({
        startTouchX: 0,
        startTouchY: 0,
        endTouchX: 0,
        endTouchY: 0,
    });

    const panResponder =  PanResponder.create({
        
        onStartShouldSetPanResponder: (event, gestureState) => true,
        onStartShouldSetPanResponderCapture: (event, gestureState) => {
            setTouchXY({
                startTouchX: event.nativeEvent.locationX.toFixed(2),
                startTouchY: event.nativeEvent.locationY.toFixed(2),
               
            });
        },
        onMoveShouldSetPanResponder: (event, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
        onPanResponderStart: (event, gestureState) => {
            setTouchXY({
                startTouchX: event.nativeEvent.locationX.toFixed(2),
                startTouchY: event.nativeEvent.locationY.toFixed(2),
               
            });
        },
        onPanResponderGrant: (event, gestureState)  => {
            setTouchXY({
                startTouchX: event.nativeEvent.locationX.toFixed(2),
                startTouchY: event.nativeEvent.locationY.toFixed(2),
               
            });
        },
        onPanResponderMove: (event, gestureState) => {
            setTouchXY({
                startTouchX: event.nativeEvent.locationX.toFixed(2),
                startTouchY: event.nativeEvent.locationY.toFixed(2),
               
            });
        },
        onPanResponderRelease: (event, gestureState) => {
            setTouchXY({
              
                endTouchX: event.nativeEvent.locationX.toFixed(2),
                endTouchY: event.nativeEvent.locationY.toFixed(2),
            });
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
        setTouchXY({
            startTouchX: 0,
            startTouchY: 0,
            endTouchX: 0,
            endTouchY: 0,
        });

    }, []);
   
    const displayModal = show => {
        setShow(show);
      };
    
    let {sixteenWords, index1, index2, index3, index4, index5, index6, index7, index8, index9, index10, index11, index12, index13, index14, index15, index16} = route.params;

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
            console.log('visible: '+visibility15);
            if (score === 16){
                displayModal(true);
            }
        }
    }

    return (
        <ScrollView style={{flex:1, }} >
        <View  style={{flex:1, padding:20}} >

                
                <View style={{
                        flex: 1,
                        width:'100%',
                        height:'100%',
                        overflow: 'hidden',
                        alignSelf:'center',
                        position:'absolute',
                        zIndex:100,
                    }}>
                    <Svg height={height} width={width} position="absolute">
                        <Line
                            x1={touchXY.startTouchX}
                            y1={touchXY.startTouchY}
                            x2={touchXY.endTouchX}
                            y2={touchXY.endTouchY}
                            stroke="red"
                            strokeWidth="20"
                            strokeOpacity="0.3"
                            strokeLinecap="round"
                            
                        />
                    </Svg>
                    <View
                        style={
                            {flex: 1,  
                            backgroundColor:'transparent', zIndex:200,
                            }}
                        {...panResponder.panHandlers}
                    />
                </View>

            {
            //     show? (<View  style={{
            //         height:200,
            //         backgroundColor:'rgba(255, 255, 255, 0.3)',
            //         position:'absolute',
            //         top:100,
            //         zIndex:100,
            //         borderRadius:8,
            //         width: '90%',
            //         alignSelf:'center'}} >
            //             <BlurView
            //                 showBlur={true}
            //                 o
            //                 blurType="light"
            //                 show={show}
            //                 style={{height:'100%', zIndex:-10}}
            //                 blurAmount={10}
            //                 reducedTransparencyFallbackColor="white" >
            //         <TouchableWithoutFeedback  style={{
            //             height:200,
            //             width:'100%',
            //             display:'flex', 
            //             borderRadius:8,
            //             justifyContent:'center',
            //             width: '100%',
            //             alignItems:'center'}} onPress={()=>displayModal(false)} >
                            
            //             <View 
            //                 style={{
            //                     height:'100%',
            //                     width:'100%',
            //                     backgroundColor:'rgba(255, 255, 255, 0.3)',
            //                     borderRadius:8,
            //                     position:'relative',
            //                     zIndex:10,
            //                     display:'flex',
            //                     position:'absolute',
            //                     alignSelf:'center',
            //                     justifyContent:'center', 
            //                     alignItems:'center'}}>

            //             <Image
            //                 style={{
                                
            //                     alignSelf:'center'
            //                 }}
            //                 source={require('../../assets/crossword-cup.png')} />
            //             <Text style={{
            //                 color:'#FB13C8',
            //                 lineHeight:40.92,
            //                 letterSpacing:0.5,
            //                 position:'absolute',
            //                 fontSize:30,
            //                 alignSelf:'center',
            //                 fontFamily:'Nunito-Regular',
            //                 fontWeight:'700'
            //             }}>GAME WON</Text>
                
            //         </View>
                    
            // </TouchableWithoutFeedback>
            // </BlurView>
            // </View>) : null
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
            
           

            

            <View style={styles.accross}>
                {
                    sixteenWords.slice(14, 15).map(word => {
                        arrList = [];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index15, 0, <View style={{
                            zIndex: -10,
                            height: 24,
                            position: 'absolute', backgroundColor: 'transparent',
                            borderRadius: 6,
                            borderWidth: 1,
                            opacity: visibility15,
                            left: index15 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',
                        }} />);

                        array.map(i => {
                            arrList.splice(index15++, 0, <TouchableHighlight underlayColor={'#219653'}
                                onPress={() => play('fifteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                            </TouchableHighlight>);

                        });
                    })
                }
                {
                    arrList
                }
            </View>
           
           
            <View style={styles.accross}>
                {
                    sixteenWords.slice(3, 4).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index4, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility4,
                            borderWidth: 1,
                            left: index4 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index4++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('four', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(4, 5).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index5, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility5,
                            left: index5 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index5++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('five', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                  {
                      sixteenWords.slice(5, 6).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index6, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility6,
                            left: index6 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index6++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('six', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={styles.accross}>
                
                {
                    sixteenWords.slice(0, 1).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        
                        arrList.splice(index1, 0, <View style={{ 
                            zIndex:-10,
                            opacity:visibility1,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index1 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index1++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('one', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(6, 7).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index7, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility7,
                            borderWidth: 1,
                            left: index7 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index7++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('seven', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(2, 3).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index3, 0, <View style={{ zIndex:-10,
                            height:24,
                            opacity:visibility3,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index3 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index3++, 0,<TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('three', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(7, 8).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index8, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility8,
                            left: index8 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index8++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('eight', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={styles.accross}>
                {
                    sixteenWords.slice(1, 2).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index2, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility2,
                            borderWidth: 1,
                            left: index2 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index2++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('two', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(8, 9).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index9, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility9,
                            left: index9 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index9++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('nine', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
           
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(10, 11).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index11, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility11,
                            borderWidth: 1,
                            left: index11 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index11++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('eleven', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(11, 12).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index12, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index12 * 19,
                            opacity:visibility12,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index12++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('twelve', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
               {
                    sixteenWords.slice(12, 13).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            arrList.splice(index13, 0, <View style={{ zIndex:-10,
                                height:24,
                                position:'absolute',  backgroundColor: 'transparent',
                                borderRadius: 6, 
                                borderWidth: 1,
                                left: index13 * 19,
                                opacity:visibility13,
                                width: array.length * 20,
                                borderColor: '#219653',}}/>)
                            array.map(i => {
                                arrList.splice(index13++, 0, <TouchableHighlight underlayColor={'#219653'}
                                onPress={()=> play('thirteen', i, array[0], array[array.length - 1])}>
                                    <Text style={styles.letter}>{i}</Text>
                                    </TouchableHighlight>);
                                
                                // return <Text style={styles.letter}>{i}</Text>
                            })
                            
                        // }
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(13, 14).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index14, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index14 * 19,
                            opacity:visibility14,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index14++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('fourteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={styles.accross}>
                {
                    sixteenWords.slice(15, 16).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index16, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility16,
                            left: index16 * 19,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index16++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('sixteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
           

            <View style={styles.accross}>
                  {
                    sixteenWords.slice(9, 10).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index10, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index10 * 19,
                            opacity:visibility10,
                            width: array.length * 20,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index10++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('ten', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={{display:'flex', marginTop:20, flexWrap:'wrap', flexDirection:'row'}}>
             {/* {
                sixteenWords.slice(0, 16).map(i => {
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
                <Text style={{width:80, marginRight:5, fontSize:11}}>{sixteenWords[8]}</Text>
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
            <View style={{display:'flex', flexDirection:'row',}}> 
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
            </View>

            </View>  


        </View>

        </ScrollView>
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
        width:'100%', 
        display:'flex', 
        justifyContent:'space-between', 
        flexDirection:"row",
        marginBottom:2
    }, 
    letter:{
        fontWeight:'bold',
        fontSize: 14, 
        zIndex:10
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
//             onPanResponderGrant: (event, gestureState) => false,
//             onPanResponderMove: (event, gestureState) => {},
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