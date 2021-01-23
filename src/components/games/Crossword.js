import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import {PanGestureHandler, TapGestureHandler, State, RectButton } from 'react-native-gesture-handler';


const words = ['LOVE', 'JOY', 'PEACE', 'GOD', 
'GRACE', 'TRUTH', 'JESUS', 'FATHER', 'MASTER', 'DISCIPLE',

'HEAVEN', 'TEACHER', 'KINGDOM', 'PATIENCE', 'FAITH', 'WORD', 'TRUST', 'OBEY', 'ABBA', 'SPIRIT',
 'CARNAL', 'CHRIST', 'SAVIOUR', 'HEALER', 'ALTAR', 'APOSTLE', 'ATONEMENT', 'BAPTISM', 'BRETHREN', 'CHERUB', 
 'EXODUS', 'GOSPEL', 'MESSIAH', 'PARADISE', 'PRODIGAL', 'PROPHESY', 'RAPTURE', 'REJOICE', 'REDEMPTION', 
 'REPENTANCE', 'RESURRECTION', 'REVELATION', 'SACRIFICE', 'SCAPEGOAT', 'SERMON', 'TESTIMONY', 'TRIBULATION',
 'GENESIS', 'ANGEL', 'SABBATH', 'CHURCH', 'PRAYER', 'PRAISES', 'NATIONS', 'HOLY', 'HONOUR', 'RESPECT', 'PASTOR',
 'BIBLE', 'COVENANT', 'TESTAMENT', 'TABERNACLE', 'PSALMS', 'FORGIVE', 'CONQUEROR', 'BLESSINGS', 'SUBMIT', 'GENTLE',
 'POWER', 'GLORY', 'WORSHIP'
];

var sixteenWords = [];

const pick16Random = () => {
   
    for (let t = 0; t < 16; t++){
        let num = Math.floor(Math.random() * 71);
        
        if (!sixteenWords.includes(num)){
            sixteenWords.push(words[num]);
        }else{
           
            while(sixteenWords.includes(num)){
                num = Math.floor(Math.random() * 71);
                
            }
            sixteenWords.push(words[num]);
        }
        
    }
}



 var arrList = [];

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
        arrList.push(<Text style={styles.letter}>{makeid(1)}</Text>);
        
    } 
 }

 const windowWidth = Dimensions.get('window').width;
const circleRadius = 30;

    
const Crosswords = (props) => {


    useEffect(() => {
        pick16Random();
        console.log(sixteenWords );
    }, []);


    const _touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    const [width, setWidth] = useState(0);
    const _translateX = Animated.add(
       _touchX,
      new Animated.Value(-circleRadius)
    );
    const _onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            x: _touchX, 
          },

        }, 
      ],
      { useNativeDriver: true }
    );

  const _onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      // Once tap happened we set the position of the circle under the tapped spot
      _touchX.setValue(nativeEvent.x);
    //   console.log('hi');
    }
  };
  const { tapRef, panRef } = props;

    return (
        <View style={{flex:1, backgroundColor:'white', padding:20}}>

        {/* <TapGestureHandler
                ref={tapRef}
                waitFor={panRef}
                onHandlerStateChange={_onTapHandlerStateChange}
                shouldCancelWhenOutside>
                <Animated.View style={styles.wrapper}>
                <PanGestureHandler
                    ref={panRef}
                    activeOffsetX={[-20, 20]}
                    onGestureEvent={()=>{
                        console.log('ho');
                        setWidth(width + 10);
                    }}
                    shouldCancelWhenOutside>
                    <Animated.View style={styles.horizontalPan}>
                    <Animated.View
                        style={[{
                            backgroundColor: '#f48fb1',
                            borderRadius: 15,
                            borderWidth:5,
                            borderColor: '#42a5f5',
                            height: circleRadius * 2,
                            width: width,},
                           {
                            // width: 100,
                            
                            transform: [
                            {
                                // scaleY: {circleRadius},
                                translateX: _translateX,
                            },
                            ],
                        },
                        ]}
                    />
                    </Animated.View>
                </PanGestureHandler>
                </Animated.View>
            </TapGestureHandler> */}
            <Text style={
                {fontSize:20, 
                fontFamily:'Nunito', 
                lineHeight:22, 
                letterSpacing:0.5, 
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
                    sixteenWords.slice(0, 1).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
                        })
                    })
                }
                {
                    arrList
                }
                {/* <Text style={styles.letter}>S</Text>
                <Text style={styles.letter}>S</Text>
                <Text style={styles.letter}>F</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>G</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>A</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text> */}
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(1, 2).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
                        })
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(14, 15).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
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
                        var index = Math.floor(Math.random() * 10);
                        arrList.splice(index, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 10, 
                            borderWidth: 2,
                            left: index * 22,
                            width: array.length * 25,
                            borderColor: '#42a5f5',}}/>)

                        array.map(i => {
                            arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={{display:'flex', marginTop:20, flexWrap:'wrap', flexDirection:'row'}}>
            {
                 sixteenWords.slice(0, 16).map(i => {
                    return <Text style={{width:70, marginRight:5, fontSize:11}}>{i}</Text>;
                })
            }
            </View>


        </View>
    )
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
        fontSize: 15, 
        zIndex:10
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
        borderColor: '#42a5f5',

        height: circleRadius * 2,
        width: circleRadius * 2,
      },
      wrapper: {
        backgroundColor:'red',
        flex: 1,
      },
}

export default Crosswords;